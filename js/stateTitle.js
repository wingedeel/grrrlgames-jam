var StateTitle={    
    
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


       

        // GAME TITLE
        this.titleText = game.add.text(game.world.centerX, 220, "Alphabet Dash",
          { font: "100px Lobster", 
            fill: "#FFFFFF", 
            stroke:"#C02FD5",
            strokeThickness: 4,
            align: "center"
          } )
        this.titleText.anchor.set(0.5, 0.5);

    },

    startGame: function(){
    	game.state.start("StateInstructions");
    },
    
    update:function()
    {       
        
    }    
    
}