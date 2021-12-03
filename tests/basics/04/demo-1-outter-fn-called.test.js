const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var demo = rewire('./demo');

describe('demo', ()=>{
    context('stub private functions', ()=>{
        it('should stub createFile', async ()=>{
            let createFileStub = sinon
                                .stub(demo, 'createFile')
                                .resolves('create_file_stub');
            
            let callDBStub = sinon
                                .stub() // 1) filled by .__set__(   ,   ) later
                                .resolves('calldb_stub');
            demo.__set__('callDB', callDBStub); // 2) mocked NOT exported function // https://www.npmjs.com/package/rewire

            let result = await demo.bar('test.txt');

            expect(createFileStub).to.have.been.calledOnce;
            expect(createFileStub).to.have.been.calledWith('test.txt');
            expect(callDBStub).to.have.been.calledOnce;
            expect(result).to.equal('calldb_stub');
        })
    })
})