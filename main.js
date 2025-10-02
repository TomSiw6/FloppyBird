const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const btn_start = document.getElementById('btn_start');
const btn_reset = document.getElementById('btn_reset');
const home_screen = document.getElementById('home_screen');
canvas.width = 392;
canvas.height = 808;

let spacePressed = false;
let angle = 0;
let score = 0;
let gamespeed = 2;
let frame = 0;

const background = new Image();
background.src = 'background_2.png'
const bg = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground(){
    if (bg.x1 <= -bg.width + gamespeed) bg.x1 = bg.width;
    else bg.x1 -= gamespeed;
    if (bg.x2 <= -bg.width + gamespeed) bg.x2 = bg.width;
    else bg.x2 -= gamespeed;
    ctx.drawImage(background, bg.x1, bg.y, bg.width, bg.height);
    ctx.drawImage(background, bg.x2, bg.y, bg.width, bg.height);
}

let myRec = new p5.SpeechRec('en-US');
myRec.continuous = true;
myRec.interimResults = true;


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    generateObstacles();
    ScoreView(score);
    player.update();
    player.draw();
    Collisions();
    if (Collisions()) {
        gamespeed = 0;
        player.vy = 0;
        btn_reset.style.display = 'block';
    }
    requestAnimationFrame(animate);
    frame++;
}

myRec.start();
myRec.onResult = parseResult;
btn_start.addEventListener('click', () => {
    btn_start.style.display = 'none';
    home_screen.style.display = 'none';
    animate()
});
btn_reset.addEventListener('click', () => {
    btn_reset.style.display = 'none';
    frame = 0;
    score = 0;
    gamespeed = 2;
    player.x = 50;
    player.y = 250;
    player.vy = 0;
    obstaclesArray.length = 0;
})

function parseResult(){
     let word = myRec.resultString.split().pop(); //gets most recent word
     console.log(word);
     //player.flap();
     if (word === 'jump' || word === 'flap'|| word === 'flop')
     {
      player.flap();
     }
    }

    window.addEventListener('click', () =>
    player.flap());

    window.addEventListener('keydown', function(e){
      if (e.code === 'Space') spacePressed = true;
    });
    window.addEventListener('keyup', function(e){
    if (e.code === 'Space') spacePressed = false;
    });

function Collisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (player.x < obstaclesArray[i].x + obstaclesArray[i].width  && player.x + player.width > obstaclesArray[i].x
        && ((player.y < obstaclesArray[i].top && player.y + player.height > 0)
            || (player.y > canvas.height - obstaclesArray[i].bottom && player.y + player.height < canvas.height))
            || player.y + player.height <= 0 || player.y + player.height >= 808) {
            ctx.font = '35px Impact';
            ctx.fillStyle = 'Black';
            ctx.fillText('Game Over, score: ' + score, canvas.width/6, canvas.height/2);
            return true;
        }
    }
}

function ScoreView(score) {
    ctx.font = '35px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeText(score, 290, 75);
    ctx.fillText(score, 290, 75)
}
