const chai = require('chai');
const expect = chai.expect;

var demo = require('./demo');

describe('demo', ()=>{
    context('test promise', ()=>{
        it('should add with a promise cb', (done)=>{
            demo.addPromise(1,2).then((result)=>{
                expect(result).to.equal(3);
                done();
            }).catch((ex)=>{
                console.log('caught error')
                done(ex);
            })
        })

        it('should test a promise with return', ()=>{
            return demo.addPromise(1,2).then((result)=>{
                expect(result).to.equal(3)
            })
        })
    })
})