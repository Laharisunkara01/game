var bkg,bkgI;
var player,playerI;
var invisibleGround;
var fireball,I,fireGroup;
var block,blockI,blockGroup;
var villian,villianI,villianGroup;
var s,sI,sGroup;
var spade,spadeI,spadeGroup;
var shield,shieldI,shieldGroup;
var score=0;
var gameState="Start";
var invisibleSky;
var keyI;
var m,mI;
var mainVillian;

var sound1,sound2,sound3,sound4,sound5,sound6,sound7;


function preload(){
bkgI=loadImage("sprites/bkg.png");
createCanvas(1200,400);
playerI=loadAnimation("sprites/girl.png","sprites/g2.png","sprites/g3.png","sprites/g4.png","sprites/g7.png","sprites/g8.png","sprites/g5.png","sprites/g6.png");
I=loadImage("sprites/fireball.png")
heroI=loadAnimation("sprites/player.png","sprites/hero.png")
blockI=loadImage("sprites/block.png");
villianI=loadAnimation("sprites/v1.png","sprites/v2.png","sprites/v3.png","sprites/v4.png");
sI=loadAnimation("sprites/s1.png","sprites/s2.png","sprites/s3.png","sprites/s4.png");
spadeI=loadImage("sprites/w.png");
shieldI=loadImage("sprites/shield.png")
playerStanding=loadAnimation("sprites/g2.png")
keyI=loadImage("sprites/key.png");
mI=loadImage("sprites/m2.png");

sound1=loadSound("sh.wav");
sound2=loadSound("key.wav");
sound3=loadSound("spade.wav");
sound4=loadSound("v1.wav");
sound6=loadSound("playerover.wav");
sound7=loadSound("level.wav");

}


function setup() {
  createCanvas(1200,400);

  //createCanvas(windowWidth,windowHeight);

  bkg=createSprite(600,220);
  bkg.addImage(bkgI)
  bkg.scale=0.7;
  

  player=createSprite(100,320,20,20);
  player.addAnimation("standing",playerStanding)
  player.addAnimation("running",playerI)
  player.scale=0.8;
 // player.setCollider("rectangle",100,200,100,100)
  //player.debug=true;

  invisibleGround=createSprite(600,370,1200,8);
  invisibleGround.visible=false;

  invisibleSky=createSprite(600,10,1200,5)
  invisibleSky.visible=false;

  mainVillian=createSprite(1300,300);
  mainVillian.addImage(mI);
  mainVillian.visible=true
 // mainVillian.addAnimation("jumping",mI);

  //createEdgeSprites();
  edges=createEdgeSprites();
  

  


  blockGroup =new Group();
  villianGroup=new Group();
  fireGroup=new Group();
  spadeGroup=new Group();
  sGroup=new Group();
  shieldGroup=new Group();


 
}

