import React, { useState } from "react";
import './ControlPage.css';

import KeyController from "../components/controllers/KeyController";
import PS4Controller from "../components/controllers/PS4Controller";

const ControlPage = (props) => {
    // eslint-disable-next-line
    const [controller, setController] = useState('ps4');

    return (
        <div className='controller'>
            {{
                'key': <KeyController socket={props.socket} />
                'ps4': <PS4Controller socket={props.socket} />
            }[controller]}
        </div>
    )
}


export default ControlPage;
