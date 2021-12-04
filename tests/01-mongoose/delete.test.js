const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var users = rewire('./delete');
var User = require('./models/user');

var sandbox = sinon.sandbox.create();

describe('users', ()=>{
    let deleteStub;

    beforeEach(()=>{
        deleteStub = sandbox.stub(User, 'remove')
                                .resolves('mockedRemoveResult__');
    })

    afterEach(()=>{
        sandbox.restore();
        users = rewire('./delete');
    })

    context('delete user', ()=>{
        it('should reject Error if !id using \'return\' keyword', ()=>{
            return users.delete().then((result)=>{})
            .catch((ex)=>{
                expect(ex).to.be.instanceof(Error);
                expect(ex.message).to.equal('Invalid id');
            })
        })

        it('should check for error using \'eventually\' keyword', ()=>{
            return expect(users.delete()).to.eventually.be.rejectedWith('Invalid id');
        })

        it('should call User.remove', async()=>{
            let result = await users.delete('__mockedID');

            expect(deleteStub).to.have.been.calledWith({_id: '__mockedID'});

            expect(result).to.equal('mockedRemoveResult__');
        })
    })
})