var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');

var models = require('./models');
var startPage = require('../templates/start-screen.hbs');
var charScreen = require('../templates/char-screen.hbs');
var fightScreen = require('../templates/fight-screen.hbs');
var winScreen = require('../templates/fight-end-screen.hbs');
var loseScreen = require('../templates/fight-end-lose.hbs');


// wait for dom to be ready
(function(){

  // set some game variables
  var gameScreen = $('.page'),
      chosenChar,
      chosenVillain,
      pairing = {
        combatants : [chosenChar, chosenVillain]
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
    pairing.combatants[1] = chosenVillain;

    console.log(chosenVillain, pairing);
  }

  // track game start
  $(document).on("click", '.start', function(event){
    event.preventDefault();
    console.log(playerCharList);
    gameScreen.html(charScreen(playerCharList));
  });

  // push character data to chosenChar variable
  $(document).on('click', '.character', function(event){
    event.preventDefault();

    // stop any currently playing audio
    if(chosenChar){
      chosenChar.audio.pause();
    }
    // add classes to confirm selection
    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');

    var $chosenChar = $(this);
    var charName = $chosenChar.data('char-name');

    chosenChar = _.filter(playerCharList.characters, {'name': charName})[0];
    pairing.combatants[0] = chosenChar;

    console.log(chosenChar);
    setVillain(); // run villain ranomizer

    // call characters announce method
    chosenChar.announce();
  });

  // start fight screen
  $(document).on('click', '.fight', function(event){
    event.preventDefault();
    if (chosenChar === undefined) {
      alert('Please choose a character');
    }
    else {
      chosenChar.audio.pause(); // pause char audio playback
      gameScreen.html(fightScreen(pairing));
    }
    // console.log(enemyCharList);
  });

  //attack button
  $(document).on('click', '.attack-button', function(event){
    event.preventDefault();
    console.log('button click heard');
    chosenChar.attack(chosenVillain);
    disableButton();
    setTimeout(enableButton, 2500);
    // wait for computer to attack
    setTimeout(function(){
      chosenVillain.attack(chosenChar);
      //make enemy image move
      $('.enemy-image').animate({
        'marginRight': '+=350px'
      }, 100);
      setTimeout($('.enemy-image').animate({
        'marginRight': '-=350px'
      }), 700);
    }, 2500);

  });
//used to disable button while enemy is attacking
  function disableButton(){
    $('.attack-button').prop("disabled", true);
  }

  function enableButton(){
    $('.attack-button').prop("disabled", false);
  }

  $(document).on('click', '.attack-button', function(event){
    event.preventDefault();
    //moves player image when attack button is clicked
    moveRight();
    setTimeout(moveBack, 250);
    function moveRight(){
      $('.player-image').animate({
        'marginLeft' : '+=350px'
      }, 100);
      //tried to get jquery explode effect to function
      //$( ".enemy-image" ).toggle( "explode" );
    }
    function moveBack(){
      $('.player-image').animate({
        'marginLeft' : '-=350px'
      }, 700);
      //$(".enemy-image").toggle("explode");
    }
  });

  // event to update health on screen
  $(document).on('player:attack', function(event, victim){
    console.log(victim, 'of attack');
    if(victim instanceof models.Villain){
      $('.bad-health').text(chosenVillain.health + '/' + chosenVillain.maxHealth);
    } else {
      $('.good-health').text(chosenChar.health + '/' + chosenChar.maxHealth);
    }

    var badHealth = chosenVillain.health;
    var goodHealth = chosenChar.health;
    // changes to the end screen after one character's health reaches zero
    if (goodHealth <= 0) {
      setTimeout(losingScreen, 500);
    }
    else if (badHealth <= 0) {
      setTimeout(winningScreen, 500);
    }
    console.log('attack event logged');

  });

  // functions for changing to the end screen
  function losingScreen(){
    gameScreen.html(loseScreen);
  }
  function winningScreen(){
    gameScreen.html(winScreen);
  }

  $(document).on('click', '.restart', function(){
    location.reload();
  })
}());
