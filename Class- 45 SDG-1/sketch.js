var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Sonic



var score=0;

var gameOver, restart;



function preload(){
  
}

function setup() {
  createCanvas(600, 200);
  
  Sonic = createSprite(50,180,20,50);
  
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
  score = 0;
}

function draw() {

  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && Sonic.y >= 159) {
      Sonic.velocityY = -12;
    }
  
    Sonic.velocityY = Sonic.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  

    if(obstaclesGroup.isTouching(Sonic)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
  }
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
 
  
  score = 0;
  
}