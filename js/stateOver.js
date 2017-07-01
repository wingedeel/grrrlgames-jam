var StateOver={    
    
   preload:function()
    {
       game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75);
    },
    
    create:function()
    {
        this.top=0;
        this.bottom = game.height-120;

/*
        // IPAD FIX 
        if (screen.height > 764) {
            // ipad height is 755
            // centers y pos. Will look like a wide screen film
            this.background.y = game.world.centerY-this.background.height/2;
            this.top = this.background.y;
            this.bottom = this.background.y+this.background.height-120;
        }
*/
        this.btnPlayAgain = game.add.button(
       		game.world.centerX,
       		game.world.centerY+100,
       		'buttons',
       		this.replay,
       		this,
       		1,
       		0,
       		1
       	)
       this.btnPlayAgain.anchor.set(0.5, 0.5);

         // SCORE TEXT
       this.scoreText = game.add.text(game.world.centerX, this.top+60, score);
       this.scoreText.fill = "#000000";
       this.scoreText.fontSize =  64;
       this.scoreText.anchor.set(0.5, 0.5);

       this.scoreLabel = game.add.text(game.world.centerX, this.top+20, "Score");
       this.scoreLabel.fill = "#000000";
       this.scoreLabel.fontSize =  32;
       this.scoreLabel.anchor.set(0.5, 0.5);

        // GAME BACKGROUND
        game.stage.backgroundColor="#26C9FF";
    },

    replay: function () {
    	// Go to Main screen.  All variables will be reset.
    	game.state.start("StateMain");
    },
    
    update:function()
    {       
        
    }    
    
}