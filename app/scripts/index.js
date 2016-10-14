var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
var models = require('./models');
var startPage = require('../templates/start-screen.hbs');
var charScreen = require('../templates/char-screen.hbs');
var fightScreen = require('../templates/fight-screen.hbs');

// wait for dom to be ready
(function(){

  var gameScreen = $('.page'),
      chosenChar;

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

    console.log('villains: ', enemyCharList.characters);
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
