import React from 'react'
import { connect } from 'react-redux'
import { setPhoto, setPhotos } from '../../services/redux/actions.js'
import { apiSearchPhoto } from '../../services/api/api.js'
import { Form, Input, List } from 'antd'

const ImageForm = props => {

    const searchPhoto = async (event) => {
        const search = event.target.value
        apiSearchPhoto(search)
            .then(list => props.setPhotos(list))
    }

    const setPhotoForm = (id) => {
        props.setPhoto(id)
    }

    return (
        <Form.Item label='Imagen de Portada'>
            <Input size='large' type="search" onChange={e => searchPhoto(e)}></Input>

            <List
                itemLayout="vertical"
                size="large"
                grid={{ gutter: 16, xs: 1 }}
                dataSource={props.photos}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <img width={272} alt="logo" src={item.urls.small} onClick={() => setPhotoForm(item.urls)} />
                    </List.Item>
                )}
            />

        </Form.Item>
    )
}

const mapStateToProps = state => ({
    photos: state.actions.photos,
})

const mapDispatchToProps = (dispatch) => ({
    setPhoto : (id) => setPhoto(dispatch, id),
    setPhotos : (list) => setPhotos(dispatch, list),
})

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageForm)

export default connected