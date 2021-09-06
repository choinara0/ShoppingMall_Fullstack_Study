import React, {useState} from 'react';
import {Checkbox, Collapse} from "antd";

const {Panel} = Collapse;

function CheckBox(props) {
    const [Checked, setChecked] = useState([])
    const handleToggle = (value) => {
        // 누른 것의 Index를 구하고

        const currentIndex = Checked.indexOf(value)



        const newChecked = [...Checked] //spread syntax를 이용하여 전체 checked를 가져온다.
        if(currentIndex === -1){ //전체 Checked된 State에서 현재 누른 Checkbox가 없다면 넣어주고
            newChecked.push(value)
        }else{// 전체 Checked된 State에서 현재 누른 Checkbox가 있다면 빼주고
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked) //부모 component인 LandingPage에 전달
    }

    const renderCheckBoxLists = () => props.list&& props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)}
                      checked={Checked.indexOf(value._id) === -1 ? false : true}/>
                <span>{value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="This is panel header 1" key="1">
                    {renderCheckBoxLists()}
                </Panel>
            </Collapse>
        </div>
    );
}

export default CheckBox;