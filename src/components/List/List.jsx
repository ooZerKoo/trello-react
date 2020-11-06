import React from 'react'
import { connect } from 'react-redux'
import { setListList, setVisible, setDrawer, setFormData } from '../../services/redux/actions.js'
import { apiDeleteList, apiGetListList, apiUpdateListPosition } from '../../services/api/api.js'

import TaskList from '../../components/List/Task'
import TaskForm from '../../components/Forms/TaskForm'

import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Popconfirm, Col, Empty, Button, Row } from 'antd'

import Masonry from 'react-masonry-component'

const masonryOptions = {
    fitWidth: true,
    originLeft: true,
    resize: true,
    columnWidth: 4
}

const { Meta } = Card

const ListList = props => {

    const cover = <img alt="cover" src="https://images.unsplash.com/photo-1483546363825-7ebf25fb7513?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE4MDI1MX0" />

    const getListList = async () => apiGetListList(props.token, props.idPanel).then(list => props.setListList(props.idPanel, list))
    const deleteOneList = async (id) => apiDeleteList(props.token, id).then(getListList)

    const openDrawerList = () => props.setDrawerList(props.idPanel, true)
    const openDrawerListEdit = (data) => setListFormData(data).then(() => openDrawerList())

    const setListFormData = async (data) => props.setFormData(data)

    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)

    const getListCover = (list) => {
        return <Row justify="center">{list.cover ? <img alt={list.name} src={list.cover.small} /> : cover}</Row>
    }

    const updateOrderList = async (id, position) => {
        apiUpdateListPosition(props.token, id, position)
            .then(list => props.setListList(props.idPanel, list))
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
    const renderLists = () => props.list[0].list.map(list => renderList(list))
    const renderList = (list) => {
        if (!props.filter || props.filter === list._id) {
            return (
                <Col span={24}>
                    <Card key={list._id} actions={getActions(list)} cover={getListCover(list)} >
                        <React.Fragment>
                            <Meta title={list.name} description={list.description} />
                            <TaskList idList={list._id} />
                        </React.Fragment>
                    </Card>
                </Col >
            )
        }
    }

    if (props.list[0] && props.list[0].list && props.list[0].list.length > 0) {
        return (
            <Col span={24}>
                <Masonry className="my-gallery-class'" options={masonryOptions}>
                    {renderLists()}
                </Masonry>
            </Col>
        )
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