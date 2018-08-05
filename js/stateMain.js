var StateMain={    
    
   preload:function()
    {
       if (screen.width<1000) {
    		game.scale.forceOrientation(true, false)
    	}

        game.load.image('sky', 'images/main/background.png');
        game.load.image('platform', 'images/main/platform.png'); // 400 x 16
        game.load.image('ground', 'images/main/ground.png');
        
        game.load.spritesheet('letter','images/main/letters.png', 24, 22 )
        game.load.spritesheet('letterLge','images/main/lettersLarge.png', 48, 44 )
        game.load.spritesheet('dude', 'images/main/alien.png', 64, 64);
        game.load.audio("gulp", "sounds/gulp.mp3");
        game.load.audio("levelOver", "sounds/points.mp3");
        // WORD IMAGES
        game.load.image('cake', 'images/main/cake-02-sml.png');
        game.load.image('cat', 'images/main/cat-03-sml.png');
        game.load.image('panda', 'images/main/panda.png');

    },
    
    create:function()
    {
        
        this.levelData = gameData[gameLevel];

        this.word = Array.from(this.levelData.word);
    
        var word = this.word;

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //  A simple background for our game
        game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        this.ground = this.platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        this.ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = this.platforms.create(400, 400, 'platform');
        ledge.body.immovable = true;

        ledge = this.platforms.create(-150, 250, 'platform');
        ledge.body.immovable = true;

        // The player and its settings
        this.player = game.add.sprite(32, game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        // SOUND
        this.gulp = game.add.audio("gulp");
        this.levelOver = game.add.audio("levelOver");

        // LETTERS
        this.letters = game.add.group();

        //  We will enable physics for any letter that is created in this group
        this.letters.enableBody = true;

        // Create array of random letters based on word
        var makeARandomLetter = function(){
            return word[Math.floor(Math.random() * word.length)];
        }
    
        var randoms = Array(12-word.length).fill(0).map(makeARandomLetter);

        // Randomise game letters
        var gameLetters = word.concat(randoms);
        gameLetters.sort(function(a, b){return 0.5 - Math.random()});

        //  Here we'll create a number of them evenly spaced apart
        for (var i = 0; i < gameLetters.length; i++)
        {
            //  Create a letterSprite inside of the 'letters' group
            var letterSprite = this.letters.create(i * 70, 0, 'letter');

            //  Let gravity do its thing
            letterSprite.body.gravity.y = 300;

            //  This just gives each letterSprite a slightly random bounce value
            letterSprite.body.bounce.y = 0.7 + Math.random() * 0.2;

            // Add a letter to the letterSprite
            letterSprite.letter = gameLetters[i];

            letterSprite.frame = this.getSpriteFrameFromLetter(gameLetters[i]);
            
        }

        //  The score
        this.scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        // RESULTS WORD
        // Create Results Word based on Word
        this.resultWord = game.add.group();
        
        for (var i = 0; i < this.word.length; i++)
        {
            //  Create a Result Letter inside of the 'resultWord' group
            var resultLetter = this.resultWord.create(i * 60, 0, 'letterLge');
            resultLetter.letter = this.word[i];
            resultLetter.frame = 26;

        }
       this.resultWord.x = game.world.centerX-70;
       this.resultWord.y = 40;

        // WORD PICTURE
        game.add.sprite(game.world.centerX+270, 20, this.levelData.word);

        
    },

    getSpriteFrameFromLetter: function(letter) {
        // Find alphabet index of letter
        var charCode = letter.toUpperCase().charCodeAt(0);
        var index = Number(charCode) - 65;
        return index;
    },

     getNextOccurenceOfLetter: function (letter, targetWord) {

        var index = targetWord.indexOf(letter);

        // If substring is in the target string...
        if (index != -1 ) {

            // Establish how many occurences of this letter are in the word
            function locations(substring,string){
              var a=[],i=-1;
              while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
              return a;
            }

            var occurences = locations(letter,this.word);
            // Go through each occurence of this letter in the target word.
            // See if there is a blank target space for it to go into
            if (occurences.length > 1 ){
                console.log('there is more than one occurence of ' + letter)
                for (var j=0; j<occurences.length; j++){
                    var resultLetter = this.resultWord.children[occurences[j]];
                    console.log('resultLetter.frame ' + resultLetter.frame);
                    if (resultLetter.frame == 26) {
                        index = occurences[j];
                    }
                }
            }
        
            
        }
        
         return index;
    },
    

    collectLetter: function (player, letterSprite) {

        // Removes the letter from the screen
        letterSprite.kill();

        this.gulp.play();

        //  Add and update the score
        score += 10;
        this.scoreText.text = 'Score: ' + score;

        // If letter is in the Word update the Results Word
        // by setting the frame of the appropriate letter

        // See if this letter has an index in the target word
        var index = this.getNextOccurenceOfLetter(letterSprite.letter, this.word);
        if (index != -1 ) {
            var frame = this.getSpriteFrameFromLetter(letterSprite.letter)
            this.resultWord.children[index].frame = frame;
        }
        
        // If resultWord has all its characters set go to Next Level screen
        var winningWord = true;
        for (var i = 0; i < this.resultWord.length; i++) {
            var resultLetter = this.resultWord.children[i];
            if (resultLetter.frame == 26) {
                winningWord = false;
            }
        }
        
        if (winningWord) {
           this.levelOver.play();
           gameLevel++;
           game.state.start("StateOver");
        }

    },
    

    update: function () {

        //  Collide the player and the letters with the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.letters, this.platforms);

        //  Checks to see if the player overlaps with any of the letters, if he does call the collectLetter function
        game.physics.arcade.overlap(this.player, this.letters, this.collectLetter, null, this);

        //  Reset the players velocity (movement)
        this.player.body.velocity.x = 0;

        if (this.cursors.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -150;

            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;

            this.player.animations.play('right');
        }
        else
        {
            //  Stand still
            this.player.animations.stop();

            this.player.frame = 4;
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.body.velocity.y = -350;
        }

       
    }
    
}