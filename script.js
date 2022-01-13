/*
CANVAS STATE

s two important methods to save and restore the canvas states
What gets saved in the state is:
The current values of the following attributes: strokeStyle, fillStyle, globalAlpha, lineWidth, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, font, textAlign, textBaseline,
the transformations such as translate, rotate and scale, etc. (more advanced concepts)

Canvas state is stored in a stack every time the save method is called, and the last saved state is returned (popped) from the stack every time the restore method is called.

save() - this method pushes the current state in the stack.

restore() - this method pops the top state on the stack, restoring the context to that state.


*/

/*
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const cWidth = canvas.width;
const cHeight = canvas.height;

function drawCanvas(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

drawCanvas(10, 20, 30, 30, 'turquoise');
ctx.save();

drawCanvas(50, 70, 30, 30, 'orangeRed');
ctx.save();

drawCanvas(120, 150, 30, 30, 'magenta');

ctx.restore();

drawCanvas(200, 70, 30, 30);
// ctx.save(); // => this would give us back orangeRed
ctx.restore();

drawCanvas(250, 20, 30, 30);
*/


/*ANIMATION IS ILLUSION OF MOVEMENT
use a sset of frames
How to draw new frames
1. Save canvas state If you are changing any setting (such as styles, transformations, etc.) which affect the canvas state and you want to make sure the original state is used each time a frame is drawn, you need to save that original state.
2. Clear the canvas Unless the shapes you will be drawing fill the complete canvas (for instance a backdrop image), you need to clear any shapes that have been drawn previously. The easiest way to do this is by using the clearRect() method.
3. Draw animated shapes The step where you do the actual frame rendering.
4. Restore the canvas state If you’ve saved the state, restore it before drawing a new frame.
 


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const color = {
  red: Math.floor(Math.random() * 255),
  green: Math.floor(Math.random() * 255),
  blue: Math.floor(Math.random() * 255),
  rgb: function () {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
};

function updateCanvas() {
  color.red = (color.red + 1) % 255;
  color.blue = (color.blue + 1) % 255;
  color.green = (color.green + 1) % 255;

  ctx.clearRect(0, 0, 480, 270);
  ctx.fillStyle = color.rgb();
  ctx.fillRect(0, 0, 150, 150);

  requestAnimationFrame(updateCanvas);
}

updateCanvas();
*/

/* MOVING ELEMENTS
add(or subtract, depending on the direction we want to move our element) a certain quantity 
depending on the speed we want to set to the elements.

*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/*
First, let’s create store our canvas element and set the 
context. Then we will create three red squares, located in different coordinates of our canvas. Also, we are going to create
three variables to control the speeds of our elements.
*/
ctx.fillStyle = "#FF0000";
// ctx.fillRect(100, 0, 50, 50);
// ctx.fillRect(300, 0, 50, 50);
// ctx.fillRect(500, 0, 50, 50);

let speed1 = 0;
let speed2 = 0;
let speed3 = 0;

//Then let’s create a function to clear our canvas each time we refresh it.
function clearCanvas() {
  ctx.clearRect(0, 0, 700, 450); // 700 and 450 are canvas width and height
}

//draw it again
function drawCanvas(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
  
/*
 increment the speed of our elements in three different quantities, this way we will get various speeds. Don´t forget we need to call
 out window.requestAnimationFrame(updateCanvas) method, so our canvas updates.
*/
function updateCanvas() {
    // in order to see animation, let's change speed1,2 and 3 on every call
    speed1 += 1;
    speed2 += 2;
    speed3 += 3;
  
    // clear the canvas
    clearCanvas();
  
    // redraw the canvas
    drawCanvas(50, speed1, 50, 50, 'red');
    drawCanvas(150, speed2, 50, 50, 'green');
    drawCanvas(250, speed3, 50, 50, 'yellow');
  
    requestAnimationFrame(updateCanvas);
  }
  
  updateCanvas();

  //EXERCISE HOW TO MOVE BOTTOM TO TOP
  


  
