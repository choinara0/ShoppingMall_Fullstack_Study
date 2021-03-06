import React, {useState} from 'react';
import {Typography, Form, Button, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from "axios";

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
    const updateImages = (newImages) => {
        setProductImage(newImages)
    }
    const submitHandler = (event) => {
        event.preventDefault(); //확인 버튼을 눌렀을 때 자동적으로 page가 refresh 되지 않도록 함

        if(!productName || !productDescription || !productPrice || !Continent || !productImage){
            return alert("모든 값을 입력하세요.")
        }
        // 서버에 채운 값들을 request로 보낸다.
        const body = {
            //Login된 사람의 ID
            writer: props.user.userData._id,
            title: productName,
            description: productDescription,
            price: productPrice,
            images: productImage,
            continent: Continent
        }
        Axios.post("/api/product", body)
            .then(response => {
                if (response.data.success){
                    alert("상품 업로드에 성공했습니다.")
                    props.history.push('/') //상품 업로드 성공시 첫페이지로 이동하게 설정
                }
                else{
                    alert('상품 업로드에 실패했습니다.')
                }
            })
    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}> 여행 상품 업로드 </Title>
            </div>

            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages}/>
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
                <Button type="submit" onClick={submitHandler}>
                    확인
                </Button>
            </Form>

        </div>
    );
}

export default UploadProductPage;