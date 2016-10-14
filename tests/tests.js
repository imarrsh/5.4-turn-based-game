var chai = require('chai');
var expect = chai.expect;
var $ = require('jquery');
var models = require('../app/scripts/models.js');


//
// describe('Create post form', function(){
//   it('should trigger a create:post event on the document with the title and body', function(done){
//     $(document).on('create:post', function(event, posts){
//       var firstPost = posts[0];
//       expect(firstPost).to.have.property('title');
//       expect(firstPost).to.have.property('body');
//       done();
//     });
//     $('.title').val('title');
//     $('.body').val('body');
//     $('.button').click();
//   });
// })

describe('game start screen', function(){
  it('should expect the start screen to load', function(){
    expect($('.page').length).to.be(4);
  });
});
