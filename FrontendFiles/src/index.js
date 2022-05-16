const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const path = require('path');

app.use(cors());

 const Gpio = require('pigpio').Gpio;

 const rightFront = new Gpio(16, {mode: Gpio.OUTPUT});

 const leftFront = new Gpio(22, {mode: Gpio.OUTPUT});

 const rightBack = new Gpio(23, {mode: Gpio.OUTPUT});

 const leftBack = new Gpio(12, {mode: Gpio.OUTPUT});

 const biceptLift = new Gpio(26, {mode: Gpio.OUTPUT});
//1 , true = 255, false = 1
 const shoulderRotator = new Gpio(1, {mode: Gpio.OUTPUT});
//2 , true = 255, false = 1
 const forearmLift = new Gpio(5, {mode: Gpio.OUTPUT});
//3, true = 255, false = 1
 const wristRotate = new Gpio(7, {mode: Gpio.OUTPUT});
//4, true = 255, false = 1
 const wristLift = new Gpio(9, {mode: Gpio.OUTPUT});
//5, true = 255, false = 1
 const grasper = new Gpio(11, {mode: Gpio.OUTPUT});
//6, true = 255, false = 1
 var speedMult = 0.0;


io.on('connection', (socket) => {
  socket.emit('initial', {});
  socket.on('motorUpdate', event => {
    console.log(event);
      if(event.rightBackDir == 255 && event.leftBackDir == 255)
      {
        rightFront.pwmWrite(event.rightFrontDir - (127 * speedMult))
        rightBack.pwmWrite(event.rightBackDir - (127 * speedMult))
        leftFront.pwmWrite(event.leftFrontDir - (127 * speedMult))
        leftBack.pwmWrite(event.leftBackDir - (127 * speedMult))
      }
      else if(event.rightBackDir == 1 && event.leftBackDir == 1)
      {
        rightFront.pwmWrite(event.rightFrontDir + (127 * speedMult))
        rightBack.pwmWrite(event.rightBackDir + (127 * speedMult))
        leftFront.pwmWrite(event.leftFrontDir + (127 * speedMult))
        leftBack.pwmWrite(event.leftBackDir + (127 * speedMult))
      }
      else if(event.rightBackDir == 255 && event.leftBackDir == 1)
      {
        rightFront.pwmWrite(event.rightFrontDir - (127 * speedMult))
        rightBack.pwmWrite(event.rightBackDir - (127 * speedMult))
        leftFront.pwmWrite(event.leftFrontDir + (127 * speedMult))
        leftBack.pwmWrite(event.leftBackDir + (127 * speedMult))
      }
      else if(event.rightBackDir == 1 && event.leftBackDir == 255)
      {
        rightFront.pwmWrite(event.rightFrontDir + (127 * speedMult))
        rightBack.pwmWrite(event.rightBackDir + (127 * speedMult))
        leftFront.pwmWrite(event.leftFrontDir - (127 * speedMult))
        leftBack.pwmWrite(event.leftBackDir - (127 * speedMult))
      }
      else if(event.rightBackDir != event.rightFrontDir){
        if(event.rightFrontDir == 255){
          rightFront.pwmWrite(event.rightFrontDir - (127*speedMult))
          leftFront.pwmWrite(event.leftFrontDir - (127*speedMult))
        }
        if(event.rightFrontDir == 1){
          rightFront.pwmWrite(event.rightFrontDir + (127*speedMult))
          leftFront.pwmWrite(event.leftFrontDir + (127*speedMult))
        }
      }
      else{
        rightFront.pwmWrite(0)
        rightBack.pwmWrite(0)
        leftFront.pwmWrite(0)
        leftBack.pwmWrite(0)
      }

      if(event.armMotor == 0){
        biceptLift.pwmWrite(0)
        shoulderRotator.pwmWrite(0)
        forearmLift.pwmWrite(0)
        wristRotate.pwmWrite(0)
        wristLift.pwmWrite(0)
        grasper.pwmWrite(0)
      }
      else if (event.armMotor == 1) {
        if(event.armDir){
          biceptLift.pwmWrite(255 - (127*speedMult))
        }
        else{
          biceptLift.pwmWrite(1+(127*speedMult))
        }
      }
      else if (event.armMotor == 2) {
        if(event.armDir){
          shoulderRotator.pwmWrite(255 - (127*speedMult))
        }
        else{
          shoulderRotator.pwmWrite(1+(127*speedMult))
        }
      }
      else if (event.armMotor == 3) {
        if(event.armDir){
          forearmLift.pwmWrite(255 - (127*speedMult))
        }
        else{
          forearmLift.pwmWrite(1+(127*speedMult))
        }
      }
      else if (event.armMotor == 4) {
        if(event.armDir){
          wristRotate.pwmWrite(255 - (127*speedMult))
        }
        else{
          wristRotate.pwmWrite(1+(127*speedMult))
        }
      }
      else if (event.armMotor == 5) {
        if(event.armDir){
          wristLift.pwmWrite(255 - (127*speedMult))
        }
        else{
          wristLift.pwmWrite(1+(127*speedMult))
        }
      }
      else if (event.armMotor == 6) {
        if(event.armDir){
          grasper.pwmWrite(255 - (127*speedMult))
        }
        else{
          grasper.pwmWrite(1+(127*speedMult))
        }
      }
      else{
        biceptLift.pwmWrite(0)
        shoulderRotator.pwmWrite(0)
        forearmLift.pwmWrite(0)
        wristRotate.pwmWrite(0)
        wristLift.pwmWrite(0)
        grasper.pwmWrite(0)
      }

      if(event.speedChange < 0.0)
       {
        if( speedMult > 0.19)
          {
            speedMult += event.speedChange;
          }
        }

      if(event.speedChange > 0.0)
        {
        if( speedMult < 1.0)
           {
            speedMult += event.speedChange;
           }
         }

  });
  });

  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

server.listen(3000);
