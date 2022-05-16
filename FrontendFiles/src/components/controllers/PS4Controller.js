import React, { useEffect } from "react";
import './PS4Controller.css';


const PS4Controller = (props) => {

    useEffect(() => {
        let runLoopID;
        let axes = [];
        let buttons = [];
        let active;

        const sendMotorUpdate = (xAxisLeft, yAxisLeft, xAxisRight, yAxisRight, bottomButtonR, rightButtonR, leftButtonR, topButtonR, topTriggerL, topTriggerR, bottomTriggerL, bottomTriggerR, bottomButtonL, rightButtonL, leftButtonL, topButtonL) => {
            props.socket.emit('motorUpdate', {xAxisLeft, yAxisLeft, xAxisRight, yAxisRight, bottomButtonR, rightButtonR, leftButtonR, topButtonR, topTriggerL, topTriggerR, bottomTriggerL, bottomTriggerR, bottomButtonL, rightButtonL, leftButtonL, topButtonL});
        }

        const updateMotors = (axesArray, buttonArray) => {
          sendMotorUpdate(axesArray[0],axesArray[1],axesArray[2],axesArray[3],buttonArray[0].pressed,buttonArray[1].pressed,buttonArray[2].pressed,buttonArray[3].pressed,buttonArray[4].value,buttonArray[5].value,buttonArray[6].value,buttonArray[7].value,buttonArray[12].pressed,buttonArray[13].pressed,buttonArray[14].pressed,buttonArray[15].pressed);

        }


        const connectHandler = (event) => {
          console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", event.gamepad.index, event.gamepad.id, event.gamepad.buttons.length, event.gamepad.axes.length);
          let Gamepad = event.gamepad;
          axes = Gamepad[event.index].axes;
          buttons = Gamepad[event.index].buttons;

          if(!runLoopID) {
              runLoopID = setInterval(updateMotors, 50, axes, buttons);
            }

          //active = true;
        }

        const disconnectHandler = (event) => {
          console.log("Gamepad disconnected at index %d: %s.", event.gamepad.index, event.gamepad.id);
          let Gamepad = null;
          axes = [];
          buttons = [];

          if(runLoopID) {
            clearInterval(runLoopID)
            runLoopID = null;
          }
          //active = false;
        }


        window.addEventListener('gamepadconnected', connectHandler);
        window.addEventListener('gamepaddisconnected', disconnectHandler);

        return () => {
            window.removeEventListener('gamepadconnected', connectHandler);
            window.removeEventListener('gamepaddisconnected', disconnectHandler);
        }

    }, [props.socket]);

/*
    if (active) {
      if(!runLoopID) {
        runLoopID = setInterval(updateMotors, 50);
      }
    }

    if (!active) {
      if(runLoopID) {
        clearInterval(runLoopID)
        runLoopID = null;
      }
    }
*/

    return (
        <div className='ps4-controller'>
            <h1>PS4 Control</h1>

            <button class ="circle" onclick="">Stop</button>
        </div>
    )
}

export default PS4Controller;



/*
buttons[0] 	Bottom button in right cluster
buttons[1] 	Right button in right cluster
buttons[2] 	Left button in right cluster
buttons[3] 	Top button in right cluster

buttons[4] 	Top left front button
buttons[5] 	Top right front button

buttons[6] 	Bottom left front button
buttons[7] 	Bottom right front button

buttons[12] 	Top button in left cluster
buttons[13] 	Bottom button in left cluster
buttons[14] 	Left button in left cluster
buttons[15] 	Right button in left cluster

axes[0] 	Horizontal axis for left stick (negative left/positive right)
axes[1] 	Vertical axis for left stick (negative up/positive down)
axes[2] 	Horizontal axis for right stick (negative left/positive right)
axes[3] 	Vertical axis for right stick (negative up/positive down)
*/
