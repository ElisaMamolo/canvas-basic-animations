const myObstacles = []; //store all created obstacles

const myGameArea = {
  canvas: document.createElement("canvas"),
  //track how many times the canvas is updated
  frames: 0,
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    //insert canvas inside of the bdy as its first child
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //call update game area every 20 seconds
    this.interval = setInterval(updateGameArea, 20);
  },
  score: function () {
    const points = Math.floor(this.frames / 5);
    this.context.font = "18px serif";
    this.context.fillStyle = "black";
    this.context.fillText(`Score: ${points}`, 350, 50);
  },
  clear: function () {
    //get context and clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  },
};

//create components, for our player element, and for the obstacles
class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;

    this.speedX = 0;
    this.speedY = 0;
  }

  newPos() {
    //give player a new position based on the speed
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    //take x,y, width and heigh and create whatever is in x and y
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    //method for class component, we pass the object obstacle
    //returns a boolean if we crashed or not
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38: // up arrow
      player.speedY -= 3;
      break;
    case 40: // down arrow
      player.speedY += 3;
      break;
    case 37: // left arrow
      player.speedX -= 3;
      break;
    case 39: // right arrow
      player.speedX += 3;
      break;
  }
});

//We will also need a keyup function so we stop adding speed to our player,
//otherwise, this won´t stop until another key is pressed. Let´s add it as well.
document.addEventListener("keyup", (e) => {
  //when nothing is moved speed is 0
  player.speedX = 0;
  player.speedY = 0;
});

//this gets called every 20 milliseconds
function updateGameArea() {
  //clear game area, the canvas
  myGameArea.clear();
  //give new position to the player
  //update x and y with the speed
  player.newPos();
  //update component
  player.update();
  //update obstacle
  this.updateObstacles();
  //check if game over
  checkGameOver();
  // update and draw the score
  myGameArea.score();
}

function updateObstacles() {
  for (i = 0; i < myObstacles.length; i++) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  myGameArea.frames += 1;
  //counter for the frames, incremented by 1 each time
  if (myGameArea.frames % 120 === 0) {
    //This condition will determine every how many update we create new obstacles.
    //We set every 120 updates, that means 2.4 seconds,
    //because we call the updateGameArea() function every 20 milliseconds.
    let x = myGameArea.canvas.width;
    let minHeight = 20;
    let maxHeight = 200;
    let height = Math.floor(
      Math.random() * (maxHeight - minHeight + 1) + minHeight
    );
    //randomized height between 20 and 200 to be the height for the obstacles
    let minGap = 50;
    let maxGap = 200;
    let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    //same randomized with gap
    //create a new component and push to the obstacles array
    myObstacles.push(new Component(10, height, "green", x, 0));
    //position is x = canvas width and 0 is y at position 0
    myObstacles.push(
      new Component(10, x - height - gap, "green", x, height + gap)
    );
  }
}

function checkGameOver() {
  const crashed = myObstacles.some(function (obstacle) {
    return player.crashWith(obstacle);
  });

  if (crashed) {
    myGameArea.stop();
  }
}

//create object called player and initialize its class
const player = new Component(30, 30, "red", 0, 110);

myGameArea.start();
