window.onload = init;

var ctx, mySprite;
var keys = [];

function init(){
	
	var canvas = document.getElementById("myCanv");
	ctx = canvas.getContext("2d");
	
	mySprite = new Sprite(60, 70, "assets/realsheet2.png");
	
	mySprite.addAnimation("walk", [ 1, 2, 4, 4, 5, 5]);
	mySprite.play("walk");
    mySprite.y=200;
  
	
	requestAnimationFrame(update);
	
} //end init function

document.addEventListener("keydown", function(event){
	
	keys[event.keyCode] = true;
	
}) //end onkeydown function

document.addEventListener("keyup", function(event){
	
	keys[event.keyCode] = false;
	
}) //end onkeydown function
	
function update(){
	
	ctx.clearRect(0, 0, 400, 300);
	mySprite.update();
	/*mySprite.x ++;
	mySprite.y ++;*/
	
	if(keys[37]) {
		mySprite.x --;
        mySprite.scale.x=-1;
	} else if(keys[39]){
		mySprite.x ++;
        mySprite.scale.x=1;
	} else if(keys[38]){
		mySprite.y --;
	} else if(keys[40]){
		mySprite.y ++;
	} //end if else statement to move sprite on screen
	
	requestAnimationFrame(update);
	
} //end update function

function Sprite(width, height, sourceURL) {
	
	//store reference for later
	var me = this;
	
    this.scale= {x:1, y:1};
	//store width and height
	this.width = width;
	this.height = height;
	
	//begin loading image
	this.image = new Image();
	this.image.src = sourceURL;
	
	this.image.addEventListener("load", function(){
		
		me.cols = Math.floor( me.image.width / me.width );
		me.rows = Math.floor( me.image.height / me.height );
		
	}) //end event listener for image
	
	this.update = function(){
		
		this.dCount ++;
		if(this.dCount > this.delay){
			this.curFrame ++;
			this.dCount = 0;
			
			if(this.curFrame >= this.animations[this.curAnimation].length){
				this.curFrame = 0;
			} //if played all animations in loop, restart
			
			var displayFrame = this.animations[this.curAnimation][this.curFrame];
			
			this.framePosition.row = Math.floor( displayFrame / me.rows );
			this.framePosition.col = displayFrame % me.cols;
            if(displayFrame==5){
                console.log(this.framePosition);
            }
		} //end if statement
        
        ctx.save();
        
        ctx.scale(me.scale.x,me.scale.y);
		
		ctx.drawImage(this.image,
						this.framePosition.row * this.width, this.framePosition.col * this.height, this.width, this.height, //src bmp
						(this.scale.x*this.x)-this.width/2, 
                        (this.scale.y*this.y)-this.height, 
                        this.width, this.height); //dest bmp
		ctx.restore();
	} //end update function
	
} //end Sprite function

//Sprite protoype "properties"
Sprite.prototype.curFrame = 0;
Sprite.prototype.dCount = 0;
Sprite.prototype.delay = 10;
Sprite.prototype.framePosition = { x:0, y:0 };

Sprite.prototype.animations = [];
Sprite
Sprite.prototype.x = 0;
Sprite.prototype.y = 0;

Sprite.prototype.addAnimation = function(name, frames) {
	this.animations[name] = frames;
} //end add animation function

Sprite.prototype.play = function(name) {
	this.dcount = 0;
	this.curFrame = 0;
	this.curAnimation = name;
} //end function to play Sprite prototype