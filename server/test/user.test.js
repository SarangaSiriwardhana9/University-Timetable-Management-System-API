import { expect } from 'chai';
import sinon from 'sinon';
import bcryptjs from 'bcryptjs';
import { signin,signup } from '../api/controllers/auth.controller.js';
import User from '../api/models/user.model.js';
import mongoose from 'mongoose';
import {
  updateSemesterAndYear,

} from '../api/controllers/user.controller.js';

describe(' Integration Testing-User Management', function() {
  describe('User Signup', function() {
    this.timeout(5000); // Increase the timeout to 5 seconds
  
    it('should return an error if universityId is not 12 characters long', async () => {
      const req = {
        body: {
          universityId: 'invalidId',
          username: 'testUser',
          email: 'test@example.com',
          password: 'password',
          faculty: 'ComputerScience',
          profilePic: 'https://example.com/profile.jpg'
        }
      };
      let error;
      const next = (err) => { error = err; };
  
      await signup(req, {}, next);
  
      expect(error.statusCode).to.equal(400);
      expect(error.message).to.equal('University ID must be exactly 12 characters long');
    });
  
    it('should authenticate user if email and password are correct', async () => {
      const req = {
        body: {
          universityId: 'CSST4559552',
          username: 'testUser',
          email: 'test@example.com',
          password: 'password',
          faculty: 'ComputerScience',
          profilePic: 'https://example.com/profile.jpg'
        }
      };
      let error;
      const next = (err) => { error = err; };
  
      await signup(req, {}, next);
  
      expect(error.statusCode).to.equal(400);
      expect(error.message).to.equal('University ID must be exactly 12 characters long');
    });
  });
  describe('User Signin', function() {
      let sandbox;
    
      beforeEach(() => {
        sandbox = sinon.createSandbox();
      });
    
      afterEach(() => {
        sandbox.restore();
      });
    
      it('should authenticate user if email and password are correct', async () => {
        const req = {
          body: {
            email: 'incorrect@example.com',
            password: 'password',
          },
        };
    
        const next = sinon.spy();
    
        const userFindOneStub = sandbox.stub(User, 'findOne').returns(null);
    
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
          cookie: sinon.stub(),
        };
    
        await signin(req, res, next);
    
        expect(next.calledOnce).to.be.true; // Error should be passed to next()
        expect(next.args[0][0].statusCode).to.equal(404); // Error status code should be 404
        expect(next.args[0][0].message).to.equal('User not found!'); // Error message should indicate user not found
        expect(res.status.notCalled).to.be.true; // Response status should not be set
        expect(res.json.notCalled).to.be.true; // Response JSON should not be called
        expect(userFindOneStub.calledOnceWith({ email: 'incorrect@example.com' })).to.be.true; // findOne should be called once with the incorrect email
      });
    
      it('should return an error if inputs are incorrect', async () => {
        const validUser = {
          _id: 'user_id',
          email: 'test@example.com',
          password: bcryptjs.hashSync('password', 10),
          role: 'Student', 
        };
    
        const req = {
          body: {
            email: 'test@example.com',
            password: 'incorrect_password',
          },
        };
    
        const next = sinon.spy();
    
        const userFindOneStub = sandbox.stub(User, 'findOne').returns(validUser);
    
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
          cookie: sinon.stub(),
        };
    
        await signin(req, res, next);
    
        expect(next.calledOnce).to.be.true; // Error should be passed to next()
        expect(next.args[0][0].statusCode).to.equal(403); // Error status code should be 403
        expect(next.args[0][0].message).to.equal('Wrong credentials!'); // Error message should indicate wrong credentials
        expect(res.status.notCalled).to.be.true; // Response status should not be set
        expect(res.json.notCalled).to.be.true; // Response JSON should not be called
        expect(userFindOneStub.calledOnceWith({ email: 'test@example.com' })).to.be.true; // findOne should be called once with the correct email
      });
    });
  
    
    describe('User Controller', function() {
      let sandbox;
    
      beforeEach(() => {
        sandbox = sinon.createSandbox();
      });
    
      afterEach(() => {
        sandbox.restore();
      });
    
      describe('updateSemesterAndYear', function() {
        it('should update semester and year for the user', async () => {
          const req = {
            body: {
              semester: 1,
              year: 2,
            },
            user: {
              id: 'user_id',
            },
          };
    
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
    
          const findByIdAndUpdateStub = sandbox.stub(User, 'findByIdAndUpdate').resolves({});
    
          await updateSemesterAndYear(req, res, () => {});
    
          expect(res.status.calledWith(200)).to.be.true;
          expect(res.json.calledWith({ message: 'Semester and year updated successfully!' })).to.be.true;
          expect(findByIdAndUpdateStub.calledOnceWith('user_id', { $set: { semester: 1, year: 2 } }, { new: true })).to.be.true;
        });
    
        it('should return error for invalid semester value', async () => {
          const req = {
            body: {
              semester: 3,
              year: 2,
            },
          };
    
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
    
          await updateSemesterAndYear(req, res, () => {});
    
          expect(res.status.calledWith(400)).to.be.true;
          expect(res.json.calledWith({ message: 'Invalid semester value. Semester must be 1 or 2.' })).to.be.true;
        });
    
        it('should return error for invalid year value', async () => {
          const req = {
            body: {
              semester: 1,
              year: 5,
            },
          };
    
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
    
          await updateSemesterAndYear(req, res, () => {});
    
          expect(res.status.calledWith(400)).to.be.true;
          expect(res.json.calledWith({ message: 'Invalid year value. Year must be 1, 2, 3, or 4.' })).to.be.true;
        });
      });
    
      
    });
});

