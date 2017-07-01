var StateTitle={    
    
   preload:function()
    {
        game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75);
    },
    
    create:function()
    {
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


        // GAME BACKGROUND
        game.stage.backgroundColor="#26C9FF";

        // GAME TITLE
        this.titleText = game.add.text(game.world.centerX, 60, "Alien Letter Fiend",
          { font: "50px Lobster", 
            fill: "#00D900", 
            stroke:"#222222",
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