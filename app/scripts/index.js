var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var models = require('./models');
var startPage = require('../templates/start-screen.hbs');
var charScreen = require('../templates/char-screen.hbs');
var fightScreen = require('../templates/fight-screen.hbs');

// wait for dom to be ready
(function(){

  // set some game variables
  var gameScreen = $('.page'),
      chosenChar,
      chosenVillain,
      pairing = {
        combatants: [chosenChar, chosenVillain]
      };

  // render the start screen in the app
  gameScreen.html(startPage());

  // load data from models
  var playerCharList = {
    characters : models.goodGuys
  };

  var enemyCharList =  {
    characters : models.badGuys
  };

  // console.log('enemy', enemyCharList);

  // set the villian character
  function setVillain(){
    var villains = enemyCharList.characters; // get the array
    var villainsLen = villains.length; // get the length
    // do some math to get the index of a random villain
    var villianIndex = Math.floor(Math.random() * villainsLen);

    chosenVillain = villains[villianIndex];
    console.log(chosenVillain, pairing);
  }

  // track game start
  $( ".start" ).on( "click", function(event){
    event.preventDefault();
    console.log(playerCharList);
    gameScreen.html(charScreen(playerCharList));
  });

  // push character data to chosenChar variable
  $(document).on('click', '.character', function(event){
    event.preventDefault();
    var $chosenChar = $(this);
    var charName = $chosenChar.data('char-name');
    chosenChar = _.filter(playerCharList.characters, {'name': charName})[0];
    console.log(chosenChar);
    setVillain();
  });

  // start fight button
  $(document).on('click', '.fight', function(event){
    event.preventDefault();
    gameScreen.html(fightScreen(chosenChar));
    // console.log(enemyCharList);
  });


}());
