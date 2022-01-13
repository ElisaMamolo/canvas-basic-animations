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
      this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
  }
};

//create components, for our player element, and for the obstacles
class Component {
  constructor(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function updateGameArea() {
    //clear game area, the canvas
    myGameArea.clear();
    //update component
    player.update();
}

//create object called player and initialize its class
const player = new Component(30, 30, 'red', 0, 110);


//schedule updates in canvas, clear canvas, move the object