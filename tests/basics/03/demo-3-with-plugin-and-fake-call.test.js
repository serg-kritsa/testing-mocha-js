const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

var demo = require('./demo');

describe('demo', ()=>{
    context('test doubles', ()=>{
        it('should stub console.warn', ()=>{
            let stub = sinon
                        .stub(console, 'warn')
                        .callsFake(()=>{ console.log('message from stub') });

            demo.foo();
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('console.warn was called');
            stub.restore();
        })
    })
})