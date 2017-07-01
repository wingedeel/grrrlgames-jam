var StateMain={    
    
   preload:function()
    {
       if (screen.width<1000) {
    		game.scale.forceOrientation(true, false)
    	}

        game.load.image('sky', 'images/main/background.png');
        game.load.image('platform', 'images/main/platform.png'); // 400 x 16
        game.load.image('ground', 'images/main/ground.png');
        //game.load.image('star', 'assets/star.png'); // 22 x 24 wide
        game.load.spritesheet('letter','images/main/letters.png', 24, 22 )
        game.load.spritesheet('dude', 'images/main/alien.png', 64, 64);
        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },
    
    create:function()
    {
        var word = ['C', 'A', 'T'];

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


        // LETTERS
        
        //  Finally some letter to collect
        this.stars = game.add.group();

        //  We will enable physics for any star that is created in this group
        this.stars.enableBody = true;

        // Create array of randomletters based on word
        var makeARandomLetter = function(){
            return word[Math.floor(Math.random() * 3)];
        }
        var randoms = Array(12).fill(0).map(makeARandomLetter);
        console.log(randoms)

        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < randoms.length; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = this.stars.create(i * 70, 0, 'letter');

            //  Let gravity do its thing
            star.body.gravity.y = 300;

            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;

            // Add a letter to the star
            star.letter = word[i];

            star.frame = this.getSpriteFromLetter(randoms[i]);
            
        }

        //  The score
        this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        // RESULTS WORD
        // Create Results Word based on Word
        this.resultWord = game.add.group();
        for (var i = 0; i < word.length; i++)
        {
            //  Create a Result Letter inside of the 'resultWord' group
            var resultLetter = this.resultWord.create(i * 40, 0, 'letter');
            resultLetter.letter = word[i];
            resultLetter.frame = this.getSpriteFromLetter(word[i]);
        }
        this.resultWord.x = game.world.centerX - 200;
        this.resultWord.y = 30;

    },

    getSpriteFromLetter: function(letter) {
        // Find alphabet index of letter
        var charCode = letter.charCodeAt(0);
        var index = Number(charCode) - 65;
        return index;
    },

    collectStar: function (player, star) {

        console.log(star.letter);
        // Removes the star from the screen
        star.kill();

        //  Add and update the score
        score += 10;
        this.scoreText.text = 'Score: ' + score;

        //game.state.start("StateOver");

    },
    
    

    update: function () {

        //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(this.player, this.platforms);
        game.physics.arcade.collide(this.stars, this.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

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