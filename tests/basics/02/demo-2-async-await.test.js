const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);

var demo = require('./demo');

describe('demo', ()=>{
    context('test promise', ()=>{
        it('should test promise with async await', async ()=>{
            let result = await demo.addPromise(1,2);

            expect(result).to.equal(3);
        })

        it('should test promise with chai as promised', async ()=>{
            await expect(demo.addPromise(1,2)).to.eventually.equal(3);
        });
    })
})