import React from 'react'
import { connect } from 'react-redux'
import { setTaskList, setVisible } from '../../services/redux/actions.js'
import { apiDeleteTask, apiGetTaskList, } from '../../services/api/api.js'

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Popconfirm, List } from 'antd'
import { NavLink } from 'react-router-dom';

const TaskList = props => {

    const getTaskList = async () => {
        apiGetTaskList(props.token, props.idList)
            .then(task => props.setTaskList(props.idList, task))
    }

    const deleteOneList = (id) => {
        apiDeleteTask(props.token, id)
            .then(getTaskList)
    }

    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)

    const getActions = (task) => {
        const currentArray = props.actions.filter(v => v.id === task._id)
        const current = currentArray[0] ? currentArray[0] : { visible: false }
        return [
            <Popconfirm
                title='¿Quieres eliminarlo?'
                onConfirm={() => deleteOneList(task._id)}
                onCancel={() => handleCancel(task._id)}
                visible={current.visible}
            >
                <DeleteOutlined key="edit" onClick={() => showPopconfirm(task._id)} />
            </Popconfirm>
            ,
            <NavLink to={'/' + task._id}><EyeOutlined key="ellipsis" /></NavLink>,
        ]
    }

    const renderList = () => {
        const data = props.task[0] && props.task[0].list ? props.task[0].list : []

        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={task => (
                    <List.Item>
                        <List.Item.Meta
                            actions={getActions(task)}
                            title={task.name}
                            description={task.description}
                        />
                    </List.Item>
                )}
            />
        )
    }

    return (<React.Fragment>{renderList()}</React.Fragment>)
}

const mapStateToProps = (state, extra) => ({
    task: state.task.filter(v => v.id === extra.idList),
    token: state.session.user.token,
    actions: state.actions.actions,
})
const mapDispatchToProps = (dispatch) => ({
    setTaskList: (id, task) => setTaskList(dispatch, id, task),
    setVisible: (id, value) => setVisible(dispatch, id, value),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default connected