import React from 'react'
import { connect } from 'react-redux'
import { setListList, setVisible, setDrawer, setFormData } from '../../services/redux/actions.js'
import { apiDeleteList, apiGetListList, apiUpdateList, apiUpdateListPosition } from '../../services/api/api.js'

import TaskList from '../../components/List/Task'
import TaskForm from '../../components/Forms/TaskForm'

import { DeleteOutlined, PlusOutlined, EditOutlined, FullscreenOutlined } from '@ant-design/icons'
import { Card, Popconfirm, Col, Empty, Button, Slider, Row } from 'antd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const { Meta } = Card

const ListList = props => {

    const cover = <img alt="cover" src="https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4MDI1MX0" />

    const getListList = async () => apiGetListList(props.token, props.idPanel).then(list => props.setListList(props.idPanel, list))
    const deleteOneList = async (id) => apiDeleteList(props.token, id).then(getListList)
    const updateListSize = async (id, size) => {
        apiUpdateList(props.token, id, { col: size })
            .then(() => getListList())
    }

    const openDrawerList = () => props.setDrawerList(props.idPanel, true)
    const openDrawerListEdit = (data) => setListFormData(data).then(() => openDrawerList())

    const setListFormData = async (data) => props.setFormData(data)

    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)

    const getListCover = (list) => {
        return <Row justify="end" align='bottom' gutter={[24, 24]}>
            {list.cover ? <img alt={list.name} src={list.cover.regular} /> : cover}
            <Button size='small' key='small' onClick={() => updateListSize(list._id, 1)}><FullscreenOutlined /></Button>
            <Button size='medium' key='medium' onClick={() => updateListSize(list._id, 2)}><FullscreenOutlined /></Button>
            <Button size='large' key='large' onClick={() => updateListSize(list._id, 3)}><FullscreenOutlined /></Button>
        </Row>
    }

    const getActions = (list) => {
        const currentArray = props.actions.filter(v => v.id === list._id)
        const current = currentArray[0] ? currentArray[0] : { visible: false }
        return [
            <Popconfirm
                title='¿Quieres eliminarlo?'
                onConfirm={() => deleteOneList(list._id)}
                onCancel={() => handleCancel(list._id)}
                visible={current.visible}
            >
                <DeleteOutlined key="delete" onClick={() => showPopconfirm(list._id)} />
            </Popconfirm>
            ,
            <EditOutlined key="edit" onClick={() => openDrawerListEdit(list)} />,
            <TaskForm idList={list._id} />,
        ]
    }

    const dragEnd = async (result) => {
        const id = result.draggableId
        const position = result.destination.index
        const origin = result.source.index

        reorderList(origin, position)
        apiUpdateListPosition(props.token, id, position + 1)
    }

    const reorderList = (origin, position) => {
        const list = Array.from(props.list[0].list)
        const [removed] = list.splice(origin, 1)
        list.splice(position, 0, removed)
        props.setListList(props.idPanel, list)
    }

    const renderLists = () => props.list[0].list.map((list, index) => renderList(list, index))

    const renderList = (list, index) => {
        if (!props.filter || props.filter === list._id) {
            return (
                <Draggable key={list._id} draggableId={list._id} index={index}>
                    {(provided, snapshot) => (
                        <Col
                            key={list._id} xs={24} sm={24} md={list.col * 8} lg={list.col * 4} xl={list.col * 4}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Card key={list._id} actions={getActions(list)} cover={getListCover(list)} >
                                <React.Fragment>
                                    <Meta title={list.name} description={list.description} />
                                    <TaskList idList={list._id} />
                                </React.Fragment>
                            </Card>
                        </Col >
                    )}
                </Draggable>
            )
        }
    }

    if (props.list[0] && props.list[0].list && props.list[0].list.length > 0) {
        return <React.Fragment>
            <DragDropContext onDragEnd={dragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <Row wrap={true} top={true} justify="center" gutter={6} {...provided.droppableProps} ref={provided.innerRef}>
                            {renderLists()}
                        </Row>
                    )}
                </Droppable>
            </DragDropContext>
        </React.Fragment>
    }
    return (
        <Col span={24}>
            <Empty description='No hay ninguna lista creada'>
                <Button type="primary" onClick={() => openDrawerList()}><PlusOutlined /> Añade una lista</Button>
            </Empty>
        </Col>
    )
}

const mapStateToProps = (state, extra) => ({
    list: state.list.filter(v => v.id === extra.idPanel),
    token: state.session.user.token,
    actions: state.actions.actions,
    filter: state.menu.filter.list
})
const mapDispatchToProps = (dispatch) => ({
    setListList: (id, list) => setListList(dispatch, id, list),
    setVisible: (id, value) => setVisible(dispatch, id, value),
    setDrawerList: (id, value) => setDrawer(dispatch, id, value),
    setFormData: (data) => setFormData(dispatch, data),
})
const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListList)

export default connected