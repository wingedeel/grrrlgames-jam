var StateInstructions={    
    
   preload:function()
    {
        game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75);
        game.load.image('sky', 'images/main/background.png');
    },
    
    create:function()
    {
      // GAME BACKGROUND
        //game.stage.backgroundColor="#26C9FF";
        game.add.sprite(0, 0, 'sky');

        // BUTTON START
        this.btnStart = game.add.button(
          game.world.centerX,
          game.world.centerY+100,
          'buttons',
          this.startGame,
          this,
          6,
          7,
          6
        )
       this.btnStart.anchor.set(0.5, 0.5);
       this.btnStart.bringToTop();


        // INSTRUCTION TEXT
       
        this.inText = game.add.text(game.world.centerX+20, 250, "Find the letters to make the word..." ,
          { font: "36px Arial", 
            fill: "#FFFFFF", 
            stroke:"#FFFFFF",
            strokeThickness: 2,
            align: "center"
          } )
        this.inText.anchor.set(0.5, 0.5);

    },

    startGame: function(){
    	game.state.start("StateMain");
    },
    
    update:function()
    {       
        
    }    
    
}