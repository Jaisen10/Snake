class Game
{
  static dir = 1;  // 1 east 2 north 3 west 4 south
  static a = [10, 5, 5, 5, 4, 5, 3, 5, 2, 5];
  static array = [];
  static score = 0;
  static going = 0;
  static myInterval;
}

document.body.style.backgroundColor="#4560d6";

let canvas = document.getElementById("myCanvas");
canvas.style.position="absolute";
canvas.style.borderStyle="solid";
canvas.style.borderWidth="10px";
canvas.style.borderColor="#19505c";

let c = canvas.getContext("2d");

for (let i=0; i<400; i++)
{
  Game.array[i] = new Array(2);
  Game.array[i][0] = i % 20;
  Game.array[i][1] = Math.floor(i/20);
}

positionSquare();

draw(c);

c.fillStyle="#19505c";
c.fillRect(130, 168, 220, 144);
c.fillStyle="#4d79ab";
c.fillRect(140, 178, 200, 124);
c.fillStyle="#0a1b2e";
c.font="bold 40px Courier New";
c.fillText("Snake", 160, 216);
c.font="bold 20px Courier New";
c.fillText("Click anywhere", 160, 255);
c.fillText("to play.", 160, 280);

onkeydown=function()
{
  let k = event.key.toString();  
  if (k=="ArrowUp" && Game.a[2] != Game.a[4]) {Game.dir = 2;}
  if (k=="ArrowDown" && Game.a[2] != Game.a[4]) {Game.dir = 4;}
  if (k=="ArrowRight" && Game.a[3] != Game.a[5]) {Game.dir = 1;}
  if (k=="ArrowLeft" && Game.a[3] != Game.a[5]) {Game.dir = 3;}
}

onclick=function()
{
  if (Game.going == 0)
  {
    Game.a = [10, 5, 5, 5, 4, 5, 3, 5, 2, 5];
    Game.dir = 1;
    Game.score = 0;
    Game.going = 1;
    Game.myInterval = setInterval(myFunction, 100, c);
    draw(c);
  }
}

function myFunction(c)
{
  let x = Game.a[Game.a.length - 2];
  let y = Game.a[Game.a.length - 1];
  
  let fake = Game.a;
  
  for (let i=Game.a.length - 1; i>3; i-=2)
  {
    Game.a[i] = Game.a[i-2];
    Game.a[i-1] = Game.a[i-3];
  }
  
  if (Game.dir == 1) {Game.a[2]++;}
  if (Game.dir == 2) {Game.a[3]--;}
  if (Game.dir == 3) {Game.a[2]--;}
  if (Game.dir == 4) {Game.a[3]++;}
  
  let t = 0;
  
  for (let i=4; i<Game.a.length; i+=2)
  {
    if (Game.a[2]==Game.a[i] && Game.a[3]==Game.a[i+1]) {t = 1;}
  }
  
  if (Game.a[2] < 0 || Game.a[3] < 0 || Game.a[2] > 19 || Game.a[3] > 19) {t = 1;}
  
  if (Game.a[0] == Game.a[2] && Game.a[1] == Game.a[3])
  {
    Game.a[Game.a.length] = x;
    Game.a[Game.a.length] = y;
    Game.score++;
    
    let arr = [];
    for (let i=2; i<Game.a.length; i+=2)
    {
      let l = i/2 - 1;
      arr[l] = new Array(2);
      arr[l][0] = Game.a[i];
      arr[l][1] = Game.a[i+1];
      arr[l] = arr[l].toString()
    }
    
    let array1 = [];
    
    for (let i=0; i<400; i++)
    {
      if (!arr.includes(Game.array[i].toString()))
      {
        let l = array1.length;
        array1[l] = new Array(2);
        array1[l][0] = Game.array[i][0];
        array1[l][1] = Game.array[i][1];
      }
    }
   
    let num = array1.length;
    if (num==0 && t==0) {draw(c); t = 1;}
    else
    {
      num = Math.floor(num * Math.random());
      Game.a[0] = array1[num][0];
      Game.a[1] = array1[num][1];
    }
  }
  
  if (t==1)
  {
    clearInterval(Game.myInterval);
    setTimeout(function()
    {
      Game.going = 0;
      c.fillStyle="#19505c";
      c.fillRect(130, 165, 220, 150);
      c.fillStyle="#4d79ab";
      c.fillRect(140, 175, 200, 130);
      c.fillStyle="#0a1b2e";
      c.font="bold 30px Courier New";
      c.fillText("score: " + Game.score.toString(), 150, 210);
      c.font="bold 20px Courier New";
      c.fillText("Click anywhere", 150, 260);
      c.fillText("to play again.", 150, 285);
    }, 100);
  } else {draw(c);}
}

function draw(c)
{  
  c.clearRect(0, 0, 480, 480);
  c.fillStyle="#011d42";
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let x=0; x<20; x++)
  {
    for (let y=0; y<20; y++)
    {
      if ((x+y)%2 == 1)
      {
        c.fillStyle="#0c2754";
        c.fillRect(x * 24, y*24, 24, 24);
      }
    }
  }
  
  let x = Game.a[0];
  let y = Game.a[1];
  c.fillStyle="#d64545";
  c.beginPath();
  c.arc(x*24 + 12, y*24 + 12, 9, 0, 2*Math.PI);
  c.fill();
  
  c.fillStyle="#23914b";
  for (let i=2; i<Game.a.length; i+=2)
  {
    x = Game.a[i];
    y = Game.a[i+1];
    c.fillRect(x*24 + 2, y*24 + 2, 20, 20);
  }
  
  c.fillStyle="#6fccf7";
  c.font="bold 20px Courier New";
  c.fillText("score: " + Game.score.toString(), 10, 470);
}

window.onresize = function() {
  positionSquare();
}

function positionSquare()
{
  if (window.innerWidth >= 500)
  {
    document.body.style.overflowX="hidden";
    document.getElementById("myCanvas").style.left="calc(50% - 250px)";
  }
  else
  {
    document.body.style.overflowX="scroll";
    document.getElementById("myCanvas").style.left="0px";
  }
  
  if (window.innerHeight >= 500)
  {
    document.body.style.overflowY="hidden";
    document.getElementById("myCanvas").style.top="calc(50% - 250px)";
  }
  else
  {
    document.body.style.overflowY="scroll";
    document.getElementById("myCanvas").style.top="0px";
  }
}
