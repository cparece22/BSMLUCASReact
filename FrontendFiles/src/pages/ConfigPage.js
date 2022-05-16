import React, { useState } from "react";
import './ConfigPage.css';
import Logo from "../components/Logo";

import { FormControl, InputGroup } from 'react-bootstrap';

const ConfigPage = () => {

    const [ip, setIP] = useState("");

    return (
        <>
            <Logo spinning={false}/>
            <InputGroup size='lg' className="w-pix-500">
                <FormControl
                    placeholder="Enter Robot's IP"
                    arla-label='RobotIP'
                    aria-describedby='RobotIP'
                    value={ip}
                    onChange={ e => setIP(e.value)}
                    on={e => console.log("gi")}
                />
            </InputGroup>
        </>

    )
}

export default ConfigPage;