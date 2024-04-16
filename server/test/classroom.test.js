import { expect } from 'chai';
import sinon from 'sinon';
import Classroom from '../api/models/classroom.model.js';
import mongoose from 'mongoose';
import {
  
  updateClassroom,
  getAllClassrooms,
  deleteClassroom,
} from '../api/controllers/classroom.controller.js';

describe('Integration Testing-Classroom Controller', function() {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  
  describe('updateClassroom', function() {
    it('should update an existing classroom', async () => {
      const req = {
        params: {
          id: 'classroom_id',
        },
        body: {
          name: 'Updated Room Name',
          capacity: 60,
          building: 'New Building',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndUpdateStub = sandbox.stub(Classroom, 'findByIdAndUpdate').resolves(req.body);

      await updateClassroom(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(req.body)).to.be.true;
      expect(findByIdAndUpdateStub.calledOnceWith(req.params.id, { $set: req.body }, { new: true })).to.be.true;
    });

   
  });

  describe('getAllClassrooms', function() {
    it('should get all classrooms', async () => {
      const classrooms = [{ name: 'Room 101', capacity: 50, building: 'Main Building' }];
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findStub = sandbox.stub(Classroom, 'find').resolves(classrooms);

      await getAllClassrooms(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(classrooms)).to.be.true;
      expect(findStub.calledOnce).to.be.true;
    });

    
  });

  describe('deleteClassroom', function() {
    it('should delete an existing classroom', async () => {
      const req = {
        params: {
          id: 'classroom_id',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndDeleteStub = sandbox.stub(Classroom, 'findByIdAndDelete').resolves(true);

      await deleteClassroom(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Classroom deleted successfully!' })).to.be.true;
      expect(findByIdAndDeleteStub.calledOnceWith(req.params.id)).to.be.true;
    });

   
  });
});

describe("Unit Testing-Classroom Test", () => {
  before(async function() {
    this.timeout(100000); //
    await mongoose.connect(
      "mongodb+srv://root:1234@cluster0.x3n2x55.mongodb.net/Test-Timetable-Management-System?retryWrites=true&w=majority&appName=Cluster0",
     
    );
  });

  after(async function() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  // Test with missing required fields
  it("should not create a classroom with missing required fields", async () => {
    const classroom = new Classroom();
    try {
      await classroom.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property("name");
      expect(error.errors).to.have.property("location");
      expect(error.errors).to.have.property("capacity");
    }
  });

  // Test with valid data
  it("should create a classroom with valid data", async () => {
    const classroomData = {
      name: "Classroom1",
      location: "Building A",
      capacity: 50,
    };

    const classroom = new Classroom(classroomData);
    const createdClassroom = await classroom.save();

    expect(createdClassroom.name).to.equal("Classroom1");
    expect(createdClassroom.location).to.equal("Building A");
    expect(createdClassroom.capacity).to.equal(50);
  });
});