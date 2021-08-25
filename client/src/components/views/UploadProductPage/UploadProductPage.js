import React, {useState} from 'react';
import {Typography, Form, Button, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';

const {Title} = Typography;
const {TextArea} = Input;
const ContinentList = [
    {key:1, value:'Africa'},
    {key:2, value:'Asia'},
    {key:3, value:'Australia'},
    {key:4, value:'Antarctica'},
    {key:5, value:'Europe'},
    {key:6, value:'North America'},
    {key:7, value:'South America'},
]

function UploadProductPage(props) {
   const [productName, setProductName] = useState("");
   const [productDescription, setProductDescription] = useState("");
   const [productPrice, setProductPrice] = useState(0);
   const [Continent, setContinent] = useState(1);
   const [productImage, setProductImage] = useState([]);

    const titleChangeHandler = (event) => {
       setProductName(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setProductDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setProductPrice(event.currentTarget.value)
    }
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}> 여행 상품 업로드 </Title>
            </div>

            <Form>
                {/*dropzone*/}

                <FileUpload/>

                <br/>
                <br/>
                <br/>
                <label> 이름 </label>
                <Input onChange={titleChangeHandler} value={productName}/>
                <br/>
                <br/>
                <label> 설명 </label>
                <TextArea onChange={descriptionChangeHandler} value={productDescription}/>
                <br/>
                <br/>
                <label> 가격 </label>
                <Input type='number' onChange={priceChangeHandler} value={productPrice}/>
                <br/>
                <br/>
                <select onChange={continentChangeHandler} value={Continent}>
                    {ContinentList.map(item=>(
                        <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                </select>
                <br/>
                <br/>
                <Button>
                    확인
                </Button>
            </Form>

        </div>
    );
}

export default UploadProductPage;