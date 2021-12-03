const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

var demo = require('./demo');

describe('demo', ()=>{
    context('test doubles', ()=>{
        it('should spy on log', ()=>{
            let spy = sinon.spy(console, 'log');
            demo.foo();

            expect(spy.calledOnce).to.be.true;
            spy.restore();
        })
    })
})