import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Icon, Col, Card, Row} from 'antd';
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";


function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) //처음 데이터가 0에서 시작
    const [Limit, setLimit] = useState(8) //8개만큼 가져올 것

    const getProduct = (body) => {
        axios.post('api/product/products', body)
            .then(response=>{
                if(response.data.success){
                    console.log(response.data)
                    setProducts(response.data.productInfo)
                }else{
                    alert('상품을 가져오는데 실패했습니다.')
                }
            })
    }
    useEffect(()=>{

        let body = {
            skip: Skip,
            limit: Limit
        }
        getProduct(body)
    }, [])

    const loadMoreHandler = () => {
        let body = {
            skip: Skip,
            limit: Limit
        }
        getProduct(body)
    }

    const renderCards = Products.map((product, index) => {
        console.log(product)
        return <Col lg={6} md={8} xs={24} key={index}> {/*Row당 24size, 즉 중간 화면일 때 하나당 6, 가장 작은 화면일 때 하나당 24    */}
        <Card
            cover={<ImageSlider images={product.images}/>}>
            <Meta
            title={product.title}
            description={`$${product.price}`}

            />
        </Card>
        </Col> 
    })

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Let's travel anywhere <Icon type="rocket"/></h2>
            </div>

            {/*{filter}*/}
            {/*{search}*/}
            {/*{Card}*/}
            <Row gutter={[16, 16]}> {/*카드끼리의 여백 설정*/}
                {renderCards}
            </Row>


            <div style={{justifyContent: 'center'}}>
                <button onClick={loadMoreHandler}> 더 보기 </button>
            </div>

        </div>
    )
}

export default LandingPage
