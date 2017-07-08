// Global variables to all our states
var game;
var gameLevel = 0;
var gameData = [];
var soundOn = true;
var musicOn = true;
var score = 0;

window.onload = function()
{
     var isMobile=navigator.userAgent.indexOf("Mobile");

   if (isMobile==-1)
    {
        game=new Phaser.Game(800,600,Phaser.AUTO,"ph_game");
    }
    else
    {       
      game=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,"ph_game");  
    }

    $.getJSON("../data/game.json", function(json) {
        gameData = json;

        game.state.add("StateMain",StateMain);
        game.state.start("StateMain");
        game.state.add("StateTitle",StateTitle);
        game.state.add("StateOver",StateOver);
        game.state.add("StateInstructions", StateInstructions)
        game.state.start("StateTitle");
        
    });

    

}