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
            .then(tasks => props.setTaskList(props.idPanel, props.idList, tasks))
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
        const tasks = Array.from(props.task)
        const [removed] = tasks.splice(origin, 1)
        tasks.splice(position, 0, removed)
        props.setTaskList(props.idPanel, props.idList, tasks)
    }

    const toggleStatus = (id) => {
        apiUpdateTaskStatus(props.token, id)
            .then(() => getTaskList())
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
                        onCancel={() => props.setVisible(task._id)}
                        visible={current.visible}
                    >
                        <DeleteOutlined key="delete" onClick={() => props.setVisible(task._id, true)} />
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

    const renderTasks = () => props.task.map((task, index) => renderTask(task, index))
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

    if (props.task.length > 0) {
        return (
            <React.Fragment>
                <div className='ant-list ant-list-split'>
                    <div className='ant-spin-nested-loading'>
                        <div className='ant-spin-container'>
                            <DragDropContext key='dragDropContext' onDragEnd={result => dragEndTask(result)}>
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
                <TaskForm idList={props.idList} idPanel={props.idPanel} />
            </React.Fragment>
        )
    }


    return (
        <Col span={24}>
            <Empty description='No hay ninguna tarea creada'>
                <TaskForm idList={props.idList} idPanel={props.idPanel} />
            </Empty>
        </Col>
    )
}

const mapStateToProps = (state) => ({
    token: state.session.user.token,
    actions: state.actions.actions,
})
const mapDispatchToProps = (dispatch) => ({
    setTaskList: (idPanel, idList, tasks) => setTaskList(dispatch, idPanel, idList, tasks),
    setVisible: (id, value) => setVisible(dispatch, id, value),
    setDrawerTask: (id, value) => setDrawer(dispatch, id, value),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskList)

export default connected