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



// ################################################
// Villan constructor & prototype setup
// ################################################
function Villain(config){
  // allow this constructor to use character config setup
  Character.call(this, config);
}

Villain.prototype = new Character();




module.exports = {
  'Character': Character,
  'GoodGuy': GoodGuy,
  'Villain': Villain
};
