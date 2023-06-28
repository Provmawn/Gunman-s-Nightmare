window.onload = function() {
	ctx = document.getElementById("canvas").getContext("2d"); 
	canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	canvas.height = window.innerHeight;
	HEIGHT = 560,
	WIDTH = canvas.width = 1900;
	gamePaused = false;
	pause = window.setInterval(update,20);
	alpha = 0;
	add = .01;
	godMode = false;
	//requestAnimationFrame(update);
	Img = {};
	Img.player = new Image();
	Img.player.src = "img/player.png";
	Img.hpBar = new Image();
	Img.hpBar.src = "img/hpBar.png";
	Img.meleeBar = new Image();
	Img.meleeBar.src = "img/meleeBar.png";
	Img.shootBar = new Image();
	Img.shootBar.src = "img/bulletBar.png";
	Img.jumpingEnemy = new Image();
	Img.jumpingEnemy.src = "img/jumpingEnemy.png";
	Img.flyingEnemy = new Image();
	Img.flyingEnemy.src = "img/flyingEnemy.png";
	Img.basicEnemy = new Image();
	Img.basicEnemy.src = "img/basicEnemy.png";
	Img.alienFace = new Image();
	Img.alienFace.src = "img/alienFace.png";
	Img.rapidFire = new Image();
	Img.rapidFire.src = "img/rapidFire.png";
	Img.hourGlass = new Image();
	Img.hourGlass.src = "img/hourGlass.png";
	Img.enemyBullet = new Image();
	Img.enemyBullet.src = "img/enemyBullet.png";
	Img.enemyBulletBlue = new Image();
	Img.enemyBulletBlue.src = "img/enemyBulletBlue.png";
	Img.bulletLeft = new Image();	
	Img.bulletLeft.src = "img/bulletLeft.png";
	Img.bulletRight = new Image();	
	Img.bulletRight.src = "img/bulletRight.png";
	Img.spaceShipBullet = new Image();	
	Img.spaceShipBullet.src = "img/spaceShipBullet.png";
	Img.finalBoss = new Image();
	Img.finalBoss.src = "img/finalBoss.png";
	Img.floor = new Image();
	Img.floor.src = "img/floor.png"
	Img.background = new Image();	
	Img.background.src = "img/background.png";
	Img.background1 = new Image();	
	Img.background1.src = "img/background1.png";
	Img.finalBoss2 = new Image();	
	Img.finalBoss2.src = "img/finalBoss2.png";
	sound = {};
	sound.finalBossMusic = new Audio('audio/Shiki no Uta [8-Bit Version - Original by Nujabes].wav');
	sound.finalBossMusic.volume = 1;
	sound.levelMusic = new Audio('audio/Nujabes - Samurai Champloo - Aruarian Dance [2A03+VRC7].mp3');
	sound.levelMusic.volume = 1;
	sound.gunShot = new Audio('audio/gunshot.mp3');
	sound.gunShot.volume = .1;
	sound.slash = new Audio('audio/Decapitation Sound.mp3');
	sound.slash.volume = .3;
	sound.lazer = new Audio('audio/lazer.wav');
	sound.lazer.volume = .3;
	ctx.font = "30px myFirstFont";
	frameCount = 1990;
	mainMenu = true;
	level3 = false;
	stage2 = false;
	blackScreen = false;
	blackEnabled = false;
	blackScreenTimer = 0;
	kills = 0;
	upgradeEnabled = false;
	createPlayer();

}
window.addEventListener("click", () => {
	startNewGame();
}, { once: true });

startNewGame = function(){
	player.meleeAtkSpd = 1;
	player.gunAtkSpd=1,
	player.atkSpdInc=1,
	player.hp = 100;
	timeWhenGameStarted = Date.now();
	frameCount = 0;
	score = 0;
	kills = 0;
	blackEnabled = false;
	blackScreenTimer = 0;
	blackScreen = false;
	stage2 = false;
	mainMenu = true;
	level3 = false;
	sound.finalBossMusic.volume = 0;
	sound.finalBossMusic.loop = true;
	sound.levelMusic.currentTime = 0;
	sound.levelMusic.loop = true;
	sound.levelMusic.play();
	sound.levelMusic.volume = 1;
	if(player.freeze != false){
		setFreeze();
	}
	if(player.spaceShip != false){
		setSpaceShip();
	}
	if(player.machineGun != false){
		player.machineGun = false;
	}
	if(player.meleeAtking != false){
		player.meleeAtking = false;
	}
	
	bossList = {};
	enemyList = {};
	enemyBulletList = {};
	upgradeList = {};
	bulletList = {};
	particleList = {};
	//generateBasicEnemy();
}

function generateJumpingEnemy(){
	var x = Math.random();
	var y = 0;
	//5 * Math.random(); to get random jumping speed
	var spdX = 3;
	var spdY = -4 * Math.random()+1;
	var width = 64;
	var height = 64;
	if(x < .5){
		x = -width;//enemy spawns off screen
	}
	else {
		x = WIDTH + width/2;
	}
	createJumpingEnemy(x,HEIGHT- height/2,spdX,2,Math.random(),width,height,1);
}

function createJumpingEnemy(x,y,spdX,spdY,id,width,height,hp){
	var enemy = {
		type:"jumpingEnemy",
		x:x,
		y:y,
		spdX:spdX,
		spdY:spdY,
		id:id,
		width:width,
		height:height,
		color:"green",
		jump:false,
		meleeHit:false,
		playerHits:0,
		timeBetweenShots:0,
		randomNumber:Math.random(),
		gravity:24 + Math.random()*3,
		force:0,
		fall:2,
		spriteCounter:0,
		direction:"left",
		//
		hp:hp,
	}
	enemy.force = enemy.gravity;
	enemyList[id] = enemy;
}


