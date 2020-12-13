//Variables
var dog, happyDog, database, foodS, foodStock;

function preload(){

  //Images are loaded

  dogImg = loadImage("dogImg.png");
  dogImg2 = loadImage("dogImg1.png");

}

function setup() {

  database = firebase.database();

  createCanvas(500, 500);

  dog = createSprite(250, 300, 70, 70);
  dog.addImage(dogImg);
  dog.scale = 0.4;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);
}


function draw() {  

  //Background

  background("cyan");

  //Key Commands

  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(dogImg2);

  }

  if(keyWentUp(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(dogImg);

  }

  //Food Refill

  if(foodS === 0){
    foodS = 20;
  }

  //Sprites are Shown

  drawSprites();

  //Texts

  textSize(25);
  fill("black");
  text("Food: " + foodS, 220, 90);
  text("Use the up arrow key to feed your pet!", 40, 50);
  
}

function readStock(data){

  foodS = data.val();

}

function writeStock(x){

  if(x <= 0){

    x = 0;

  }
  else{

    x = x - 1;
  
  }

  database.ref('/').update({

    Food : x

  })

}