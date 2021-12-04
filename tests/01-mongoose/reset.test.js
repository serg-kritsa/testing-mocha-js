const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var users = rewire('./reset');
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
        users = rewire('./reset');
    })

    context('reset password', ()=>{
        let resetStub;

        beforeEach(()=>{
            resetStub = sandbox.stub(mailer, 'sendPasswordResetEmail').resolves('reset');
        })

        it('should check for email', async()=>{
            await expect(users.resetPassword()).to.eventually.be.rejectedWith('Invalid email');
        })

        it('should call sendPasswordResetEmail', async()=>{
            await users.resetPassword('foo@bar.com');

            expect(resetStub).to.have.been.calledWith('foo@bar.com');
        })
    })
})