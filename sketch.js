let serial;
let latestData = "waiting for data";
var angle = 0;
var slider;
var song;

function preload(){
  song = loadSound("Clock.mp3");
}


function setup() {
 createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);


    song.play();




 slider = createSlider(0, 180, PI / 4, 0.01);

 serial = new p5.SerialPort();

 serial.list();
 serial.open('COM3');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
}

function serverConnected() {
 print("Connected to Server");
}

function gotList(thelist) {
 print("List of Serial Ports:");

 for (let i = 0; i < thelist.length; i++) {
  print(i + " " + thelist[i]);
 }
}

function gotOpen() {
 print("Serial Port is Open");
}

function gotClose(){
 print("Serial Port is Closed");
 latestData = "Serial Port is Closed";
}

function gotError(theerror) {
 print(theerror);
}

function gotData() {
 let currentString = serial.readLine();
  trim(currentString);
 if (!currentString) return;
 console.log(currentString);
 latestData = currentString;
}


function draw() {
 background(0,0,0);



 fill(255,255,255);
push()
textSize(60)
translate(300, windowHeight/6)
text("... year 2520", 10,100)
pop()

push()
translate(200, windowHeight/6);
rotate(-90);


let hr = hour();
let mn = minute();
let sc = second();

strokeWeight(8);
stroke(205,23,23);
noFill();
let secondAngle = map(sc, 0, 60, 0, 360);
arc(0, 0, 300, 300, 0, secondAngle);

stroke(205,23,23);
let minuteAngle = map(mn, 0, 60, 0, 360);
//arc(0, 0, 280, 280, 0, minuteAngle);

stroke(150, 255, 100);
let hourAngle = map(hr % 12, 0, 12, 0, 360);
//arc(0, 0, 260, 260, 0, hourAngle);

push();
rotate(secondAngle);
stroke(255,14,14);
line(0, 0, 100, 0);
pop();

push();
rotate(minuteAngle);
stroke(205,23,23);
line(0, 0, 75, 0);
pop();

push();
rotate(hourAngle);
stroke(163,0,0);
line(0, 0, 50, 0);
pop();

stroke(255);
point(0, 0);


//  fill(255);
//  noStroke();
//  text(hr + ':' + mn + ':' + sc, 10, 200);
pop()





     push()
// text(latestData, 10, 10);
ellipse(width/2, height/2, map(latestData, 0, 1, 10,200));
// Polling method

if (serial.available() > 0) {
let data = serial.read();
// ellipse(50,50,data,data);
pop()
angle = slider.value();
stroke(255);
translate(windowWidth/2, windowHeight);
branch(windowHeight/4);


}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();

}

}

}