function createFinalBoss(){
	finalBoss = {
		type:"finalBoss",
		x:WIDTH+64,
		y:HEIGHT/2,
		spd:.02,
		angle:0,
		radius:180,
		spdX:.5,
		spdY:.5,
		width:128,
		height:128,
		hp:50,
		pushSpeed:30,
		pushDec:1,
		chargeAtkTimer:0,
		chargeAttack:false,
		chargeSpd:40,
		chargeDec:1,
		maxHp:200,
		bulletCycle:0,
		timeBetweenShots:0,
		spriteCounter:0,
		direction:"none",
		color:"red",
	}
	bossList[0] = finalBoss;
}
function createFlyingEnemy(x,y,id,spdX,spdY,width,height,offsetX,radius){
	var enemyFlying = {
		type:"flyingEnemy",
		x:x,
		y:y,
		id:id,
		spdX:spdX,
		spdY:spdY,
		width:width,
		height:height,
		hp:3,
		maxHp:3,
		color:"purple",
		offsetX:offsetX,
		meleeHit:false,
		timeBetweenShots:0,
		spriteCounter:0,
		angle:0,
		radius:2,
		randomNumber:Math.random(),
	}
	if(enemyFlying.randomNumber < .5){
		enemyFlying.randomNumber += .8;
	}
	enemyList[id] = enemyFlying;
}

function generateFlyingEnemy(){
	var x = Math.random();
	if(x <= .5){
		x = WIDTH + 15;
	}else{
		x = -15;
	}
	var y = HEIGHT/2 + 30 + Math.random() * 100 - Math.random() * 10;
	var id = Math.random();
	var spdX = 5;
	var spdY = Math.random()*10;
	var width = 64;
	var height = 64;
	var radius = Math.sqrt(width*width + height*height);
	var offsetX = Math.random();
	if(offsetX <= .5){
		offsetX = Math.floor(Math.random()+1)*10 + player.x;
	}else{
		offsetX = -Math.floor(Math.random()+1)*10 + player.x;
	}
	createFlyingEnemy(x,y,id,spdX,spdY,width,height,offsetX,radius);
}



function generateBasicEnemy(){
	var x = Math.random();
	var y = 0;
	var spdX = Math.floor(Math.random()+1)*5;
	var spdY = Math.random()* HEIGHT/2;
	var width = 64;
	var height = 64;
	if(x < .5){
		x = -width;//enemy spawns off screen
	}
	else {
		x = WIDTH + width/2;
	}
	createBasicEnemy(x,HEIGHT- height/2,spdX,2,Math.random(),width,height,1);
}

function createBasicEnemy(x,y,spdX,spdY,id,width,height,hp){
	var enemy = {
		type:"basicEnemy",
		x:x,
		y:y,
		spdX:spdX,
		spdY:spdY,
		id:id,
		width:width,
		height:height,
		color:"green",
		meleeHit:false,
		playerHits:0,
		spriteCounter:0,
		direction:"left",
		//
		hp:hp,
	}
	enemyList[id] = enemy;
}

function createPlayer(){
		player = {
		type:"player",
		x:150,
		y:150,
		spdX:5,
		spdY:5,
		width:64,
		height:64,
		color:"red",
		//
		maxHp:100,
		hp:100,
		//
		spriteCounter:0,
		pressingUp:false,
		pressingDown:false,
		pressingLeft:false,
		pressingRight:false,
		pressingShift:false,
		pressingSpace:false,
		pressingX:false,
		direction:"none",
		sprintMomentum:7,
		constantSpdX:10,
		sprint:false,
		jump:true,
		meleeAtking:false,
		bossKnockBack:false,
		gravity:27,
		force:0,
		fall:2,
		gunAtkSpd:1,
		meleeAtkSpd:1,
		atkSpdInc:1,
		machineGunSpd:0,
		machineGun:false,
		spaceShip:false,
		freeze:false,
		flightLength:500,
		freezeLength:200,
		machineGunLength:500,
	}
}

function particle(x,y,spdX,spdY,id,width,height,color,gravity,alpha){
	var particle = {
	type:"particle",
	x:x,
	y:y,
	spdX:spdX,
	spdY:spdY,
	id:id,
	width:width,
	height:height,
	color:color,
	timer:0,
	gravity:gravity,
	alpha:alpha,
	};
	particleList[id] = particle;
}

function generateParticle(entity){
	var x = entity.width * Math.random() + entity.x;
	var y = entity.height * Math.random() + entity.y;
	var alpha = 1;
	var spdX = Math.random();
	if(spdX < .4){
		spdX = -Math.random();
	}else if(spdX >= .3 && spdX <= .6 ){
		spdX = Math.random();
	}
	else {
		spdX = 0;
	}
	var spdY = -7.5;
	var gravity = .5;
	var id = Math.random();
	var width = 10.5;
	var height = 10.5;
	var color = "rgba(255,0,0," + alpha + ")";
	if(entity.type == "bullet"){
		width = 3;
		height = 3;
		color = "rgba(0,0,0,.8)"
	}
	particle(x,y,spdX,spdY,id,width,height,color,gravity,alpha);
}

function generateEnemyBullet(x,y,spdX,spdY,id,width,height,color,type,timer){
	var enemyBullet = {
	type:type,
	x:x,
	y:y,
	spdX:spdX,
	spdY:spdY,
	id:id,
	width:width,
	height:height,
	color:color,
	timer:timer,
	spriteCounter:0,
	}
	enemyBulletList[id] = enemyBullet;
}

function createEnemyBullet(entity,certainDirection){
	var type = "enemyBullet"
	var x = entity.x;
	var y = entity.y ;
	var id = Math.random();
	var xAngle = entity.x - player.x;
	var yAngle = entity.y - player.y;
	var timer = 0;
	var angle = Math.atan2(yAngle,xAngle)/Math.PI * 180;
	if(certainDirection != undefined){
		angle = certainDirection;
	}
	var spdX = -Math.cos(angle/180*Math.PI)*7;
	var spdY = -Math.sin(angle/180*Math.PI)*7;
	var height = 32;
	var width = 32;
	var color = "orange";
	if(entity.type == "jumpingEnemy"){
		type = "enemyBulletBlue";
	}
	if(entity.type == "finalBoss"){
		timer -= - Math.random()*20; // makes bullet last longer
	}
	
	generateEnemyBullet(x,y,spdX,spdY,id,width,height,color,type,timer);
}

function bullet(x,y,spdX,spdY,id,width,height,direction,color,type,particleLim){
	var bullet = {
	type:type,
	x:x,
	y:y,
	spdX:spdX,
	spdY:spdY,
	id:id,
	width:width,
	height:height,
	color:color,
	timer:0,
	direction:direction,
	particleLim:particleLim,
	}
	bulletList[id] = bullet;
}

