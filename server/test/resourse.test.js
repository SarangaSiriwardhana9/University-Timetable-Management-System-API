import { expect } from 'chai';
import sinon from 'sinon';
import Resource from '../api/models/resource.model.js';
import {
  createResource,
  getAllResources,
  updateResource,
  deleteResource,
} from '../api/controllers/resourse.controller.js';
import mongoose from 'mongoose';

describe('Integration Testing-Resource Controller', function() {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createResource', function() {
    it('should create a new resource', async () => {
      const req = { body: { name: 'Resource1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const createStub = sandbox.stub(Resource, 'create').resolves({ name: 'Resource1' });

      await createResource(req, res, () => {});

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Resource created successfully!', resource: { name: 'Resource1' } })).to.be.true;
      expect(createStub.calledOnceWith({ name: 'Resource1' })).to.be.true;
    });
  });
//updateResource  should return 404 if resource is not found:
  describe('getAllResources', function() {
    it('should get all resources', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findStub = sandbox.stub(Resource, 'find').resolves([{ name: 'Resource1' }, { name: 'Resource2' }]);

      await getAllResources(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([{ name: 'Resource1' }, { name: 'Resource2' }])).to.be.true;
      expect(findStub.calledOnce).to.be.true;
    });
  });

  describe('updateResource', function() {
    it('should update an existing resource', async () => {
      const req = { params: { id: 'resourceId' }, body: { name: 'UpdatedResource1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndUpdateStub = sandbox.stub(Resource, 'findByIdAndUpdate').resolves({ name: 'UpdatedResource1' });

      await updateResource(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ name: 'UpdatedResource1' })).to.be.true;
      expect(findByIdAndUpdateStub.calledOnceWith('resourceId', { $set: { name: 'UpdatedResource1' } }, { new: true })).to.be.true;
    });

   
  });

  describe('deleteResource', function() {
    it('should delete a resource', async () => {
      const req = { params: { id: 'resourceId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndDeleteStub = sandbox.stub(Resource, 'findByIdAndDelete').resolves({ name: 'Resource1' });

      await deleteResource(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Resource deleted successfully!' })).to.be.true;
      expect(findByIdAndDeleteStub.calledOnceWith('resourceId')).to.be.true;
    });

   
  });
  describe('createResource', function() {
    it('should create a new resource', async () => {
      const req = { body: { name: 'Resource1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const createStub = sandbox.stub(Resource, 'create').resolves({ name: 'Resource1' });

      await createResource(req, res, () => {});

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Resource created successfully!', resource: { name: 'Resource1' } })).to.be.true;
      expect(createStub.calledOnceWith({ name: 'Resource1' })).to.be.true;
    });

    
  });

  describe('getAllResources', function() {
    it('should get all resources', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findStub = sandbox.stub(Resource, 'find').resolves([{ name: 'Resource1' }, { name: 'Resource2' }]);

      await getAllResources(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([{ name: 'Resource1' }, { name: 'Resource2' }])).to.be.true;
      expect(findStub.calledOnce).to.be.true;
    });

 
  });

  describe('updateResource', function() {
    it('should update an existing resource', async () => {
      const req = { params: { id: 'resourceId' }, body: { name: 'UpdatedResource1' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndUpdateStub = sandbox.stub(Resource, 'findByIdAndUpdate').resolves({ name: 'UpdatedResource1' });

      await updateResource(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ name: 'UpdatedResource1' })).to.be.true;
      expect(findByIdAndUpdateStub.calledOnceWith('resourceId', { $set: { name: 'UpdatedResource1' } }, { new: true })).to.be.true;
    });

    
    });
  
    describe('deleteResource', function() {
      it('should delete an existing resource', async () => {
        const req = { params: { id: 'resourceId' } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
  
        const findByIdAndDeleteStub = sandbox.stub(Resource, 'findByIdAndDelete').resolves({ _id: 'resourceId' });
  
        await deleteResource(req, res, () => {});
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith({ message: 'Resource deleted successfully!' })).to.be.true;
        expect(findByIdAndDeleteStub.calledOnceWith('resourceId')).to.be.true;
      });
  
      it('should return 404 if resource is not found', async () => {
        const req = { params: { id: 'nonExistentId' } };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
  
        const findByIdAndDeleteStub = sandbox.stub(Resource, 'findByIdAndDelete').resolves(null);
  
        await deleteResource(req, res, () => {});
  
        expect(res.status.calledWith(404)).to.be.true;
        expect(res.json.calledWith({ message: 'Resource not found!' })).to.be.true;
        expect(findByIdAndDeleteStub.calledOnceWith('nonExistentId')).to.be.true;
      });
  
     
    });
});

describe('Unit Testing- Resourse ', () => {
  before(async function() {
    this.timeout(10000); // Increase timeout to 10000ms for the entire suite
    await mongoose.connect(
      "mongodb+srv://root:1234@cluster0.x3n2x55.mongodb.net/Test-Timetable-Management-System?retryWrites=true&w=majority&appName=Cluster0",
     
    );
  });

  after(async function() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  const testValues = {
    name: 'Laptop',
    brand: 'Dell',
  };

  it('should create a new resource', async () => {
    const newResource = new Resource(testValues);
    const savedResource = await newResource.save();
    expect(savedResource._id).to.exist;
    expect(savedResource.name).to.equal(testValues.name);
    expect(savedResource.brand).to.equal(testValues.brand);
  });

  it('should not create a resource with missing required fields', async () => {
    const resource = new Resource({ name: 'Laptop' });
    try {
      await resource.save();
    } catch (error) {
      expect(error).to.exist;
    }
  });
  it('should not create a resource with duplicate name', async () => {
    const resource = new Resource(testValues);
    await resource.save();

    const duplicateResource = new Resource(testValues);
    try {
      await duplicateResource.save();
    } catch (error) {
      expect(error).to.exist;
    }
  });

  it('should update an existing resource', async () => {
    const newResource = new Resource(testValues);
    await newResource.save();

    newResource.brand = 'HP';
    const updatedResource = await newResource.save();
    expect(updatedResource.brand).to.equal('HP');
  });

 /*  it('should delete an existing resource', async () => {
    const newResource = new Resource(testValues);
    await newResource.save();

    await Resource.deleteOne({ name: testValues.name });
    const deletedResource = await Resource.findOne({ name: testValues.name });
    expect(deletedResource).to.not.exist;
  }); */
});