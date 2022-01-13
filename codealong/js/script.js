const myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d');
        //insert canvas inside of the bdy as its first child
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

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
  