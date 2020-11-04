import React from 'react'
import { connect } from 'react-redux'
import { setListList, setVisible, filterPanel } from '../../services/redux/actions.js'
import { apiDeleteList, apiGetListList } from '../../services/api/api.js'

import TaskList from '../../components/List/Task'

import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Popconfirm, Col, Badge } from 'antd'
import { NavLink } from 'react-router-dom';
const { Meta } = Card;

const ListList = props => {

    const cover = <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />

    const getListList = async () => {
        apiGetListList(props.token, props.idPanel)
            .then(list => props.setListList(props.idPanel, list))
    }

    const deleteOneList = (id) => {
        apiDeleteList(props.token, id)
            .then(getListList)
    }

    const doFilterPanel = () => {
        props.filterPanel('list', 'form')
    }

    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)

    const renderList = (list) => {
        if (!props.filter || props.filter === list._id) {
            const currentArray = props.actions.filter(v => v.id === list._id)
            const current = currentArray[0] ? currentArray[0] : { visible: false }
            const actions = [
                <Popconfirm
                    title='¿Quieres eliminarlo?'
                    onConfirm={() => deleteOneList(list._id)}
                    onCancel={() => handleCancel(list._id)}
                    visible={current.visible}
                >
                    <DeleteOutlined key="edit" onClick={() => showPopconfirm(list._id)} />
                </Popconfirm>
                ,
                <NavLink to={'/' + list._id}><EyeOutlined key="ellipsis" /></NavLink>,
            ]

            return (
                <Col key={list._id} xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
                    {<Card key={list._id} cover={cover} actions={actions}>
                        <React.Fragment>
                            <Meta title={list.name} description={list.description} />
                            <TaskList idList={list._id} />
                        </React.Fragment>
                    </Card>}
                </Col >
            )
        }
    }

    const renderAddList = () => {
        if (!props.filter) {
            return (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4}>
                    <Badge.Ribbon color="green" text="Añade una lista nueva">
                        <Card cover={cover} actions={[<PlusOutlined key="add" onClick={() => doFilterPanel()} />]}>
                            <Meta title='Añade una lista' description='En este panel no tienes ninguna lista creada' />
                        </Card>
                    </Badge.Ribbon>
                </Col >
            )
        }
    }

    if (props.list[0] && props.list[0].list && props.list[0].list.length > 0) {
        return (
            <React.Fragment>
                {props.list[0].list.map(list => renderList(list))}
                {renderAddList()}
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
            {renderAddList()}
        </React.Fragment>
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
    filterPanel: (type, id) => filterPanel(dispatch, type, id)
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListList)

export default connected