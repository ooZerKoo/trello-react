import React from 'react'
import { connect } from 'react-redux'
import { setListList, setVisible, setDrawer, setFormData, swapDraggable } from '../../services/redux/actions.js'
import { apiDeleteList, apiGetListList, apiUpdateListPosition } from '../../services/api/api.js'

import TaskList from '../../components/List/Task'

import { DeleteOutlined, PlusOutlined, EditOutlined, DragOutlined } from '@ant-design/icons'
import { Card, Popconfirm, Col, Empty, Button, Row, Divider } from 'antd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import Masonry from 'react-masonry-component'

const { Meta } = Card

const ListList = props => {

    const cover = <img alt="cover" src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4MDI1MX0" />

    const getListList = async () => apiGetListList(props.token, props.idPanel).then(list => props.setListList(props.idPanel, list))
    const setListFormData = async (data) => props.setFormData(data)
    const deleteOneList = async (id) => apiDeleteList(props.token, id).then(getListList)
    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)
    const openDrawerList = () => props.setDrawerList(props.idPanel, true)
    const openDrawerListEdit = (data) => setListFormData(data).then(() => openDrawerList())
    const swapDraggable = () => {
        if (props.list[0].list.length > 1) props.swapDraggable()
    }
    const getListCover = (list) => {
        return <Row justify="center">{list.cover ? <img alt={list.name} src={list.cover.small} /> : cover}</Row>
    }
    const dragEndList = async (result) => {
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
            <DragOutlined onClick={() => swapDraggable()}/>
        ]
    }

    const renderLists = () => props.list[0].list.map((list, index) => renderList(list, index))
    const renderList = (list, index) => {
        if (!props.filter || props.filter === list._id) {
            if (props.draggable) {
                return (
                    <Draggable key={list._id} draggableId={list._id} index={index}>
                        {(provided, snapshot) => (
                            <Col key={list._id} xs={24} sm={24} md={12} lg={8} xl={6} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <Card key={list._id} cover={getListCover(list)} >
                                    <Meta title={list.name} description={list.description} />
                                </Card>
                            </Col >
                        )}
                    </Draggable>
                )
            } else {
                return (
                    <Col span={24} key={list._id + '_col'} style={{textAlign: 'left'}}>
                        <Card key={list._id + '_cart'} actions={getActions(list)} cover={getListCover(list)} >
                            <React.Fragment>
                                <Meta title={list.name} description={list.description} />
                                <Divider />
                                <TaskList idList={list._id} />
                            </React.Fragment>
                        </Card>
                    </Col >
                )
            }
        }
    }

    if (props.list[0] && props.list[0].list && props.list[0].list.length > 0) {
        if (props.draggable) {
            return (
                <React.Fragment>
                    <DragDropContext key='dragDropContext' onDragEnd={dragEndList}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided, snapshot) => (
                                <Row wrap={true} style={{ paddingTop: '15px' }} justify="center" gutter={[24, 24]} {...provided.droppableProps} ref={provided.innerRef}>
                                    {renderLists()}
                                    {provided.placeholder}
                                </Row>
                            )}
                        </Droppable>
                    </DragDropContext>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Col span={24}>
                        <Masonry>
                            {renderLists()}
                        </Masonry>
                    </Col>
                </React.Fragment>
            )
        }
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
    filter: state.menu.filter.list,
    draggable: state.actions.draggable,
})
const mapDispatchToProps = (dispatch) => ({
    setListList: (id, list) => setListList(dispatch, id, list),
    setVisible: (id, value) => setVisible(dispatch, id, value),
    setDrawerList: (id, value) => setDrawer(dispatch, id, value),
    setFormData: (data) => setFormData(dispatch, data),
    swapDraggable: () => swapDraggable(dispatch),
})
const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListList)

export default connected