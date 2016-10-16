var $ = require('jquery');

function Character(config){

  config = config || {};
  $.extend(this, config);

}

// all characters can do these things
Character.prototype.attack = function(victim){
  // do attack stuff
  // this characters weapon name and min/max damage
  // affect characters health prop
  var maxDamage = this.weapon.maxDamage;
  var minDamage = this.weapon.minDamage;
  var damageDealt = maxDamage - minDamage;

// puts attackmessage into the messagebox
  var attackMessage= this.name + ' ' + 'attacking with' + ' ' + this.weapon.kind + ' ' + "dealing" + ' ' + maxDamage + ' ' + 'to' + ' ' + victim.name;
  $('.message-board').html(attackMessage);
  console.log(attackMessage);

  // call takeDamage on the victim object
  this.takeDamage(maxDamage, victim);
  // update health info on screen
  $(document).trigger('player:attack', victim);
};

Character.prototype.takeDamage = function(damage, victim){
  // do take damage stuff
  // recieve stuff from attack
  var currentHealth = victim.health - damage;
  victim.health = currentHealth;
  console.log(victim.name, 'took damage of', damage, 'from', this.name, 'health is', currentHealth);
};

Character.prototype.announce = function(){
  // find the audio property and play it
  this.audio.play();
};

// running list of other things we eventually want
// characters to be able to do ?

// - heal
// - flee


// ################################################
// GoodGuy constructors & prototype setup
// ################################################
function GoodGuy(config){
  // allow this constructor to use character config setup
  Character.call(this, config);
}

GoodGuy.prototype = new Character();

var goodGuys = [
  new GoodGuy({
    name : 'Ron Burgundy',
    picture: 'images/ron-burgundy.jpg',
    audio: new Audio('../../media-for-game/world.mp3'),
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'bed post',
      maxDamage: 10,
      minDamage: 2
    }
  }),
  new GoodGuy({
    name : 'Brick Tamland',
    picture: 'images/brick-tamland.jpg',
    audio: new Audio('../../media-for-game/grenade.mp3'),
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'trident',
      maxDamage: 13,
      minDamage: 8
    }
  }),
  new GoodGuy({
    name : 'Brian Fantana',
    picture: 'images/brian-fantana.jpg',
    audio: new Audio('../../media-for-game/musk.mp3'),
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'revolver',
      maxDamage: 18,
      minDamage: 12
    }
  }),
  new GoodGuy({
    name : 'Champ Kind',
    picture: 'images/champ-kind.jpg',
    audio: new Audio('../../media-for-game/ateyoursquirrel.mp3'),
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'brass knuckles',
      maxDamage: 18,
      minDamage: 12
    }
  })
];



// ################################################
// Villan constructor & prototype setup
// ################################################
function Villain(config){
  // allow this constructor to use character config setup
  Character.call(this, config);
}

Villain.prototype = new Character();


var badGuys = [
  new Villain({
    name : 'Wes Mantooth',
    picture: 'images/wes-mantooth.jpg',
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'switchblade',
      maxDamage: 15,
      minDamage: 7
    }
  }),
  new Villain({
    name : 'Ed Harken',
    picture: 'images/ed-harken.jpg',
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'pipe',
      maxDamage: 12,
      minDamage: 5
    }
  }),
  new Villain({
    name : 'Jason Mann',
    picture: 'images/jason-mann.jpg',
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'chains',
      maxDamage: 15,
      minDamage: 7
    }
  }),
  new Villain({
    name : 'Paul Flare',
    picture: 'images/paul-flare.jpg',
    health : 100,
    maxHealth : 100,
    weapon : {
      kind: 'fork',
      maxDamage: 12,
      minDamage: 6
    }
  })
];



module.exports = {
  'Character': Character,
  'GoodGuy': GoodGuy,
  'Villain': Villain,
  'goodGuys': goodGuys,
  'badGuys': badGuys
};
