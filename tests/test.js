const assert = require('assert');

describe('tests group description', () => {
  context('tests sub-group description', () => {
    before(()=>{
      console.log('======== before');
    });

    after(()=>{
      console.log('======== after');
    });
    
    it('should be 1st test', () => {
      assert.equal(1,1);  
    });

    it('should compare objects', () => {
      assert.deepEqual({name: 'joe'}, {name: 'joe'});  
      // assert.deepEqual({name: 'joe'}, {name: 'steve'});  
    });
  });
});