function generateBullet(){
	var x = player.x;
	var y = player.y + 1;
	var type = "bullet";
	var spdX = 12;
	var spdY = 10;
	var particleLim = 0;
	var id = Math.random();
	var width = 15;
	if(player.spaceShip == !true){
		var direction = player.direction;
		var color = "black";
		var height = 10;
	}else{
		var direction = "down";
		var color = "green"
		var height = 10;
	}
	bullet(x,y,spdX,spdY,id,width,height,direction,color,type,particleLim);
}

function upgrade(x,y,spdX,spdY,id,width,height,color,category){
	var upgrade = {
	x:x,
	y:y,
	spdX:spdX,
	spdY:spdY,
	id:id,
	width:width,
	height:height,
	radius:1,
	angle:0,
	type:"upgrade",
	color:color,
	timer:0,
	category:category,
	}
	upgradeList[id] = upgrade;
}

	function generateUpgrade(){
		var x = Math.floor(Math.random()*WIDTH);
		var y = HEIGHT/2 + 40;
		var spdX = 0;
		var spdY = 0;
		var width = 30;
		var height = 30;
		var id = Math.random();
		if(id < .3){
			var color = "pink";
			var category = "freeze";
		}
		else if (id >= .3 && id <= .6){
			var color = "green";
			var category = "spaceShip";
		}
		else {
			var color = "grey";
			var category = "atkSpdInc";
		}
		upgrade(x,y,spdX,spdY,id,width,height,color,category);

	}

	document.onkeydown = function (event){
		if(event.keyCode === 49){
			if(godMode != false){
				generateUpgrade();
			}
		}					//d

		if(event.keyCode === 68){	//d
			player.pressingRight = true;
			player.direction = "right";
			if(player.spaceShip != true){
			player.direction = "right";
			}
		}
		else if(event.keyCode === 83)	//s
			player.pressingDown = true;
		else if(event.keyCode === 65){ //a
			player.pressingLeft = true;
			player.direction = "left";
			if(player.spaceShip != true){
			player.direction = "left";
			}
		}
		if(player.jump != true){
			if(event.keyCode === 87){ // w
				if(player.spaceShip != true){
					if(player.meleeAtking == false){
						player.force = player.gravity;
						player.jump = true;
					}
				}else {
					player.pressingUp = true;
				}
			}		
		}
		if(event.keyCode === 32){ // space
		event.preventDefault();
			player.pressingSpace = true;
				if(player.gunAtkSpd >= 100){
					if(player.spaceShip != true){
						sound.gunShot.currentTime = 0;
						sound.gunShot.play();
						generateBullet();
						player.gunAtkSpd = 0;
					}
				}		
		}
		if(event.keyCode === 88){ // x
			if(player.spaceShip != true){
				player.pressingX = true;
				if(player.sprint != true && player.meleeAtking != true){
					if(player.meleeAtkSpd >= 100){
						sound.slash.currentTime = 0;
						sound.slash.play();
						player.meleeAtkSpd = 0;
						player.spdX = player.spdX + player.sprintMomentum *5;
						player.meleeAtking = true;
					}
				}
			}
		}
		if(event.keyCode === 80){
			if(mainMenu != true){
				gamePaused = !gamePaused;
			}
		}
		if(event.keyCode === 16) //Left shift
			if(player.sprint != true && player.meleeAtking == false){
				player.pressingShift = true;
				player.spdX += player.sprintMomentum;
				player.sprint = true;
			}
	}

	document.onkeyup = function(event){
		if(event.keyCode === 68)	//d
			player.pressingRight = false;
		else if(event.keyCode === 83)	//s
			player.pressingDown = false;
		else if(event.keyCode === 65) //a
			player.pressingLeft = false;
		if(event.keyCode === 32){
			player.pressingSpace = false;
		}
		if(event.keyCode == 87){
			player.pressingUp = false;
		}
		if(event.keyCode === 88){
			player.pressingX = false;
		}
	}

	function updateEntityPosition(entity){
		if(entity.type == "player"){
			if(level3 != false){
				if(player.bossKnockBack == true){
					if(player.x <= bossList[0].x){
						player.x -= bossList[0].pushSpeed;
					}
					if(player. x > bossList[0].x){
						player.x += bossList[0].pushSpeed;
					}
					if(player.y <= bossList[0].y){
						player.y -= bossList[0].pushSpeed;
					}
					if(bossList[0].pushSpeed != 0){
						bossList[0].pushSpeed -= bossList[0].pushDec;
					}else{
						bossList[0].pushSpeed = 30;
						player.bossKnockBack = false;
					}
				}
			}
				if(player.pressingRight && player.meleeAtking == false){
					player.x += player.spdX;
					player.spriteCounter+= .2;
				}
				if(player.pressingLeft && player.meleeAtking == false){
					player.x -= player.spdX;
					player.spriteCounter+= .2;				
				}
				if(player.pressingDown)
					player.y += player.spdY;
				if(player.pressingUp){
					player.y -= player.spdY;
				}
			if(player.jump == true){
				player.y -= player.force;
				player.force -= player.fall;
			}
			if(player.spaceShip == true){
				
			}
			if(player.spdX > 5 && player.meleeAtking == false){
				player.spdX -= .05;
			}
			if(player.meleeAtking){
				if(player.direction == "right"){
					player.x += player.spdX;
				}
				else if(player.direction == "left"){
					player.x -= player.spdX;
				}
				if(player.spdX <= 5){
					player.meleeAtking = false;
					player.sprint = false;
				}else{
					player.spdX -= 2.0;
				}
			}
			else if(player.spdX <= 5) {
				player.sprint = false;
			}
			if(player.machineGun){
				if(frameCount % 15 == 0){
					if(player.spaceShip != true){
						sound.gunShot.currentTime = 0;
						sound.gunShot.play();
					}else{
						sound.lazer.currentTime = 0;
						sound.lazer.play();
					}
						generateBullet();
						player.gunAtkSpd = 0;
				}
			}
			//ispositionvalid
			if(player.x < player.width/2)
				player.x = player.width/2;
			if(player.x > WIDTH-player.width/2)
				player.x = WIDTH - player.width/2;
			//if(player.y < player.height/2)
				//player.y = player.height/2;
			if(player.y > HEIGHT - player.height/2){
				player.y = HEIGHT - player.height/2;
				player.jump = false;
			}
		}
		
		if(entity.type == "jumpingEnemy"){
			var randomNum= Math.random();
			var Spacing = 20;
			if(player.freeze == true){
				entity.spdX = entity.spdX /= 1.02;
				entity.gravity = entity.gravity /= 1.02;
				entity.spriteCounter += .1;
			}
			if(entity.x < player.x - Spacing){
				entity.x += entity.spdX;
				entity.direction = "right";
				if(entity.jump == true){
					entity.x += entity.spdX*2.4;
				}
			}	
			if(entity.y + entity.height/2 >= HEIGHT){
				entity.y = HEIGHT - entity.height/2;
			}
			if(entity.x > player.x + Spacing){
				entity.x -= entity.spdX;
				entity.direction = "left";
				if(entity.jump == true){
					entity.x -= entity.spdX*2.4;
				}
			}
			if(randomNum <= .01){
				entity.jump = true;
				console.log(randomNum);
			}
			if(entity.jump == true){
				entity.y -= entity.force;
				entity.force -= entity.fall;
			}
			if(entity.x > player.x + 10 || entity.x < player.x - 10){
				if(entity.timeBetweenShots > 1){
						createEnemyBullet(entity);
						entity.timeBetweenShots = 0;
				}
			}
			if(entity.y >= HEIGHT - entity.height/2){
				entity.force = entity.gravity;
				entity.jump = false;
			}
			
			/*if(enemyList[key].x > WIDTH - enemyList[key].width || enemyList[key].x < enemyList[key].width){
				enemyList[key].spdX = -enemyList[key].spdX
			}*/
			entity.spriteCounter+= .01;
		}
		
		
		if(entity.type == "basicEnemy"){
			var Spacing = 20;
			if(player.freeze == true){
				entity.spdX = entity.spdX /= 1.02;
				entity.spriteCounter += .1;
			}
			if(entity.x < player.x - Spacing){
				entity.x += entity.spdX;
				entity.direction = "right";
			}	
			if(entity.y + entity.height/2 >= HEIGHT){
				entity.y = HEIGHT - entity.height/2;
			}
			if(entity.x > player.x + Spacing){
				entity.x -= entity.spdX;
				entity.direction = "left";
			}
			if(entity.y < HEIGHT - entity.height){
				entity.y += 2
			}
			/*if(enemyList[key].x > WIDTH - enemyList[key].width || enemyList[key].x < enemyList[key].width){
				enemyList[key].spdX = -enemyList[key].spdX
			}*/
			if(entity.y > HEIGHT - entity.height || entity.y < entity.height){
				entity.spdY = -entity.spdY
			}
			entity.spriteCounter+= .01;
		}
		if(entity.category == "atkSpdInc"){
			var x = Math.cos(entity.angle) * entity.radius;
			var y = Math.sin(entity.angle) * entity.radius;
			entity.y += y;
			entity.angle += .1;
		}
		if(entity.category == "spaceShip"){
			var x = Math.cos(entity.angle) * entity.radius;
			var y = Math.sin(entity.angle) * entity.radius;
			entity.y += y;
			entity.angle += .1;
		}
		if(entity.category == "freeze"){
			var x = Math.cos(entity.angle) * entity.radius;
			var y = Math.sin(entity.angle) * entity.radius;
			entity.y += y;
			entity.angle += .1;
		}
		if(entity.type == "flyingEnemy"){
			//offsetX is in flying enemy constructor
			var x = Math.cos(entity.angle) * entity.radius;
			var y = Math.sin(entity.angle) * entity.radius;
			entity.y += y;
			entity.angle += .1;
			if(player.freeze == true){
				entity.spdX = entity.spdX /= 1.02;
			}
			if(entity.x < entity.width/2 ){
				entity.x += entity.spdX;
			}else if (entity.x > WIDTH - entity.width/2){
				entity.x -= entity.spdX;
			}else{
				if(entity.x > entity.offsetX){
					entity.x -= entity.spdX
				}
				if(entity.x < entity.offsetX){
				entity.x += entity.spdX
				}
			}
		}
			
		if(entity.type == "enemyBullet" || entity.type == "enemyBulletBlue"){
			if(entity.type != "enemyBulletBlue"){
				if(player.freeze == true){
					entity.spdX = entity.spdX /= 1.02;
					entity.spdY = entity.spdY /= 1.02;
				}
			}
				entity.x += entity.spdX;
				entity.y += entity.spdY;
		}
		
		if(entity.type == "particle"){
			entity.x += entity.spdX;
			entity.y += entity.spdY;	
			entity.spdY += entity.gravity;
		}
		
		if(entity.type == "bullet"){
			if(entity.direction == "right" || entity.direction == "none"){
				entity.x += entity.spdX;
			}else if(entity.direction == "left"){
				entity.x -= entity.spdX;
			}else if(entity.direction == "down"){
				entity.y += entity.spdY;
				entity.width += entity.spdX *2;
			}
		}
		
		if(entity.type == "finalBoss"){   
			if(player.freeze == true){
				if(bossList[0].chargeAttack != false){
					if(bossList.chargeSpd != 0){
						bossList[0].chargeSpd -= 1.00
					}
				}
			}
			if(player.x >= entity.x && bossList[0].chargeAttack != true){
				entity.direction = "right";
				entity.x += entity.spdX;
			}else if(player.x < entity.x && bossList[0].chargeAttack != true){
				entity.direction = "left";
				entity.x -= entity.spdX
			}
			if(stage2 != false){
				var x = WIDTH/2 + Math.cos(entity.angle) * entity.radius;
				var y = HEIGHT/2 + Math.sin(entity.angle) * entity.radius;
				finalBoss.x = x;
				finalBoss.y = y;
				entity.angle += entity.spd;
				if(entity.angle >= 1 || entity.angle <= -5){
					entity.spd = -entity.spd;
				}
			}else{
				if(bossList[0].chargeAtkTimer == 200){
					if(bossList[0].chargeAttack != true){
						bossList[0].chargeAttack = true;
						bossList[0].chargeAtkTimer = 0;
					}
				}
				entity.y = HEIGHT - entity.width/2;
				if(entity.x > WIDTH - entity.width/2){
					entity.x -= entity.spdX;
					if(bossList[0].chargeAttack != false){
						bossList[0].chargeAttack = false;
						bossList[0].chargeSpd = 50;
					}
				}
				if(entity.x < entity.width/2){
					entity.x += entity.spdX;	
					if(bossList[0].chargeAttack != false){
						bossList[0].chargeAttack = false;
						bossList[0].chargeSpd = 50;
					}
				}
				if(bossList[0].chargeAttack != false){
					if(bossList[0].direction == "left"){
						bossList[0].x -= bossList[0].chargeSpd;
						if(bossList[0].chargeSpd != 0){
							bossList[0].chargeSpd -= bossList[0].chargeDec;
						}else{
							bossList[0].chargeSpd = 40;
							bossList[0].chargeAttack = false;
						}
					}else if(bossList[0].direction == "right"){
						bossList[0].x += bossList[0].chargeSpd;
						if(bossList[0].chargeSpd != 0){
							bossList[0].chargeSpd -= bossList[0].chargeDec;
						}else{
							bossList[0].chargeSpd = 40;
							bossList[0].chargeAttack = false;
						}
					}
				}
		}
	}
}	

