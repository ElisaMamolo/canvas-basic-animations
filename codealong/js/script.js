const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    //insert canvas inside of the bdy as its first child
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    //call updategamearea every 20 seconds
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function () {
    //get context and clear canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    //take x,y, width and heigh and create watever is in x and y
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 38: // up arrow
      player.speedY -= 1;
      break;
    case 40: // down arrow
      player.speedY += 1;
      break;
    case 37: // left arrow
      player.speedX -= 1;
      break;
    case 39: // right arrow
      player.speedX += 1;
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
}

//create object called player and initialize its class
const player = new Component(30, 30, "red", 0, 110);

myGameArea.start();
