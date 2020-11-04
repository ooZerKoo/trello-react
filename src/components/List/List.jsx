import React from 'react'
import { connect } from 'react-redux'
import { setListList } from '../../services/redux/actions.js'
import { apiGetListList, } from '../../services/api/api.js'

import { Row, Typography } from 'antd'
const { Title, Paragraph } = Typography

let done = false
const ListList = props => {
    const getListList = async () => {
        apiGetListList(props.token, props.idPanel)
            .then(list => props.setListList(props.idPanel, list))
    }

    if (!done || !props.list[0]) {
        getListList()
        done = true
    }

    if (props.list[0] && props.list[0].list && props.list[0].list.length > 0) {
        return (<React.Fragment>
            {props.list[0].list.map(l => (
                <Row key={l._id}>
                    <Title>{l.name}</Title>
                    <Paragraph>{l.description}</Paragraph>
                </Row>
            ))}
        </React.Fragment>)
    }
    return <React.Fragment></React.Fragment>
}

const mapStateToProps = (state, extra) => ({
    list: state.list.filter(v => v.id === extra.idPanel),
    token: state.session.user.token,
})
const mapDispatchToProps = (dispatch) => ({
    setListList: (id, list) => setListList(dispatch, id, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListList)

export default connected