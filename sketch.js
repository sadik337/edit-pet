var dog,happyDog,database,foodS,foodStock,dogImg,feedTime,lastFed,foodObj;

function preload()
{
	dogImg=loadImage("dog1.png");
  happyDog=loadImage("dog2.png");

}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
   
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(230,180,50,20);
  dog.addImage(dogImg);
  dog.scale=0.2

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
   
  foodObj= new Food();
}


function draw() {  
   background(46,139,87);

  
  feedTime=database.ref('feedTime');
  feedTime.on("value",function(data){
    feedTime=data.val();
  })
  
  

  
   fill(225225,254);
   textSize(15);
   if(lastFed>=12){
     text("last Feed :"+lastFed%12 + "pm",350,30);
   }else if(lastFed==0){
     ext("last Feed : 12 AM",350,30);
   }else{
     text("last Feed : "+ lastFed + "AM",350,30);
   }

   fill("black");
   text("Note: Press UP_ARROW to play with buggi",40,50);


   if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDog);
     
   }

  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
   Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}

