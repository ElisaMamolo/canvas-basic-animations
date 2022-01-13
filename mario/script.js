//FROM CODE PEN https://codepen.io/ironhack/pen/ZvmmGP

const img = new Image();
img.src = 'https://orig15.deviantart.net/8bed/f/2015/058/a/8/smb1_background_by_steamerthesteamtrain-d8jq7ea.png';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backgroundImage = {
  img: img,
  x: 0,
  speed: -1,

  move: function() {
    //move bg image 
    this.x += this.speed;
    //use % so no values are outside the with of my canva
    this.x %= canvas.width;
  },

  draw: function() {
      //pass im, pass x ad strat from 0
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
        //speed is negative 
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

function updateCanvas() {
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();

  requestAnimationFrame(updateCanvas);
}

// start calling updateCanvas once the image is loaded
img.onload = updateCanvas;