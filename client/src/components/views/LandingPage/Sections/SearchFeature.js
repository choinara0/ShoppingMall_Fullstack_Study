import React, {useState} from 'react';
import {Input} from "antd";

const {Search} = Input;

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (event) => {
        setSearchTerm(event.target.value)
        props.refreshFunction(event.target.value) //타이핑을 할 때 부모컴포넌트(landingpage.js)에 값을 전달
    }

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{width: 200}}
                value={SearchTerm}
            />
        </div>
    );
}

export default SearchFeature;