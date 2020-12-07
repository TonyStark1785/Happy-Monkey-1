
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  monkey = createSprite(50,350,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //create a ground sprite
  ground = createSprite(200,390,900,20);
  ground.x = ground.width /2;
  ground.velocityX = -6;
  score=0;
  foodGroup=new Group();
  obstacleGroup=new Group();
  var survivalTime=0;
  
}


function draw() {
 background("cyan")
 
  text(mouseX+","+mouseY, mouseX, mouseY);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(keyDown("space")&&monkey.y>=349){
    monkey.velocityY=-15;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  console.log(monkey.y);
  spawnObstacle();
  spawnFood();
   
  drawSprites();
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
  }
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME: "+ survivalTime, 280, 50);
}

function spawnObstacle(){
 // write your code here 
  if (frameCount%300===0){
    var obstacle=createSprite(600, 370, 40, 10);
    obstacle.velocityX=-6;
    obstacle.addImage(obstacleImage);
   obstacle.scale=0.15;
    obstacle.lifetime=100;
    obstacleGroup.add(obstacle);
    }
}
function spawnFood(){
 // write your code here 
  if (frameCount%80===0){
    var banana=createSprite(600, 370, 40, 10);
    banana.velocityX=-6;
   banana.addImage(bananaImage);
   banana.scale=0.1;
   banana.lifetime=100;
    banana.y=Math.round(random(180, 300));
    foodGroup.add(banana);
    monkey.depth=banana.depth+1;
    }
}