describe("Unit Testing-User Test", () => {
  before(async function() {
    this.timeout(10000); // Increase timeout to 10000ms for the entire suite
    await mongoose.connect(
      "mongodb+srv://root:1234@cluster0.x3n2x55.mongodb.net/Test-Timetable-Management-System?retryWrites=true&w=majority&appName=Cluster0",
      {
    
      }
    );
  });

  after(async function() {
    await User.deleteMany();
    await mongoose.disconnect();
  });



  // Test with invalid user
  it("should not create a user with non-unique username", async () => {
    const user = {
      username: "john_doe7",
      password: "securepassword123",
      role: "admin",
    };

    const newUser = new User(user);
    try {
      await newUser.save();
    } catch (error) {
      expect(error).to.exist;
    }
  });

  it("should create a new user", async () => {
      const user = {
        universityId: "CSST12555892",
        username: "student8",
        email: "src@example.com",
        password: "1234",
        faculty: "ComputerScience",
      };
    
      const newUser = new User(user);
      const createdUser = await newUser.save();
    
      expect(createdUser.username).to.equal("student8");
      expect(createdUser.email).to.equal("src@example.com");
      expect(createdUser.faculty).to.equal("ComputerScience");
    });
    it("should not create a user with missing required fields", async () => {
      const user = new User();
      try {
        await user.save();
      } catch (error) {
        expect(error).to.exist;
        expect(error.errors).to.have.property("username");
        expect(error.errors).to.have.property("email");
        expect(error.errors).to.have.property("password");
        expect(error.errors).to.have.property("faculty");
      }
    });
    it("should not create a user with invalid role", async () => {
      const user = {
        universityId: "CSST12555892",
        username: "student10",
        email: "student10@example.com",
        password: "password123",
        faculty: "ComputerScience",
        role: "InvalidRole",
      };

      const newUser = new User(user);
      try {
        await newUser.save();
      } catch (error) {
        expect(error).to.exist;
        expect(error.errors["role"].message).to.equal("`InvalidRole` is not a valid enum value for path `role`.");
      }
    });
});