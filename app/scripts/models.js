var $ = require('jquery');

function Character(config){

  config = config || {};
  $.extend(this, config);

}

// all characters can do these things
Character.prototype.attack = function(){
  // do attack stuff
};

Character.prototype.takeDamage = function(){
  // do take damage stuff
};

// running list of other things we eventually want
// characters to be able to do ?

// - heal
// - flee
// -
// -
// -

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
    picture: '../images/ron-burgundy.jpg',
    health : 100,
    weapon : {
      kind: 'bed post',
      maxDamage: 10,
      minDamage: 2
    }
  }),
  new GoodGuy({
    name : 'Brick Tamland',
    picture: '../images/brick-tamland.jpg',
    health : 100,
    weapon : {
      kind: 'grenade',
      maxDamage: 25,
      minDamage: 10
    }
  }),
  new GoodGuy({
    name : 'Brian Fantana',
    picture: '../images/brian-fantana.jpg',
    health : 100,
    weapon : {
      kind: 'revolver',
      maxDamage: 18,
      minDamage: 12
    }
  }),
  new GoodGuy({
    name : 'Champ Kind',
    picture: '../images/champ-kind.jpg',
    health : 100,
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
    picture: '../images/wes-mantooth.jpg',
    health : 100,
    weapon : {
      kind: 'switchblade',
      maxDamage: 15,
      minDamage: 7
    }
  })
];



module.exports = {
  'Character': Character,
  'GoodGuy': GoodGuy,
  'Villain': Villain
};
