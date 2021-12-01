const chai = require('chai');
const expect = chai.expect;

describe('tests group description', () => {
  it('should be 1st test', () => {
    expect(1).to.equal(1);  
  });
  
  it('should compare objects', () => {
    expect({name: 'joe'}).to.deep.equal({name: 'joe'});  
  });
  
  it('should object key-value', () => {
    expect({name: 'joe'}).to.have.property('name').to.equal('joe');  
  });

  it('should be false', () => {
    expect(5 > 8).to.be.false;
  });

  it('should check type', () => {
    expect({}).to.be.a('object');
    expect('foo').to.be.a('string');
    expect(9).to.be.a('number');
  });

  it('should check if NULL', () => {
    expect(null).to.be.null;
  });

  it('should check if undefined', () => {
    expect(undefined).to.not.exist;
    // expect(1).to.exist;
  });

  it('should check string length', () => {
    expect('foo').to.be.a('string').with.length(3);
  });

  it('should check array length', () => {
    expect([1,2,3].length).to.equal(3);
  });
  
});