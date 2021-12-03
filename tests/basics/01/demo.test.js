const chai = require('chai');
const expect = chai.expect;

var demo = require('./demo');

describe('demo', ()=>{
    context('callback add', ()=>{
        it('should test the callback', (done)=>{
            demo.addCallback(1,2, (err, result)=>{
                expect(err).to.not.exist;
                expect(result).to.equal(3);
                done();
            })
        })
    })
})