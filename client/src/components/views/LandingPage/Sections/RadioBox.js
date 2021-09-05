import React from 'react';
import {Collapse} from "antd";
const {Panel} = Collapse;
function RadioBox(props) {

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">

                </Panel>
            </Collapse>,
        </div>
    );
}

export default RadioBox;