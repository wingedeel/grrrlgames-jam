var StateOver={    
    
   preload:function()
    {
       game.load.spritesheet('buttons', 'images/ui/buttons.png', 265, 75);
       game.load.image('sky', 'images/main/background.png');
    },
    
    create:function()
    {
        this.top=0;
        this.bottom = game.height-120;

        // GAME BACKGROUND
        game.add.sprite(0, 0, 'sky');

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
       this.btnPlayAgain.bringToTop();

       // CONGRATS TEXT
       this.titleText = game.add.text(game.world.centerX, 245, "Next Level?",
          { font: "100px Lobster", 
            fill: "#FFFFFF", 
            stroke:"#C02FD5",
            strokeThickness: 4,
            align: "center"
          } )
        this.titleText.anchor.set(0.5, 0.5);

         // SCORE TEXT
       this.scoreText = game.add.text(game.world.centerX, this.top+150, score);
       this.scoreText.fill = "#000000";
       this.scoreText.fontSize =  48;
       this.scoreText.anchor.set(0.5, 0.5);

       this.scoreLabel = game.add.text(game.world.centerX, this.top+100, "You Score is ");
       this.scoreLabel.fill = "#000000";
       this.scoreLabel.fontSize =  48;
       this.scoreLabel.anchor.set(0.5, 0.5);

    },

    replay: function () {
    	// Go to Main screen.  All variables will be reset.
    	game.state.start("StateMain");
    },
    
    update:function()
    {       
        
    }    
    
}