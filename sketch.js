//initialize x and y position in matrix
let textYpos = 200;
let textXpos = 0;
//initailize movement speed
let dropSpeed = 5;
//spacing in between lines of numbers
let xSpacing = 15;
let ySpacing = 10;
//An array of random numbers for Y positions
let yInitialPos = [];
//An array of random numbers for the length of number line
let numberLength = [];
//X position for each text
let textXposInLine = 0;
//Y position for each text
let textYposInLine = 0;
//Timer
let timeCounter = 0;
//Gaps between each line
let lineGaps = [];

let topLayer;
let slider;
let img;

function preload() {
  img = loadImage('beachwalk.jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  randomizer();

  topLayer = createGraphics(width, height);
  
  topLayer.background(200);
  topLayer.textSize(50);
  topLayer.textAlign(CENTER);
  topLayer.text("긁어주세요", width/2, height/2);
  
  topLayer.image(img, 0, 0);
  
  //topLayer.strokeWeight(30);
  
        
  topLayer.blendMode(REMOVE);
  
  // 브러시 두께 조정을 위한 슬라이더 설정하기
  brushSizeSlider = createButton('굵기 조정하기');
  sizeSlider = createSlider(1, 32, 4, 0.1);
}

function draw() {
  
  background(255);
  frameRate(50);
  //run the timer
  timeCounter ++;
  //call main function
  movingNumberMatrix();
  
  if(mouseIsPressed){
    //크기조절 관련 코드
    //let sw = sizeSlider.value();
        //strokeWeight(sw);
    let sw = sizeSlider.value();
  topLayer.strokeWeight(sw);
    topLayer.line(pmouseX, pmouseY, mouseX, mouseY);
    
  }
  
  image(topLayer, 0, 0);
}

//매트릭스 효과 
function randomizer() {
  //Randomize three arrays 
  for (let a = 0; a < 100;  a++) {
  //Generate a array of ramdom numbers to be the length of number lines
  numberLength[a] = int(random(2, 20));
  //Generate a array of ramdom numbers to be the initial Y postions of the matrix 
  yInitialPos[a] = int(random(-50, 50));
  //Generate a array of ramdom numbers to be gaps length between each falling lines on Y axis
  lineGaps[a] = int(random(2, 8));
 }
}

function generateNumberMatrix() {
  textSize(12);
  fill(color(158,148,121));
  //For loop on x axis
  for (let xRepCounter = 0; xRepCounter < 50;  xRepCounter++) {
    //For loop on Y axis
    for(let yRepCounter = 0; yRepCounter < numberLength[xRepCounter]; yRepCounter ++) {
      // X positons 
      textXposInLine = textXpos + xRepCounter * xSpacing;
      // For loop for each falling number line
      //NOTE: change number 30 to higher or a inifinte number ('Timecounter') will cuase your computer overheated!!!!!!!!
      for (let lineRepCounter = 0; lineRepCounter < 30; lineRepCounter ++) {
        // Y positons 
        textYposInLine = textYpos + yInitialPos[xRepCounter] + yRepCounter * ySpacing - lineRepCounter * numberLength[xRepCounter] * (ySpacing + lineGaps[xRepCounter]);
        //Write numbers
        text(int(random(0, 10)), textXposInLine, textYposInLine);
      }
    }
  }
}


function movingNumberMatrix() {
  //Make the matrix move
  textYpos += dropSpeed;
  generateNumberMatrix();
}
