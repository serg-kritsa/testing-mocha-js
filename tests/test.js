const assert = require('assert');

describe('tests group description', () => {
  context('tests sub-group description', () => {
    it('should be 1st test', () => {
      assert.equal(1,1);  
    });
  });
});