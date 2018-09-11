let snake;
let food;
let isLoop = true;


function setup() {
  createCanvas(screenWidth, screenHeight);
  snake = new Snake();
  food = new Food();
  frameRate(frameR);
}

function draw() {
  background(0);
  snake.update();
  snake.show();
  food.show();
  checkIfEatenAndUpdate(food, snake);
  if(snake.biteItself()) {
    endGame();
  }
  snake.checkSnakePosition(screenWidth, screenHeight);
}

function checkIfEatenAndUpdate() {
  if(food.isEaten(snake.getCoordinates())) {
    snake.grow();
    food.update();
  }
}

function keyPressed() {
  if(isLoop) {
    keyPressedWhileLoop(keyCode);
  } else {
    keyPressedWhileNoLoop(keyCode);
  }
}

function keyPressedWhileLoop(keyCode) {
  if(keyCode === UP_ARROW && !snake.isGoingDown()) {
    snake.goUp();
  } else if(keyCode === DOWN_ARROW && !snake.isGoingUp()) {
    snake.goDown();
    snake.changeSnakeDirection(0, 1)
  } else if(keyCode === RIGHT_ARROW && !snake.isGoingLeft()) {
    snake.goRight();
  } else if(keyCode === LEFT_ARROW && !snake.isGoingRight()) {
    snake.goLeft();
  } else if(keyCode === ESCAPE) {
    noLoop();
    changeLoopStatus();
  }
}

function keyPressedWhileNoLoop(keyCode) {
  if(keyCode === ESCAPE) {
    loop();
    changeLoopStatus();
  }
}

function changeLoopStatus() {
  isLoop = !isLoop;
}

function endGame() {
  noLoop();
}