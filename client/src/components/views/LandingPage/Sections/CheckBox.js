import React from 'react';
import {Checkbox, Collapse} from "antd";

const {Panel} = Collapse;

function CheckBox(props) {

    const renderCheckBoxLists = () => props.list&& props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange/>
                <span>{value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckBoxLists()}
                </Panel>
            </Collapse>,
        </div>
    );
}

export default CheckBox;