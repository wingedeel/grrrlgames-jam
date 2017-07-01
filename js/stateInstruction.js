var StateInstructions={    
    
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

        // INSTRUCTION TEXT
        this.inText = game.add.text(game.world.centerX, 30, "Find the letters!!" );
        this.inText.fill = "#000000";
        this.inText.anchor.set(0.5, 0.5);

    },

    startGame: function(){
    	game.state.start("StateMain");
    },
    
    update:function()
    {       
        
    }    
    
}