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

  gameScreen.html(startPage());

  // load data from models
  var playerCharList = {
    newsChannel4 : models.goodGuys
  };
  var enemyCharList =  models.badGuys;

  console.log('enemy', enemyCharList);

  $( ".start" ).on( "click", function(event){
    event.preventDefault();
    console.log(playerCharList);
    gameScreen.html(charScreen(playerCharList));
  });

  $(document).on('click', '.character', function(event){
    event.preventDefault();
    var $chosenChar = $(this);
    var charName = $chosenChar.data('char-name');
    chosenChar = _.filter(playerCharList.newsChannel4, {'name': charName})[0];
    console.log(chosenChar);
  })

  // start fight button
  $(document).on('click', '.fight', function(event){
    event.preventDefault();
    console.log(chosenChar);
    gameScreen.html(fightScreen(chosenChar, enemyCharList));
    console.log(enemyCharList);
  });


}());
