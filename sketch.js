var ground, groundImage, invisibleGround, invisibleAir;
var monkey, monkey_running, monkeyPause;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup, InvisibeGroup;
var score;
var play, end, serve;
var gameState;
var gameState = "play";

var bananaScore, score = 0;
var message;


function preload() {
  monkeyPause = loadAnimation("sprite_1.png");
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  // groundImage = loadImage("ground-clipart.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  Sound = loadSound("mixkit-arcade-retro-changing-tab-206.wav")
}

function setup() {
  createCanvas(600, 300);

  var message = "This is a message";

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  invisibleGroup = createGroup();
  ground = createSprite(300, 300, 600, 10);
  monkey = createSprite(35, 270, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;


  invisibleGround = createSprite(300, 290, 600, 10);
  invisibleGround.visible = false;
  monkey.degug = true;
  monkey.setCollider("circle", 10, 10, 180);
  invisibleGroup.add(invisibleGround);
  bananaScore = 0;
}

function draw() {
  background(300);
  fill("black");
  text("SURVIVAL TIME: " + score, 470, 20);
  text("Score: " + bananaScore, 300, 20);



  if (gameState === "play") {
    spawnObstacle();
    spawnBanana();
    score = score + Math.round(getFrameRate() / 60);
    monkey.addAnimation("monkey_running", monkey_running);

    score = score + Math.round(getFrameRate() / 60);

    //bananaScore = bananaScore + Math.round(getFrameRate()/ 60);
    //jump when the space key is pressed
    if (keyDown("space")) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.1
    if (monkey.isTouching(bananaGroup)) {
      bananaScore++;
      bananaGroup.destroyEach();
    }

    //bananaScore = bananaScore + Math.round(getFrameRate()/60);
    if (obstacleGroup.isTouching(monkey)) {
      gameState = "end";
    }
    if (ground.x < 0) {
      ground.x = 200;
    }


  } else if (gameState === "end") {
    obstacle.lifeTime = false;
    banana.lifeTime = false;

    ground.velocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(invisibleGroup);
  //add gravity

  drawSprites();
}

function spawnObstacle() {
  if (frameCount % 180 === 0) {
    obstacle = createSprite(600, 270, 30, 30);
    obstacle.addImage("obstacle", obstaceImage);
    obstacle.debug = true;
    monkey.debug = true;
    obstacle.scale = 0.13;
    obstacle.velocityX = -2
    obstacle.lifetime = 600;
    obstacleGroup.add(obstacle);
    obstacle.depth = monkey.depth;

    obstacle.setCollider("circle", 0, 5, 210);
    monkey.depth = monkey.depth - 1;
  }
}

function spawnBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 190, 50, 50);
    banana.addImage("banana", bananaImage);
    banana.setCollider("circle", 0, 0, 180);
    banana.scale = 0.13;
    banana.velocityX = -2
    banana.lifetime = 600;
    bananaGroup.add(banana);

  }
}