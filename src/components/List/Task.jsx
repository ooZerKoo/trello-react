import React from 'react'
import { connect } from 'react-redux'
import { setTaskList, setVisible, setDrawer, } from '../../services/redux/actions.js'
import { apiDeleteTask, apiGetTaskList, apiUpdateTaskPosition, apiUpdateTaskStatus } from '../../services/api/api.js'

import { DeleteOutlined, CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import { Popconfirm, Col, Empty, Button } from 'antd'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import './Task.scss'

import TaskForm from './../Forms/TaskForm'

const TaskList = props => {

    const getTaskList = async () => {
        apiGetTaskList(props.token, props.idList)
            .then(task => props.setTaskList(props.idList, task))
    }

    const deleteOneTask = (id) => {
        apiDeleteTask(props.token, id)
            .then(() => getTaskList())
    }

    const dragEndTask = async (result) => {
        if (result.destination !== null) {
            const id = result.draggableId
            const position = result.destination.index
            if (position >= 0) {
                const origin = result.source.index
                reorderTask(origin, position)
                apiUpdateTaskPosition(props.token, id, position + 1)
            }
        }
    }
    const reorderTask = (origin, position) => {
        const list = Array.from(props.task[0].list)
        const [removed] = list.splice(origin, 1)
        list.splice(position, 0, removed)
        props.setTaskList(props.idList, list)
    }

    const showPopconfirm = (id) => props.setVisible(id, true)
    const handleCancel = (id) => props.setVisible(id, false)

    const toggleStatus = (id) => {
        apiUpdateTaskStatus(props.token, id)
            .then(task => getTaskList(task))
    }

    const getActions = (task) => {
        const currentArray = props.actions.filter(v => v.id === task._id)
        const current = currentArray[0] ? currentArray[0] : { visible: false }
        return (
            <ul className="ant-list-item-action">
                <li>
                    <Popconfirm
                        title='¿Quieres eliminarlo?'
                        onConfirm={() => deleteOneTask(task._id)}
                        onCancel={() => handleCancel(task._id)}
                        visible={current.visible}
                    >
                        <DeleteOutlined key="delete" onClick={() => showPopconfirm(task._id)} />
                    </Popconfirm>
                </li>
                <li>
                    <Button type='text' onClick={() => toggleStatus(task._id)}>
                        {task.status === true && <CheckCircleTwoTone twoToneColor="#52c41a" />}
                        {task.status === false && <CloseCircleOutlined />}
                    </Button>
                </li>
            </ul>
        )
    }

    const renderTasks = () => props.task[0].list.map((task, index) => renderTask(task, index))
    const renderTask = (task, index) => {
        return (
            <Draggable key={task._id} draggableId={task._id} index={index}>
                {(provided, snapshot) => (
                    <li className={(task.status ? 'taskDone' : '') + ' ant-list-item'} key={task._id} span={24} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="ant-list-item-meta">
                            <div className='ant-list-item-meta-content'>
                                <h4 className="ant-list-item-meta-title">{task.name}</h4>
                                <div className="ant-list-item-meta-description">{task.description}</div>
                            </div>
                            {getActions(task)}
                        </div>
                    </li>
                )}
            </Draggable>
        )
    }

    if (props.task[0] && props.task[0].list && props.task[0].list.length > 0) {
        return (
            <React.Fragment>
                <div className='ant-list ant-list-split'>
                    <div className='ant-spin-nested-loading'>
                        <div className='ant-spin-container'>
                            <DragDropContext key='dragDropContext' onDragEnd={dragEndTask}>
                                <Droppable droppableId="droppable" direction="vertical">
                                    {(provided, snapshot) => (
                                        <ul className="ant-list-items"  {...provided.droppableProps} ref={provided.innerRef} >
                                            {renderTasks()}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                </div >
                <TaskForm idList={props.idList} />
            </React.Fragment>
        )
    }


    return (
        <Col span={24}>
            <Empty description='No hay ninguna tarea creada'>
                <TaskForm idList={props.idList} />
            </Empty>
        </Col>
    )
}

const mapStateToProps = (state, extra) => ({
    task: state.task.filter(v => v.id === extra.idList),
    token: state.session.user.token,
    actions: state.actions.actions,
})
const mapDispatchToProps = (dispatch) => ({
    setTaskList: (id, task) => setTaskList(dispatch, id, task),
    setVisible: (id, value) => setVisible(dispatch, id, value),
    setDrawerTask: (id, value) => setDrawer(dispatch, id, value),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default connected