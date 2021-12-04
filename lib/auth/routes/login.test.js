const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');

var login = rewire('./login');

var sandbox = sinon.createSandbox();

describe('Login', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: (code) => {
        return {
          json: (response) => {
            return { status: code, response: response };
          }
        }
      }
    }
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should reject unauthorized', async () => {
    let result = await login({}, mockRes)
    console.log('------------result: ', result)
    // check for proper status code and response message here
    expect(result.status).to.equal(401);
    expect(result.response).to.have.property('message').to.equal('some fail message');
  });
});