function drawEntity(entity){
	if(entity.y <= HEIGHT){
		ctx.fillText("Frame Count: " + frameCount, 40,40);
		ctx.fillText("Kills: " + kills, 40,65);
		if(entity.type != "upgrade" && entity.type != "jumpingEnemy" && entity.type != "player" && entity.type != "particle" && entity.type != "basicEnemy" && entity.type != "flyingEnemy" && entity.type != "enemyBullet"&& entity.type != "enemyBulletBlue" && entity.type != "finalBoss"&& entity.type != "bullet"){
		ctx.save();
		ctx.fillStyle = entity.color;
		ctx.fillRect(entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
		ctx.restore();
		}
		if(entity.type == "particle"){
			ctx.save();
			ctx.fillStyle = "rgba(255,0,0, " + entity.alpha + ")";
			if (entity.alpha > 0){
			entity.alpha -= .05
			}
			ctx.fillRect(entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
			ctx.restore();
		}
		if(entity.category == "atkSpdInc"){
				var x = entity.x - entity.width/2;
				var y = entity.y - entity.height/2;
			ctx.drawImage(Img.rapidFire,x,y);
				}else if(entity.category == "spaceShip"){
					var x = entity.x - entity.width/2;
				var y = entity.y - entity.height/2;
			ctx.drawImage(Img.alienFace,x,y);
				}else if(entity.category == "freeze"){
					var x = entity.x - entity.width/2;
				var y = entity.y - entity.height/2;
			ctx.drawImage(Img.hourGlass,x,y);
				}
		if(entity.type == "bullet"){
			if(entity.direction == "left"){
				ctx.drawImage(Img.bulletLeft,0,0,Img.bulletLeft.width,Img.bulletLeft.height,entity.x,entity.y,entity.width,entity.height);
			}
			if(entity.direction == "right"){
				ctx.drawImage(Img.bulletRight,0,0,Img.bulletRight.width,Img.bulletRight.height,entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
			}
			if(entity.direction == "down"){
				ctx.drawImage(Img.spaceShipBullet,0,0,Img.spaceShipBullet.width,Img.spaceShipBullet.height,entity.x-entity.width/2,entity.y-entity.height/2,entity.width,entity.height);
			}
		}
		if(entity.type =="enemyBullet"){
			var x = entity.x - entity.width/2;
			var y = entity.y - entity.height/2;
			var spriteWidth = Img.enemyBullet.width/4;
			var spriteHeight = Img.enemyBullet.height;
			var walking = Math.floor(entity.spriteCounter % 4);
			ctx.drawImage(Img.enemyBullet,spriteWidth*walking,0,spriteWidth,spriteHeight,x,y,entity.width,entity.height);
		}
		if(entity.type =="enemyBulletBlue"){
			var x = entity.x - entity.width/2;
			var y = entity.y - entity.height/2;
			var spriteWidth = Img.enemyBulletBlue.width/4;
			var spriteHeight = Img.enemyBulletBlue.height;
			var walking = Math.floor(entity.spriteCounter % 4);
			ctx.drawImage(Img.enemyBulletBlue,spriteWidth*walking,0,spriteWidth,spriteHeight,x,y,entity.width,entity.height);
		}
		if(entity.type == "jumpingEnemy"){
			var x = entity.x - entity.width/2;
			var y = entity.y - entity.height/2;
			var spriteWidth = Img.basicEnemy.width/4;
			var spriteHeight = Img.basicEnemy.height/2;
			var walking = Math.floor(entity.spriteCounter % 2);
			if(entity.direction == "left"){
				var flying = 1;
			}else if(entity.direction == "right"){
				var flying = 0;
			}
			ctx.drawImage(Img.jumpingEnemy,spriteWidth * walking,spriteHeight * flying,spriteWidth,spriteHeight,x,y,entity.width,entity.height);
		}
		if(entity.type == "basicEnemy"){
			var x = entity.x - entity.width/2;
			var y = entity.y - entity.height/2;
			var spriteWidth = Img.basicEnemy.width/4;
			var spriteHeight = Img.basicEnemy.height/2;
			var walking = Math.floor(entity.spriteCounter % 4);
			if(entity.direction == "left"){
				var flying = 1;
			}else if(entity.direction == "right"){
				var flying = 0;
			}
			ctx.drawImage(Img.basicEnemy,spriteWidth * walking,spriteHeight * flying,spriteWidth,spriteHeight,x,y,entity.width,entity.height);
		}
		if(entity.type == "flyingEnemy"){
			var x = entity.x - entity.width/2;
			var y = entity.y - entity.height/2;
			var flying = Math.floor(entity.spriteCounter % 3);
			ctx.drawImage(Img.flyingEnemy,flying*Img.flyingEnemy.width/3,0,Img.flyingEnemy.width/3,Img.flyingEnemy.height,x,y,entity.width,entity.height);
			var xAngle = x - player.x;
			var yAngle = x - player.y;
			var angle = Math.atan2(yAngle,xAngle)/Math.PI * 180;
			var xEye = entity.x  + Math.cos(angle)*13;
			var yEye = entity.y + Math.sin(angle)*3;
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(xEye,yEye,4,0,Math.PI*2);
			ctx.fill();
		}
		/*if(level3 != false){
			ctx.save();
			ctx.fillStyle = "red";
			ctx.fillRect(finalBoss.x- finalBoss.width,finalBoss.y - 64,finalBoss.hp*10,5);
			ctx.restore();
		}*/
		if(entity.type == "finalBoss"){
			if(stage2 != true){
			var x = entity.x - entity.width/2;
			var y = entity.y - entity.height/2;
			var spriteWidth = Img.finalBoss.width/4;
			var spriteHeight = Img.finalBoss.height/4;
			var facing = 0;
			var walking = Math.floor(finalBoss.spriteCounter % 4);
			if(entity.direction == "left"){
				if(entity.chargeAttack != false){
					facing = 2;
				}else{
					facing = 0;
				}
			}else if(entity.direction == "right"){
				if(entity.chargeAttack != false){
					facing = 3;
				}else{
					facing = 1;
				}
			}
			ctx.drawImage(Img.finalBoss,walking*spriteWidth,facing*spriteHeight,spriteWidth,spriteHeight,x,y,entity.width,entity.height);
			}else {
				var x = entity.x - entity.width/2;
				var y = entity.y - entity.height/2;
				var walking = Math.floor(finalBoss.spriteCounter % 3);
				ctx.drawImage(Img.finalBoss2,walking * Img.finalBoss2.width/3,0,Img.finalBoss2.width/3,Img.finalBoss2.height,x,y,entity.width,entity.height);
			}
		}
		if(entity.type == "player"){
			var x = player.x - player.width/2;
			var  y = player.y - player.height/2;
			var spriteWidth = Img.player.width/4;
			var spriteHeight = Img.player.height/5;
			var walking = Math.floor(player.spriteCounter % 4);
			var facing = 0;
			if(player.direction == "left"){
				if(player.meleeAtking != true){
					if(player.spaceShip == true){
						facing = 3;
					}else{
						facing = 0;
					}
				}else{
					walking = 3;
					facing = 4;
				}
			}else if(player.direction == "right"){
				if(player.meleeAtking != true){
					if(player.spaceShip != false){
						facing = 2;
					}else{
						facing = 1;
					}				
				}else{
					walking = 2;
					facing = 4;
				}
			}
			if(player.jump == true){
				if(player.direction == "left"){
					if(player.meleeAtking != true){
						walking = 1;
						facing = 4;
					}else{
						walking = 3;
						facing = 4;
					}
				}else if(player.direction == "right"){
					if(player.meleeAtking != true){
						walking = 0;
						facing = 4;
					}else{
						walking = 2;
						facing = 4;
					}
				}		
			}
		
			ctx.drawImage(Img.player,walking*spriteWidth,facing*spriteHeight,spriteWidth,spriteHeight,x,y,player.width,player.height);
			ctx.font="30px myFirstFont";
			ctx.save();
			ctx.fillStyle = "green";
			ctx.fillRect(player.maxHp- 45,100,player.hp*2.3,20);
			ctx.drawImage(Img.hpBar,0,0,Img.hpBar.width,Img.hpBar.height,0,60,300,100);
			ctx.fillStyle = "blue";
		
			ctx.fillRect(37,186,player.gunAtkSpd*1.5+3,15);
			ctx.drawImage(Img.shootBar,0,0,Img.shootBar.width,Img.shootBar.height,0,160,200,66);
			ctx.restore();
			if (player.sprint == false && player.meleeAtkSpd >= 100){
				ctx.save();
				ctx.fillStyle = "orange";
				ctx.fillRect(37 ,250,player.meleeAtkSpd*1.5,15);
				ctx.drawImage(Img.meleeBar,0,0,Img.meleeBar.width,Img.meleeBar.height,0,223,200,66);
				ctx.restore();
			}
			else{
				ctx.save();
				ctx.fillStyle = "red";
				ctx.fillRect(37 ,250,player.meleeAtkSpd*1.5,15);
				ctx.drawImage(Img.meleeBar,0,0,Img.meleeBar.width,Img.meleeBar.height,0,223,200,66);
				ctx.restore();
			}
		}
	}
	if(player.freeze != false){
		if(entity.y < HEIGHT){
			if(entity.type == "flyingEnemy" || entity.type == "finalBoss" || entity.type == "enemyBullet" || entity.type == "enemyBulletBlue"){
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = "#37FDFC";
			ctx.arc(entity.x,entity.y,entity.width,0,2*Math.PI);
			ctx.stroke();
			ctx.restore();
			}
		}
	}
}




function testCollisionRectRect(rect1,rect2){
	return rect1.x <= rect2.x+rect2.width && rect2.x <= rect1.x+rect1.width && rect1.y <= rect2.y + rect2.height && rect2.y <= rect1.y + rect1.height;
}

function testCollisionEntity(entity1,entity2){	//return if colliding (true/false)
	var rect1 = {
		x:entity1.x-entity1.width/2,
		y:entity1.y-entity1.height/2,
		width:entity1.width,
		height:entity1.height,
	}
	var rect2 = {
		x:entity2.x-entity2.width/2,
		y:entity2.y-entity2.height/2,
		width:entity2.width,
		height:entity2.height,
	}
	return testCollisionRectRect(rect1,rect2);
	
}
function setMachineGun(){
	if(player.machineGun != true){
		player.machineGun = true;
		upgradeEnabled = true;
		player.machineGunLength = 500;
	}else {
		player.machineGun = false;
		upgradeEnabled = false;
		player.machineGunLength = 500;
	}
}
function setSpaceShip(){
				if(player.spaceShip == true){
				player.spaceShip = false;
				upgradeEnabled = false;
				player.direction ="right";
				player.fall = 2;
				player.flightLength = 500;
				player.jump = true;
				}else{
				player.spaceShip = true;
				upgradeEnabled = true;
				player.direction = "right";
				player.fall = 0;
				player.jump = false;
				player.flightLength = 500;
					if(player.machineGun != true){
						setMachineGun();
					}
				}
}

	function setFreeze(){
		if(player.freeze != true){
			player.freeze = true;
			upgradeEnabled = true;
			player.freezeLength = 500;
		}else{
			player.freeze = false;
			upgradeEnabled = false;
			player.freezeLength = 500;
		}
	}
	
	function update(){

		if(godMode == true){
			player.hp = 100;
			player.atkSpdInc= 100;
		}
		if(mainMenu == true){
			if(alpha >= 1 || alpha <= -.1){
				add = -add;
			}
			if(player.pressingSpace == true){
				mainMenu = false;
			}
			alpha+= add;
			ctx.save();
			ctx.font = "100px mySecondFont";
			ctx.fillRect(0,0,canvas.width,canvas.height);
			ctx.fillStyle = "rgb(200,0,0)";
			ctx.fillText("Gunman's Nightmare",WIDTH/2-570,HEIGHT/4);
			ctx.font = "30px mySecondFont";
			ctx.fillText("By Amman Sandhu",WIDTH/2-470,HEIGHT/2.8);
			ctx.font = "20px mySecondFont";
			ctx.fillText("Controls:",WIDTH/2-80,310);
			ctx.fillText("W - Jump",WIDTH/2-80,360);
			ctx.fillText("A - Left",WIDTH/2-80,410);
			ctx.fillText("D - Right",WIDTH/2-80,460);
			ctx.fillText("X - Dash Attack",WIDTH/2-80,510);
			ctx.fillText("Left Shift - Sprint",WIDTH/2-80,560);
			ctx.fillText("Space Bar - Shoot",WIDTH/2-80,610);
			ctx.fillStyle = "rgba(200,0,0,"+ alpha + ")";
			ctx.font = "50px mySecondFont";
			ctx.fillText("Press Space To Start",WIDTH/2-320,HEIGHT+200);
			ctx.restore();
			return;
		}
		if(gamePaused == true){
			if(blackScreen != false && stage2 != true){
				ctx.font = "30px myFirstFont";
				ctx.save();
				ctx.fillStyle = "black";
				ctx.fillRect(0,0,WIDTH,HEIGHT+500);
				ctx.fillStyle	= "white";
				ctx.fillText("Wake up! Wake up!",WIDTH/2-190,canvas.height/2);
				ctx.fillText('- Familiar Voice',WIDTH/2-190,canvas.height/2 + 100);
				ctx.fillText('Press "P" to continue',WIDTH/2-190,canvas.height/2 -100);
				ctx.stroke();
				ctx.restore();
				if(stage2 != true){
					stage2 = true;
				}
				return;
			}else{
				ctx.font = "30px myFirstFont";
				ctx.save();
				ctx.fillStyle = "white";
				ctx.fillText("Paused",WIDTH/2-100,50);
				ctx.stroke();
				ctx.restore();
				return;
			}
		}
		//DELETE
		if(frameCount % 30 == 0){
			if(player.imgCounter == 0){
				player.imgCounter += 1;
			}else{
				player.imgCounter -= 1;
			}
		}
		//
		ctx.clearRect(0,0,WIDTH,canvas.height);
		drawMap();
		frameCount += 1;
		if(frameCount == 3000){
			sound.finalBossMusic.currentTime = 0;
			sound.finalBossMusic.volume  = 1;
			sound.finalBossMusic.play();
			createFinalBoss();
			level3 = true;
		}
		if(frameCount < 1500){
			if(frameCount % 75 == 0){
				generateBasicEnemy();
			}else if(frameCount % 200 == 0){
		generateJumpingEnemy();
			}
		}else{
			if(level3 != true){
				if(frameCount % 75 == 0){
				generateFlyingEnemy();	
				}
				if(frameCount % 200 == 0){
				generateJumpingEnemy();
				}
			}
		}
		if(level3 == true){
			if(sound.levelMusic.volume != 0.0){
				sound.levelMusic.volume = 0;
			}
			if(stage2 != false){
				if(frameCount % 75 == 0){
					generateBasicEnemy();
					generateJumpingEnemy();
				}
			}else{
				if(frameCount % 200 == 0){
					generateFlyingEnemy();	
					generateJumpingEnemy();
				}
			}
		}
		if(upgradeEnabled != true){
			if(stage2 != true){
				if(frameCount % 200 == 0){
					generateUpgrade();
				}
			}
		}
		if(player.spaceShip == true || player.freeze == true){
			if(player.spaceShip){
				if(player.flightLength != 0){
					player.flightLength -= 1;
				}else{
					setSpaceShip();
				}
			}
			if(player.freeze){
				if(player.freezeLength != 0){
					player.freezeLength -= 1;
				}else{
					setFreeze();
				}
			}
		}
		if(player.machineGun){
				if(player.machineGunLength != 0){
					player.machineGunLength -= 1;
				}else{
					setMachineGun();
				}
			}
		if(frameCount % 300 == 0){
			player.atkSpdInc += .5;
		}
		if(player.gunAtkSpd < 100){
			player.gunAtkSpd += player.atkSpdInc;
		}
		if(player.meleeAtkSpd < 100){
			player.meleeAtkSpd += player.atkSpdInc/2;
		}	
		
		if(level3 != false){
			if(stage2 != true){
				if(bossList[0].hp	< 7){
					if(player.spaceShip != false){
						setSpaceShip();
					}if(player.machineGun != false){
						setMachineGun();
					}if(player.freeze != false){
						setFreeze();
					}
					if(bossList[0].hp <= 0){
						startNewGame();
					}
					if(blackScreen != true && blackEnabled != true){
						blackEnabled = true
						blackScreen = true;
						gamePaused = true;
						bossList[0].spdX += bossList[0].spdX;
						bossList[0].spdY += bossList[0].spdY;
						ctx.clearRect(0,0,WIDTH,HEIGHT);
					}
				}
			}
			updateBoss();
		}
		
		updateEnemy();
		updateEnemyBullet();
		updateBullet();
		updateParticle();
		updateUpgrade();
		
		if(player.hp > 0){
			updateEntity(player);
		}
		else if(player.hp <= 0){
			startNewGame();
		}
	}
	function updateBoss(){
		if(level3 != false){
			if(bossList[0].hp > 0){
				updateEntity(finalBoss);
				bossList[0].chargeAtkTimer++;
				bossList[0].spriteCounter += .07;
				var hit = testCollisionEntity(finalBoss,player);
				if(hit != false){
					if(player.meleeAtking != false){
						bossList[0].hp -= 1;
						generateParticle(player);
					}else{
						player.hp -= 10;
						player.bossKnockBack = true;
						for (var i = 0; i < 3;i++){
							generateParticle(player);
						}
					}
				}
				if(stage2 != false){
					bossList[0].timeBetweenShots+= .01;
						if(bossList[0].timeBetweenShots > 1){
							bossList[0].bulletCycle++;
							if(bossList[0].bulletCycle == 5){
								for(var i = 0; i < 360; i+= 10){
									createEnemyBullet(finalBoss,i);
								}
								
								bossList[0].bulletCycle = 0;
							}else if(bossList[0].bulletCycle == 1 || bossList[0].bulletCycle == 3){
								for(var i = 0;i < 360; i += 60){
								createEnemyBullet(finalBoss,i+10);
								createEnemyBullet(finalBoss);
								createEnemyBullet(finalBoss,i-10);
								}
							}
							else {
								createEnemyBullet(finalBoss)
							}
							bossList[0].timeBetweenShots = 0;
						}
				}
		}
		}else{
			bossList = {};
		}
	}
	function updateEnemyBullet(){	
		for(var key in enemyBulletList){
			updateEntity(enemyBulletList[key]);
			enemyBulletList[key].timer++;
			if(player.freeze != true){
				enemyBulletList[key].spriteCounter += .2;
			}else{
				enemyBulletList[key].spriteCounter += .05;

			}
			var hit = testCollisionEntity(enemyBulletList[key],player);
			if(hit == true){
				if(player.meleeAtking != true){
					player.hp -= 10;
					enemyBulletList[key].timer = 200;
					for(var i = 0;i < 3;i++){
						generateParticle(player);
					}
				delete enemyBulletList[key];
				break;
				}
			}				
			if(enemyBulletList[key].timer > 195){
				delete enemyBulletList[key];
				break;
			}
		}
	}
	function updateBullet(){		
		for(var key in bulletList){
			updateEntity(bulletList[key]);
			bulletList[key].timer++;
			if(level3 != false){
				var hitBoss = testCollisionEntity(bulletList[key], finalBoss);
				if(hitBoss == true){
					kills++;
					bulletList[key].particleLim++;
					finalBoss.hp -= .5;
					if(bulletList[key].particleLim < 3){
						for(var i = 0;i < 1;i++){
							generateParticle(finalBoss);
						}
					}
					if(player.spaceShip != true){
							bulletList[key].timer = 200;
					}
				}
			}
			for(var key2 in enemyList){
				var hit = testCollisionEntity(bulletList[key],enemyList[key2]);
				if(hit == true){
					kills++;
					for(var i = 0; i < 3;i++){
						generateParticle(enemyList[key2]);
					}
					if(player.spaceShip != true){
						bulletList[key].timer = 200;
					}
						delete enemyList[key2];
						break;
				}
			}
			if(bulletList[key].timer > 195){
				delete bulletList[key];
				break;
			}
		}
	}
	function updateEnemy(){
		for(var key in enemyList){
			updateEntity(enemyList[key]);
			if(enemyList[key].type != "jumpingEnemy"){
				enemyList[key].spriteCounter+= .07;
			}
			if(enemyList[key].type == "flyingEnemy"){
				enemyList[key].timeBetweenShots+= .01;
				if(enemyList[key].timeBetweenShots > enemyList[key].randomNumber *2){
					createEnemyBullet(enemyList[key]);
					enemyList[key].timeBetweenShots = 0;
				}
			}if(enemyList[key].type == "jumpingEnemy"){
				enemyList[key].timeBetweenShots += .01;
				enemyList[key].spriteCounter += .05;
			}
			if(enemyList[key].meleeHit != true){
				var hit = testCollisionEntity(enemyList[key],player);
			}
			if(hit != false){
				if(player.meleeAtking != true){
					enemyList[key].playerHits++;
					player.hp -= 1;
					if(enemyList[key].playerHits % 15 == 0){
						generateParticle(player);
					}
				}else {
					kills++;
					enemyList[key].meleeHit = true;
					for(var i = 0; i < 3;i++){
						generateParticle(enemyList[key]);
					}
				}
			}	
			if(enemyList[key].meleeHit != false){
				delete enemyList[key];
				continue;
			}			
		}
	}
	function updateParticle(){	
		for(var key in particleList){
			updateEntity(particleList[key]);
			particleList[key].timer++;
			if(particleList[key].type == "bullet"){
				if(particleList[key].timer >= 3){
					delete particleList[key];
					break;
				}
			}
			if(particleList[key].timer >= 30){
				delete particleList[key];
				break;
			}
		}
	}
	function updateUpgrade(){			
		for(var key in upgradeList){
			upgradeList[key].timer++;
			if(upgradeList[key].timer < 150){
				updateEntity(upgradeList[key]);
			}else if(upgradeList[key].timer % 10 == 0){ 
				updateEntity(upgradeList[key]);
			}
			var hit = testCollisionEntity(player,upgradeList[key]);
			if(hit == true){
				if(player.spaceShip != true){
					//player jumps when grabbing power up
					player.y -= 12;
				}
				if(upgradeList[key].category == "atkSpdInc"){
					player.atkSpdInc += .5;
					setMachineGun();
				}else if(upgradeList[key].category == "spaceShip"){
					setSpaceShip();
				}else if(upgradeList [key].category == "freeze"){
					setFreeze();
				}
				upgradeList[key].timer = 200;
			}
			if(upgradeList[key].timer >= 200){
				delete upgradeList[key];
				break;
			}
		}
	}
drawMap = function(){
		if(stage2 != true){
			ctx.drawImage(Img.background1,0,0,WIDTH,HEIGHT);
			ctx.drawImage(Img.floor,0,HEIGHT,WIDTH,HEIGHT/2);
		}else{
			ctx.drawImage(Img.background,0,0,WIDTH,HEIGHT);
			ctx.drawImage(Img.floor,0,HEIGHT,WIDTH,HEIGHT/2);
		}
}
function updateEntity(entity){
	drawEntity(entity);
	updateEntityPosition(entity);
}