function draw() {

  background("yellow")

  
  if(gameState==="play"){

    player.changeAnimation("running",player)
    if(bkg.x<0){
      bkg.x=600
    }
  
    bkg.velocityX=-4;
    
  
    if (keyDown("space")){
      player.velocityY=-8
      sound1.play();
  
      }
  
     /*if(player.isTouching(blockGroup)){
      player.collide(blockGroup)
    } */

    if (score>=2){
      //background(bkgI)
      image(bkgI,600,200,1200,400)
      mainVillian.visible=true
      bkg.velocityX=0;
    
      mainVillian.velocityX=-15
      mainVillian.bounceOff(edges);
     
      //console.log("working")
      mainVillian.scale=1
      //bkg.addImage(bkgI)
      //sound7.play();

  
    }
  
    if(score<2){
      spawnObstacle();
      spawnVillian();
     
      spawnS();
     
    }

    

     spawnSpade();
      spawnFire();

    //player.debug=true;
    player.setCollider("rectangle",20,0,150,120);
    
  
    player.velocityY=player.velocityY+0.8;
  
    player.collide(invisibleGround);
  
    if(shieldGroup.isTouching(player)){
      shieldGroup.destroyEach();
      score=score+1;
    }
   
   villianGroup.bounceOff(invisibleGround);
    villianGroup.bounceOff(invisibleSky);

    if(blockGroup.isTouching(player)){
      player.velocityX=0;
      player.velocityY=0;
      
    }
   
   
   if(spadeGroup.isTouching(villianGroup)){
     villianGroup.destroyEach();
     spadeGroup.destroyEach();
     score=score+1;
     sound3.play();
   }
  
   if (fireGroup.isTouching(villianGroup)){
     villianGroup.destroyEach();
     fireGroup.destroyEach();
     score=score+1;
     sound3.play();
   }
   
   

   if(spadeGroup.isTouching(sGroup)){
     sGroup.destroyEach();
     spadeGroup.destroyEach();
     score=score+1;
     sound3.play();
   }

   if(villianGroup.isTouching(player)){
    sound6.play();
    gameState="end";

   }
   if(sGroup.isTouching(player)){
     sound6.play();
     gameState="end";
   }

  

  }
 
  

  drawSprites();
  
  if(gameState==="end"){
    bkg.velocityX=0;
    player.addImage(playerStanding);
    villianGroup.setVelocityXEach(0);
    villianGroup.setVelocityYEach(0);
    sGroup.setVelocityXEach(0);
    blockGroup.setVelocityXEach(0);
   

  }
 
 
  fill("black");
  textSize(18);
  text("SCORE:"+score,40,60);

  if(gameState==="Start"){
    fill("white")
    rect(400,100,500,200);
    fill("black");
    text("Press space to start the game ",540,120);
    text("Bell needs to rescue rambo from the jail. In order to rescue",410,150)
    text("him she needs to kill the villians and collect the key.",420,180);
    text("Press Right Arrow Key to kill the villians by spade.",420,210)
    text("Press Up Arrow Key to kill the villians by fireballs",420,240)
    villianGroup.velocityX=0;
    sGroup.velocityX=0;
    blockGroup.velocityX=0;

    if(keyDown("space")){
      gameState="play";
    }
  }

  
  
  

}

function spawnObstacle()
  {
    if(frameCount % 150 ===0){
      block=createSprite(800,300);
      block.addImage(blockI);
      block.velocityX=-4;
      block.y=Math.round(random(300,100));
      block.scale=0.2;
      blockGroup.lifetime=400; 
      //block.debug=true;


      shield=createSprite(800,300);
      var a=Math.round(random(1,2));
      switch(a){
        case 1:
          shield.addImage(shieldI);
          break;
        case 2:
          shield.addImage(keyI);
          break;
      }
      sound2.play();
      shield.x=block.x;
      shield.y=block.y-35;
      shield.scale=0.1;
      shield.rotationToDirection=("clockwise")
      shield.rotationSpeed=20
      shield.velocityX=block.velocityX;
      shieldGroup.add(shield)
      blockGroup.add(block)
  
       }

  }

  function spawnVillian(){

    if(frameCount % 200 ===0){
      var a= Math.round(random(900,1200));
      var b= Math.round(random(50,200));
      villian=createSprite(a,b);
      villian.addAnimation("fire",villianI);
      villian.scale=0.3;
      //villian.y=Math.round(random(200,100));
      villian.lifetime=400
      villian.velocityX=-6;
      villian.velocityY=-10;
      //villian.debug=true;
      villianGroup.add(villian);
     
    } 

  } 

  

  function spawnSpade(){
    if(keyWentDown("RIGHT_ARROW")){
      spade=createSprite(player.x,player.y,10,10);
      spade.addImage(spadeI);
      spade.scale=0.2;
      spade.velocityX=4;
      spade.rotationToDirection=("anticlockwise");
      spade.rotationSpeed=20;
      spade.lifetime=200;
      //spade.debug=true;
      spadeGroup.add(spade);
    }
  

  }

  function spawnFire(){
    if(keyWentDown("UP_ARROW")){
      fireball=createSprite(player.x,player.y,20,20);
      fireball.addImage(I)
      fireball.scale=0.1
      fireball.velocityY=-8
      fireball.lifetime=200;
     // fireball.debug=true;
      fireGroup.add(fireball);
     // console.log("working")
   }
 

  }
  function spawnS(){
    if(frameCount % 190===0){

      s=createSprite(1200,300,20,20);
      s.addAnimation("spinning",sI);
      s.scale=0.7; 
      s.collide(invisibleGround);
      s.velocityX=-4;
      s.lifetime=400;
     // s.debug=true;
      sGroup.add(s);

    }
  }

  