var ghost,ghostImage;
var tower,towerImage;
var climber,climberImage,climberGroup;
var door,doorImage,doorGroup;
var invisibleBlock,invisibleBlockGroup;
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
ghostImage=loadImage("ghost-standing.png");
  
 towerImage=loadImage("tower.png");
  
  doorImage=loadImage("door.png");
  
  climberImage=loadImage("climber.png");
  
}

function setup(){
  createCanvas(600,600)
  
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.5;
  
  doorImage=loadImage("door.png");
  
  invisibleBlockGroup=createGroup();
  climberGroup=createGroup();
  doorGroup=createGroup();
}

function draw(){
  background(0);
  
  if (gameState === PLAY){
  
  if (keyDown("space")){
    ghost.velocityY=-12;
  }
  
  ghost.velocityY=ghost.velocityY + 0.8
  
  if (keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-8;
  }
  
  if (keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+8;
  }
  
  tower.velocityY=1;
  
  if(tower.y > 400){
    tower.y=300;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y >= 600){
    gameState=END;
    ghost.destroy();
  }
  
  spawnDoors();
  
  drawSprites();

}
if(gameState===END){
fill("yellow")
textSize(80)
text("Game over !!!",25,300);
}
}
function spawnDoors(){
 if (frameCount % 200 === 0){
   door=createSprite(200,-50);
   door.addImage(doorImage);
   door.velocityY=3;
   door.x=Math.round(random(150,400))
   
   climber=createSprite(door.x,10);
   climber.addImage(climberImage);
   climber.velocityY=3;
   
   invisibleBlock=createSprite(door.x,15,climber.Width,2);
   invisibleBlock.debug=true;
   invisibleBlock.velocityY=3;
   
   invisibleBlock.lifetime=800;
   climber.lifetime=800;
   door.lifetime=800;
   
   ghost.depth=door.depth;
   ghost.depth+=1;
   
   climberGroup.add(climber);
   doorGroup.add(door);
   invisibleBlockGroup.add(invisibleBlock);
   
     
 }
}

