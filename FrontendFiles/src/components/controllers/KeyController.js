import React, { useEffect } from "react";
import './KeyController.css';

const KeyController = (props) => {

    useEffect(() => {

        let keys = [];

        const sendMotorUpdate = (leftFrontDir, leftBackDir, rightFrontDir, rightBackDir, armMotor, armDir, speedChange) => {
            props.socket.emit('motorUpdate', {leftFrontDir, leftBackDir, leftFrontDutyCycle, leftBackDutyCycle, rightFrontDir, rightBackDir, rightFrontDutyCycle, rightBackDutyCycle, armMotor, armDir, speedChange});
        }

        const updateMotors = () => {
            if (keys.includes('w') && keys.includes('s')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('d') && keys.includes('a')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('r') && keys.includes('f')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('t') && keys.includes('g')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('y') && keys.includes('h')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('u') && keys.includes('j')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('i') && keys.includes('k')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('o') && keys.includes('l')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('p') && keys.includes(';')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            } else if (keys.includes('z') && keys.includes('x')) {
                sendMotorUpdate(0, 0, 0, 0, 0, true, 0.0);
            }  else if (keys.includes('w')) {
                sendMotorUpdate(255, 255, 255, 255, 0, true, 0.0);
            } else if (keys.includes('s')) {
                sendMotorUpdate(1, 1, 1, 1, 0, true, 0.0);
            } else if (keys.includes('a')) {
                sendMotorUpdate(1, 1, 255, 255, 0, true, 0.0);
            } else if (keys.includes('d')) {
                sendMotorUpdate(255, 255, 1, 1, 0, true, 0.0);
            } else if (keys.includes('r')) {
                sendMotorUpdate(255, 0, 255, 0, 0, true, 0.0);
            } else if (keys.includes('f')) {
                sendMotorUpdate(1, 0, 1, 0, 0, true, 0.0);
            } else if (keys.includes('t')) {
                sendMotorUpdate(0, 0, 0, 0, 1, true, 0.0);
            } else if (keys.includes('g')) {
                sendMotorUpdate(0, 0, 0, 0, 1, false, 0.0);
            } else if (keys.includes('y')) {
                sendMotorUpdate(0, 0, 0, 0, 2, true, 0.0);
            } else if (keys.includes('h')) {
                sendMotorUpdate(0, 0, 0, 0, 2, false, 0.0);
            } else if (keys.includes('u')) {
                sendMotorUpdate(0, 0, 0, 0, 3, true, 0.0);
            } else if (keys.includes('j')) {
                sendMotorUpdate(0, 0, 0, 0, 3, false, 0.0);
            } else if (keys.includes('i')) {
                sendMotorUpdate(0, 0, 0, 0, 4, true, 0.0);
            } else if (keys.includes('k')) {
                sendMotorUpdate(0, 0, 0, 0, 4, false, 0.0);
            } else if (keys.includes('o')) {
                sendMotorUpdate(0, 0, 0, 0, 5, true, 0.0);
            } else if (keys.includes('l')) {
                sendMotorUpdate(0, 0, 0, 0, 5, false, 0.0);
            } else if (keys.includes('p')) {
                sendMotorUpdate(0, 0, 0, 0, 6, true, 0.0);
            } else if (keys.includes(';')) {
                sendMotorUpdate(0, 0, 0, 0, 6, false, 0.0);
            } else if (keys.includes('z')) {
                sendMotorUpdate(0, 0, 0, 0, 0, false, -.1);
            } else if (keys.includes('x')) {
                sendMotorUpdate(0, 0, 0, 0, 0, false, 0.1);
            } else {
                sendMotorUpdate(0, 0, 0, 0, 0, false, 0.0);
            }
        }

        const keyUpHandler = (event) => {
            keys.pop(event.key);
            updateMotors();
        };

        const keyDownHandler = (event) => {
            if (!keys.includes(event.key)) {
                keys.push(event.key);
                updateMotors();
            }
        }

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);

        return () => {
            window.removeEventListener('keyup', keyUpHandler);
            window.removeEventListener('keydown', keyDownHandler);
        }

    }, [props.socket]);


    return (
        <div className='key-controller'>
            <h1>Key Control</h1>

            <button class ="circle" onclick="sendMotorUpdate(true, true, 0, 0, false, false, 0, 0, 0.0)">Stop</button>
        </div>
    )
}

export default KeyController;
