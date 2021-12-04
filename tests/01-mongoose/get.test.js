const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var users = rewire('./get');
var User = require('./models/user');

var sandbox = sinon.createSandbox();

describe('users', ()=>{
    beforeEach(()=>{
    })

    afterEach(()=>{
        sandbox.restore();
        users = rewire('./get');
    })

    context('get', ()=>{
        it('should return Error in callback if !id', (done)=>{
            users.get(null, (err, result)=>{
                expect(err).to.exist;
                expect(err).to.be.instanceOf(Error);
                expect(err.message).to.equal('Invalid user id');

                expect(result).to.not.exist;
                
                done();
            })
        })

        it('should call Model.findById with id and catch error if there is one', (done)=>{
            sandbox.restore();
            let stub = sandbox.stub(User,'findById')
                                .yields(new Error('mockedErrorMessage__'));

            users.get('__mockedID', (err, result)=>{
                expect(stub).to.have.been.calledOnce;
                expect(stub).to.have.been.calledWith('__mockedID');

                expect(err).to.exist;
                expect(err).to.be.instanceOf(Error);
                expect(err.message).to.equal('mockedErrorMessage__');
                
                expect(result).to.not.exist;

                done();
            })
        })

        it('should call Model.findById with id and return result', (done)=>{
            sandbox.restore();
            let stub = sandbox
                            .stub(User, 'findById')
                            .yields(null, {name: 'mockedDBData__'});

            users.get('__mockedID', (err, result)=>{
                expect(stub).to.have.been.calledOnce;
                expect(stub).to.have.been.calledWith('__mockedID');

                expect(err).to.not.exist;

                expect(result).to.be.a('object');
                expect(result).to.have.property('name').to.equal('mockedDBData__');

                done();
            })
        })
    })
})