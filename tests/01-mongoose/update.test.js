const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var users = rewire('./update');
var User = require('./models/user');
var mailer = require('./mailer');

var sandbox = sinon.createSandbox();

describe('users', ()=>{
    let findStub;
    let userModel;
    let mailerStub;

    beforeEach(()=>{
        userModel = {
            save: sandbox.stub().resolves()
        }

        findStub = sandbox.stub(User, 'findById').resolves(userModel);
        mailerStub = sandbox.stub(mailer, 'sendWelcomeEmail').resolves('fake_email');
    })

    afterEach(()=>{
        sandbox.restore();
        users = rewire('./update');
    })

    context('update user', ()=>{
        it('should find user by id', async()=>{
            await users.update('__mockedID', {age: 35});

            expect(findStub).to.have.been.calledWith('__mockedID');
        })

        it('should call user.save', async()=>{
            await users.update('__mockedID', {age: 35});

            expect(userModel.save).to.have.been.calledOnce;
        })

        it('should reject if there is an error', async()=>{
            findStub.throws(new Error('mockedErrorMessage'));

            await expect(users.update('__mockedID', {age: 35})).to.eventually.be.rejectedWith('mockedErrorMessage');
        })
    })
})