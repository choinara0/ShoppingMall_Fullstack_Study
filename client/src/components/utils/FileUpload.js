import React from 'react';
import Dropzone from 'react-dropzone'
import {Icon} from 'antd'
import axios from 'axios'

function FileUpload() {
    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header : {'content-type': 'multipart/form-data'}
        }

        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                }else{
                    alert('fail file upload')
                }
            })
    }
    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div
                            style={{
                                width: '300px', height: '240px', border:'1px solid lightgray',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type='plus' style={{fontSize: '3rem'}}/>
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    );
}

export default FileUpload;