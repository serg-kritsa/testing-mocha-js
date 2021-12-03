const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

var demo = require('./demo');

describe('demo', ()=>{
    context('test doubles', ()=>{
        it('should spy on log', ()=>{
            let spy = sinon.spy(console, 'log');
            demo.foo();

            expect(spy).to.have.been.calledOnce;
            spy.restore();
        })
    })
})