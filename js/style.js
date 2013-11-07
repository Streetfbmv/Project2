/*Zach Jones created this project on 10/17/2013*/
$(document).ready(function(){
    
    var frog,score,bug,random,game;
    
    init();
    
    function randomdrop(){
        
        random=1+Math.floor(Math.random()*1024);
    
    
    
    }
    
    function init(){
        
         game = new Phaser.Game(
            1024,512,
            Phaser.AUTO,'myCanv',
            {
                preload: preload,
                create: create,
                update: update
                
            }
         );
            
            randomdrop();
        }
        
        function preload(){
        
            game.load.spritesheet("frog","assets/frogsheet.png",100,118);
            game.load.image("background","assets/background.jpg");
            game.load.image("bug","assets/bug.png");
            
        }
        
        function create(){
            
            background = game.add.tileSprite(0,0,1024,512, "background");
        
            frog = game.add.sprite(500,500,"frog");
            frog.animations.add("jump");
            frog.animations.play("jump",9,true);
            frog.anchor.setTo(.5,0);
            frog.body.collideWorldBounds=true;
            
            addbug();
        }
        
        function update(){
        
            if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
                frog.x -=2.5;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
                frog.x +=2.5;
            }
        
            game.physics.collide(
                frog,
                bug,
                collisionHandler,
                null,
                this
            );
        
            if(bug.y >= 420){
                bug.kill();
                randomdrop();
                addbug();
                score=0;
                $("#score").html(score);
            }
        }
    
    function collisionHandler(frog,bug){
    
        score=$("#score").html();
        score = parseInt(score);
        score ++;
        $("#score").html(score);
        
        bug.kill();
        
        randomdrop();
        
        addbug();
    }
    
    
    function addbug(){
    
            bug= game.add.sprite(random,-5,"bug");
            
            bug.body.gravity.y=.3;
            
            bug.body.collideWorldBounds=true;
    }
    
});