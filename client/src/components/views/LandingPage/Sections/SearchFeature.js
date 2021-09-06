import React from 'react';
import {Input} from "antd";

const {Search} = Input;

function SearchFeature(props) {
    return (
        <div>
            <Search
                placeholder="input search text"
                style={{width: 200}}
            />
        </div>
    );
}

export default SearchFeature;