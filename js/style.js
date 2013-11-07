/*Zach Jones created this project on 10/17/2013*/
$(document).ready(function(){
    
    var frog,score,bug,random,game,randombug,bee;
    
    function randomdrop(){
        
        random=1+Math.floor(Math.random()*1024);
        randombug=1+Math.floor(Math.random()*3);
    
    
    }
    
    $("#button").click(function(){startgame();});
    
    function startgame(){
        
        $("#container").html('<h1>Waayy to Fly<img src="assets/tongue.png"></h1><div id="points">Score: <span id="score">0</span></div> <div id="myCanv"></div>');
        
    
        init();
    
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
            game.load.image("bee","assets/bee.png");
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
            
            game.physics.collide(
                frog,
                bee,
                resetbee,
                null,
                this
            );
         
            if (randombug==1){
                
                if(bee.y>=420){
                bee.kill();
                randomdrop();
                addbug();
                }
            } else {
                
                if(bug.y>=420){
                bug.kill();
                randomdrop();
                addbug();
                score=0;
                $("#score").html(score);
                }
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
    
            if (randombug==1){
            
             bee= game.add.sprite(random,-5,"bee");
                
             bee.body.gravity.y=.3;
            
             bee.body.collideWorldBounds=true;
                
            } else {
                
             bug= game.add.sprite(random,-5,"bug");
                
             bug.body.gravity.y=.3;
            
             bug.body.collideWorldBounds=true;
        
                
            }
        
            
            
           
    }
    
  
    
    function resetbee(){
    
        bee.kill();
        randomdrop();
        addbug();
        score=0;
        $("#score").html(score);
    }
    
});