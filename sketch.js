// Code from Jason Snell (https://openprocessing.org/sketch/1748494)
let mockEEG;
let isTesting = false;
let isMuseActive = true; // waiting for muse 2 to be active
let img;
let font;
let routerGUID = "b73009ec-1002-4de7-9aae-c6eb718223a6";
let prompts = [
  { prompt: "What is the memory you keep reliving?", GUID: "4ef9a56d-126f-4093-8970-75aae1895584", groupGUID: "403bbc6d-e1ef-447e-9af9-6cd2b56e82ae" },
  { prompt: "Think of a happy memory", GUID: "0fad8ef1-2ed8-4ce4-81d5-a69da364d4d8", groupGUID: "506bad4e-b286-4407-ba66-44130bd075f0" },
  { prompt: "Think of the last time you got angry", GUID: "73e1af17-c2a5-492f-a32c-1e4592c8270e", groupGUID: "84059ce3-d729-4913-818b-dfd77cc7dade" }
];
let promptIndex = 0;

function preload() {
  mockEEG = loadJSON("./mockData.json");
  font = loadFont('Inter-Medium.ttf');
  img = loadImage("image.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight - 30);
  textFont(font);
  colorMode(HSB, 100);
  setupMuse();
  frameRate(1);
}

function draw() {
  if (isTesting) eeg = getMockData(eeg, ppg);
  // printValues(); // records new mockData.json file and saves it

  eeg.delta = Math.abs(eeg.delta / 2.5); // normalize eeg delta numbers
  isMuseActive = (ppg.bpm && ppg.bpm > 20);

  let colorData = calculateHue();
  displayBackground();
  displayPrompt(prompts[promptIndex].prompt);
  routeData(colorData);
}

function touchEnded() {
  promptIndex = (promptIndex + 1) % prompts.length;
}

function displayBackground(color = "#5C21C9") {
  if (!isMuseActive) return background("white");
  return background(color);
}

function displayPrompt(prompt) {
  push();
  rectMode(CENTER);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(24);
  if (isMuseActive && promptIndex > 0) { // muse is on & prompt is chosen
    fill('white');
    translate(width / 2, height / 2);
    text(prompt, 0, 0, 500);
  } else {
    fill('black');
    translate(width / 2, height / 3);
    text("Place the Muse 2 device on your head, and a prompt will be displayed on this screen.\n\nThink about this prompt, and wear the device for as long as you want.", 0, 0, 500);
    imageMode(CENTER);
    image(img, 0, 250, 200, 150);
  }
  pop();
}
