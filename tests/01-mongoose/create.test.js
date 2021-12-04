const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var users = rewire('./create');
var mailer = require('./create-mailer');

var sandbox = sinon.createSandbox();

describe('users', ()=>{
    let sampleUser;
    let mailerStub;

    beforeEach(()=>{
        sampleUser = {
            id: 123,
            name: 'foo',
            email: 'foo@bar.com',
        }

        mailerStub = sandbox.stub(mailer, 'sendWelcomeEmail').resolves('fake_email');
    })

    afterEach(()=>{
        sandbox.restore();
        users = rewire('./create');
    })

    context('create user', ()=>{
        let FakeUserClass, saveStub, result;

        beforeEach(async ()=>{
            saveStub = sandbox.stub().resolves(sampleUser);
            
            FakeUserClass = sandbox.stub().returns({save: saveStub});
            users.__set__('User', FakeUserClass);

            result = await users.create(sampleUser);
        })

        it('should reject invalid args', async()=>{
            await expect(users.create()).to.eventually.be.rejectedWith('Invalid arguments');
            await expect(users.create({name: 'foo'})).to.eventually.be.rejectedWith('Invalid arguments');
            await expect(users.create({email: 'foo@bar.com'})).to.eventually.be.rejectedWith('Invalid arguments');
        })

        it('should call User with new', ()=>{
            expect(FakeUserClass).to.have.been.calledWithNew;
            expect(FakeUserClass).to.have.been.calledWith(sampleUser);
        })

        it('should save the user and return success message', async ()=>{
            expect(saveStub).to.have.been.called;
        })
        
        it('should call mailer with email and name', ()=>{
            expect(mailerStub).to.have.been.calledWith(sampleUser.email, sampleUser.name);
            
            expect(result).to.be.an('object');
            expect(result).to.have.property('message').to.equal('User created');
        })

        it('should reject errors if user wasn\'t saved', async()=>{
            saveStub.rejects(new Error('mockedRejectMessage__'));

            await expect(users.create(sampleUser)).to.eventually.be.rejectedWith('mockedRejectMessage__');
        })
    })
})