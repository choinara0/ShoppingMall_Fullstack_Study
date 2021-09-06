import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Icon, Col, Card, Row} from 'antd';
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import {continents, price} from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";



function LandingPage() {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0) //처음 데이터가 0에서 시작
    const [Limit, setLimit] = useState(8) //8개만큼 가져올 것
    const [PostSize, setPostSize] = useState(0) //
    const [Filters, setFilters] = useState({continents : [], price : []})
    const [SearchTerm, setSearchTerm] = useState("")


    const getProduct = (body) => {
        axios.post('api/product/products', body)
            .then(response=>{
                if(response.data.success){
                    if(body.loadMore){ //loadMore = true일 때는 기존의 productInfo + 새로 가져온 productInfo
                        setProducts([...Products, ...response.data.productInfo])
                    }else{
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
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
        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProduct(body)
        setSkip(skip)
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

    const showFilteredResult = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProduct(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price
        let array = [];
        for (let key in data) {
            if(data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters

        if (category === 'price') {
            let priceValue = handlePrice(filters)
            newFilters[category] = priceValue
        }
        showFilteredResult(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {
        setSearchTerm(newSearchTerm)
    }

    return (
        <div style={{width: '75%', margin: '3rem auto'}}>
            <div style={{textAlign: 'center'}}>
                <h2>Let's travel anywhere <Icon type="rocket"/></h2>
            </div>

            {/*{filter}*/}

            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}> {/*반응형을 위해 설정*/}
                    {/*{checkbox}*/}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                    {/*{radiobax}*/}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>

            {/*{search}*/}
            <div style={{ display : 'flex', justifyContent : 'flex-end', margin: '1rem auto'}}>
                <SearchFeature refreshFunction={updateSearchTerm}/>
            </div>

            {/*{Card}*/}
            <Row gutter={[16, 16]}> {/*카드끼리의 여백 설정*/}
                {renderCards}
            </Row>

            {PostSize >= Limit &&
                <div style={{justifyContent: 'center'}}>
                    <button onClick={loadMoreHandler}> 더 보기 </button>
                </div>
            }
        </div>
    )
}

export default LandingPage
