var jotaro,jotaro2,jotaroRunning,jotaroAttack,bGround,bGroundImg,tokens,
    tokensImg,enemy,enemyImg,invisibleGround;

var time;
var gameState  = "play";
var obstaclesGroup,foodGroup;

var score = 0;

function preload(){
  jotaroRunning = loadAnimation("walk.gif");
  jotaroAttack = loadAnimation("jotaroGIF.gif")
  
  bGroundImg = loadImage("fbbackground.jpg");
  
  tokensImg = loadImage("jotaroTokens.png");
  
  enemyImg = loadAnimation("ezgif.com-gif-maker.gif");
}

function setup() {
  createCanvas(615, 400);
  
  bGround = createSprite(700,200);
  bGround.addImage("background",bGroundImg);
  bGround.x = bGround.width/2;
  bGround.velocityX = -5;
  bGround.scale = 2;
  
  jotaro = createSprite (50,370,40,40);
  jotaro.addAnimation("running",jotaroRunning);
  jotaro.scale = 0.8; 
  jotaro.visible = true;

  jotaro2 = createSprite (75,370,40,40);
  jotaro2.addAnimation("attacking",jotaroAttack);
  jotaro2.scale = 0.8;
  jotaro2.visible = false; 
  
  invisibleGround = createSprite(19,400,1165,10);
  invisibleGround.visible = false; 
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  
  if(gameState === "play"){
    background(220);
  
  //console.log(jotaro.y);
  spawnFood();
  //run();
  spawnObstacles(); 
  //jotaro.debug = true;
  jotaro.setCollider("rectangle",0,0,50,100);
  //jotaro2.debug = true;
  jotaro2.setCollider("rectangle",0,0,150,100);

 


  
  
  if(bGround.x < 100){
     bGround.x = bGround.width/2;
     }
  
  if(foodGroup.isTouching(jotaro)){
      foodGroup.destroyEach();
    score = score + 4;
  }
  
  if(keyDown("space") && jotaro.collide(invisibleGround)){
     jotaro.velocityY = -17;
     }

  if(jotaro.y === 50){
    score = 0;
  }

  if(jotaro2.visible === true && obstaclesGroup.isTouching(jotaro2)){ 
        obstaclesGroup.destroyEach();
        jotaro2.visible = false;
        jotaro.visible = true;
    }

  if(keyDown("DOWN_ARROW")){
    jotaro2.visible = true;
    jotaro.visible = false;
    jotaro.y = 370;
      
  }else {
    jotaro2.visible = false;
    jotaro.visible = true;
  }

  if(obstaclesGroup.isTouching(jotaro) && keyIsDown(DOWN_ARROW) === false){ 
    obstaclesGroup.destroyEach();
    score = score - 5;
  }
  
  jotaro.velocityY = jotaro.velocityY + 0.8;
  
  jotaro.collide(invisibleGround);
  jotaro2.collide(invisibleGround);
  //jotaro.collide(edges);
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  text("Score: " + score,450,50);

  if(score <= 0){
    textSize(20);
    fill("green");
    stroke("blue");
    //text("Avoid the rocks!",300,50);
    text("Press Space to jump!",50,50);
    text("Hold DOWN_ARROW to attack enemy when it comes close to you",20,100);
    //text("avoid losing points",20,125);
    text("Collect the tokens!",20,200);
    text("Get your score to 40!",10,150)
  }

  if(score >= 40 || keyDown("E") && keyDown("F") && keyDown("G")){
    gameState = "end";
    score = 0;
  } 
  
  }

  if(gameState === "end"){
    background(rgb(171,220,255));
    textSize(50);
    text("The End",200,200);
    textSize(20);
    text("Press 'R' to restart game", 185, 250)

    if(gameState === "end" && keyDown("R")){
      gameState = "play";
      
    }
  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 130 === 0) {
    tokens = createSprite(600,250,40,10);
    tokens.y = random(120,160);    
    tokens.addImage(tokensImg);
    tokens.scale = 0.3;
    tokens.velocityX = -5;
     //assign lifetime to the variable
    tokens.lifetime = 300;
    jotaro.depth = tokens.depth + 1;
    
    //add each tokens to the group
    foodGroup.add(tokens);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    enemy = createSprite(800,350,5,40);
    enemy.velocityX = -2;
    enemy.addAnimation("attack",enemyImg);
    //enemy.debug = true;
    enemy.setCollider("rectangle",0,0,200,100);
    
    //assign scale and lifetime to the obstacle     
    enemy.scale = 0.7;
    enemy.lifetime = 400;
    
    //add each obstacle to the group
    obstaclesGroup.add(enemy);
  }
}

function run(){
  if(keyIsDown(UP_ARROW) && score >= 20){
    bGround.velocityX = -25;
    enemy.velocityX = -20;
    tokens.velocityX = -15;
  }else{
    bGround.velocityX = -4;
  }
}

function grow(){
  if(jotaro.scale === 0.08 && foodGroup.isTouching(jotaro)){
    jotaro.scale = 0.8;
  }
}