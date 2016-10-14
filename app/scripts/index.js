var $ = require('jquery');
var Handlebars = require('handlebars');
var models = require('./models');
var startPage = require('../templates/start-screen.hbs');
var charScreen = require('../templates/char-screen.hbs');
var fightScreen = require('../templates/fight-screen.hbs');

// wait for dom to be ready
(function(){

  var gameScreen = $('.page');

  gameScreen.html(startPage());


  $( ".start" ).on( "click", function(event){
    event.preventDefault();
    gameScreen.html(charScreen());
  });

  // start fight button
  $(document).on('click', '.fight', function(event){
    event.preventDefault();
    gameScreen.html(fightScreen());
    console.log('hi');
    // if (character is selected) {
    //   gameScreen.html(fightScreen());
    // }
    // else{
    //   $alert('Please choose a character');
    // }
  });


}());
