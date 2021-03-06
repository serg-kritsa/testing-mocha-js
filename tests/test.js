const assert = require('assert');

describe('tests group description', () => {
  context('tests sub-group description', () => {
    before(()=>{
      console.log('======== before');
    });

    after(()=>{
      console.log('======== after');
    });

    beforeEach(()=>{
      console.log('-------- beforeEach');
    });

    afterEach(()=>{
      console.log('-------- afterEach');
    });

    it('should be 1st test', () => {
      assert.equal(1,1);  
    });

    it('should compare objects', () => {
      assert.deepEqual({name: 'joe'}, {name: 'joe'});  
      // assert.deepEqual({name: 'joe'}, {name: 'steve'});  
    });
  });

  context('tests sub-group 2 description', () => {
    it('should test something', () => {})
  });
});