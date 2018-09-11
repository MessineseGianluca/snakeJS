function snakeBlock() {
  this.x = 0;
  this.y = 0;
}

function Snake() {
  this.dim = snakeDim;
  this.xSpeed = 1;
  this.ySpeed = 0;
  
  this.snakeBlocks = [];
  this.snakeBlocks.push(new snakeBlock(0, 0));

  this.update = function() {
    const tempCoordinates = this.getHeadBlock();
    this.snakeBlocks[0].x += this.xSpeed * this.dim;
    this.snakeBlocks[0].y += this.ySpeed * this.dim;

    for(let i = 1; i < this.snakeBlocks.length; i++) {
      let swapX = this.snakeBlocks[i].x;
      let swapY = this.snakeBlocks[i].y;
      this.snakeBlocks[i].x = tempCoordinates.x;
      this.snakeBlocks[i].y = tempCoordinates.y;
      tempCoordinates.x = swapX;
      tempCoordinates.y = swapY;
    }
  }

  this.show = function() {
    this.snakeBlocks.forEach(block => {
      fill(255);
      rect(block.x, block.y, this.dim, this.dim);
    });
  }

  this.checkSnakePosition = function(xScreen, yScreen) {
    const head = this.getHeadBlock();
    if(head.x >= xScreen) {
      this.changeHeadXCoordinate(0);
    } else if(head.x < 0) {
      this.changeHeadXCoordinate(xScreen - this.dim);
    } else if(head.y >= yScreen) {
      this.changeHeadYCoordinate(0);
    } else if(head.y < 0) {
      this.changeHeadYCoordinate(yScreen - this.dim);
    }
  }

  this.changeHeadXCoordinate = function(x) {
    this.snakeBlocks[0].x = x;
  }

  this.changeHeadYCoordinate = function(y) {
    this.snakeBlocks[0].y = y;
  }

  this.goUp = function() {
    this.changeSnakeDirection(0, -1);
  }

  this.goDown = function() {
    this.changeSnakeDirection(0, 1);
  }

  this.goRight = function() {
    this.changeSnakeDirection(1, 0);
  }

  this.goLeft = function() {
    this.changeSnakeDirection(-1, 0);
  }

  this.isGoingUp = function() {
    return this.xSpeed === 0 && this.ySpeed === -1;
  }

  this.isGoingDown = function() {
    return this.xSpeed === 0 && this.ySpeed === 1;
  }

  this.isGoingRight = function() {
    return this.xSpeed === 1 && this.ySpeed === 0;
  }

  this.isGoingLeft = function() {
    return this.xSpeed === -1 && this.ySpeed === 0;
  }

  this.biteItself = function() {
    let flag = false;
    let i = 0;
    while(i < this.snakeBlocks.length && !flag) {
      let j = i + 1;
      while(j < this.snakeBlocks.length && !flag) {
        if(this.snakeBlocks[i].x === this.snakeBlocks[j].x && 
           this.snakeBlocks[i].y === this.snakeBlocks[j].y) {
          flag = false;
        }
        j++;
      }
      i++;
    }
    return flag;
  }

  this.changeSnakeDirection = function(xDir, yDir) {
    this.xSpeed = xDir;
    this.ySpeed = yDir;
  }

  this.getCoordinates = function() {
    return this.getHeadBlock();
  }

  this.getHeadBlock = function() {
    return {
      x: this.snakeBlocks[0].x,
      y: this.snakeBlocks[0].y,
    }
  }

  this.grow = function() {
    const head = this.getHeadBlock();
    this.addNewBlock(head);
  }

  this.addNewBlock = function(coordinates) {
    const newBlock = new snakeBlock();
    newBlock.x = coordinates.x + this.xSpeed * this.dim;
    newBlock.y = coordinates.y + this.ySpeed * this.dim;
    this.snakeBlocks.unshift(newBlock);
  }
}