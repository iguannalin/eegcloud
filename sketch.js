// Code from Jason Snell (https://openprocessing.org/sketch/1748494)
let mockEEG;
let tSize = 20;
let isTesting = true;
let isWaiting = true; // waiting for muse 2 to be active
let img;
let groupData = [];
let font;

function preload() {
  mockEEG = loadJSON("./mockData.json");
  font = loadFont('Inter-Medium.ttf');
  img = loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9zpUpOYnNHzkdvdscdzC5IME3_X-7OTHtFl36moXL3qHVawaDU4uNS_BqrOm6H2qltUE&usqp=CAU");
}

function setup() {
  textFont(font);
  createCanvas(windowWidth, windowHeight - 30);
  colorMode(HSB, 100);
  setupMuse();
  //printAllowedFeatures();
}

function draw() {
  if (isTesting) eeg = getMockData(eeg ,ppg);
  eeg.delta = Math.abs(eeg.delta/2.5);
  frameRate(5);
  let colorData = calculateHue(eeg);
  displayBackground(colorData);
  displayPrompt();
  // displayData();
  let gD = sendData(colorData);
  groupData.push(gD);
  // sendGroupData(groupData);
  // printValues(); // records new mockData.json file and saves it
}

function displayBackground(colorData) {
  if (isWaiting) return background('white');
  push();
    colorMode(HSB, 360);
    let leftColor = color(colorData[0], 200, 200);
    let rightColor = color(colorData[1], 200, 200);
    let ledColor = lerpColor(leftColor, rightColor, 0.5);
    background(ledColor);
  pop();
}

function displayPrompt() {
  push();
    rectMode(CENTER);
    textAlign(CENTER);
    textWrap(WORD);
    textSize(24);
    if (ppg.bpm && ppg.bpm > 35) {
      fill('white');
      translate(width/2, height/2);
      isWaiting = false;
      text("What is the memory you keep reliving?", 0, 0, 500);
    } else {
      fill('black');
      translate(width/2, height/3);
      isWaiting = true;
      text("Place the Muse 2 device on your head, and a prompt will be displayed on this screen.\n\nThink about this prompt, and wear the device for as long as you want.", 0, 0, 500);
      imageMode(CENTER);
      image(img, 0, 250);
    }
  pop();
}

function displayData() {
  textSize(tSize / 2);
  text("BATTERY: " + batteryLevel, width - 80, 10);

  textSize(tSize);
  let tHeight = 30;
  text("DELTA: " + eeg.delta, 10, tSize + (tHeight += tSize));
  text("THETA: " + eeg.theta, 10, tSize + (tHeight += tSize));
  text("ALPHA: " + eeg.alpha, 10, tSize + (tHeight += tSize));
  text("BETA:  " + eeg.beta, 10, tSize + (tHeight += tSize));
  text("GAMMA: " + eeg.gamma, 10, tSize + (tHeight += tSize));

  if (ppg.heartbeat) {
    text("HEART bpm: " + ppg.bpm + " •", 10, tSize + (tHeight += tSize));
  } else {
    text("HEART bpm: " + ppg.bpm, 10, tSize + (tHeight += tSize));
  }
}