import { expect } from 'chai';
import sinon from 'sinon';
import { createAnnouncement, getAllAnnouncements, getAnnouncementsByFacultyYearSemester, getAnnouncementsByUserFacultyYearSemester } from '../api/controllers/announcement.controller.js';
import Announcement from '../api/models/announcement.model.js';
import mongoose from 'mongoose';

describe('Integration Testing-Announcement Controller', function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('Announcement Controller', function () {
    describe('createAnnouncement', function () {
      it('should create a new announcement', async function () {
        const req = {
          body: {
            title: 'Test Announcement',
            content: 'This is a test announcement.',
            faculty: 'Test Faculty',
            year: 'Test Year',
            semester: 'Test Semester',
          },
          user: { _id: 'userId' }
        };
        const res = {
          status: function (code) {
            return this;
          },
          json: function (data) {
            expect(data).to.have.property('message').to.equal('Announcement created successfully!');
            expect(data).to.have.property('announcement').to.be.an('object');
          }
        };

        await createAnnouncement(req, res, () => { });
      });
      it('should return an error if required fields are missing', async function () {
        const req = {
          body: {
            content: 'This is a test announcement.',
            faculty: 'Test Faculty',
            year: 'Test Year',
            semester: 'Test Semester',
          },
          user: { _id: 'userId' }
        };
        const res = {
          status: function (code) {
            return this;
          },
          json: function (data) {
            expect(data).to.have.property('error');
          }
        };

        await createAnnouncement(req, res, () => { });
      });
    });

  });

  describe('getAllAnnouncements', function () {
    it('should return an error when an error occurs', async function () {
      const req = {};
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.have.property('message').that.equals('Internal Server Error');
        }
      };
      const next = sinon.spy();
      sinon.stub(Announcement, 'find').throws('Some error');
      await getAllAnnouncements(req, res, next);
      expect(next.calledOnce).to.be.true;
    });
    it('should return all announcements', async function () {
      const req = {};
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.be.an('array');
        }
      };

      await getAllAnnouncements(req, res, () => { });
    });
    it('should return an empty array if no announcements exist', async function () {
      const req = {};
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.be.an('array').that.is.empty;
        }
      };

      await getAllAnnouncements(req, res, () => { });
    });
  });

  describe('getAnnouncementsByFacultyYearSemester', function () {
    it('should return an error when faculty, year, or semester is missing', async function () {
      const req = {
        body: {
          // Missing faculty, year, and semester
        }
      };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.have.property('message').that.equals('Validation failed: faculty: Faculty is required, year: Year is required, semester: Semester is required');
        }
      };
      await getAnnouncementsByFacultyYearSemester(req, res, () => { });
    });
    it('should return announcements by faculty, year, and semester', async function () {
      const req = { body: { faculty: 'Test Faculty', year: 'Test Year', semester: 'Test Semester' } };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.be.an('array');
        }
      };

      await getAnnouncementsByFacultyYearSemester(req, res, () => { });
    });

  });





});

describe("Unit Testing-announcements ", () => {
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
  it('should create a new announcement', async () => {
    const testAnnouncement = {
        title: 'Test Announcement',
        content: 'This is a test announcement.',
        faculty: 'ComputerScience',
        year: 1,
        semester: 1,
    };

    const newAnnouncement = new Announcement(testAnnouncement);
    const savedAnnouncement = await newAnnouncement.save();

    expect(savedAnnouncement.title).to.equal('Test Announcement');
    expect(savedAnnouncement.content).to.equal('This is a test announcement.');
    expect(savedAnnouncement.faculty).to.equal('ComputerScience');
    expect(savedAnnouncement.year).to.equal(1);
    expect(savedAnnouncement.semester).to.equal(1);
  });

  it('should not create an announcement without required fields', async () => {
    const testAnnouncement = {
        title: 'Test Announcement',
        content: 'This is a test announcement.',
    };

    const newAnnouncement = new Announcement(testAnnouncement);
    try {
        await newAnnouncement.save();
    } catch (error) {
        expect(error).to.exist;
        expect(error.message).to.contain('Announcement validation failed');
    }
});
it('should not create an announcement with invalid faculty', async () => {
  const testAnnouncement = {
      title: 'Test Announcement',
      content: 'This is a test announcement.',
      faculty: 'InvalidFaculty',
      year: 1,
      semester: 1,
  };

  const newAnnouncement = new Announcement(testAnnouncement);
  try {
      await newAnnouncement.save();
  } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.contain('Announcement validation failed');
  }
});

it('should not create an announcement with invalid year', async () => {
  const testAnnouncement = {
      title: 'Test Announcement',
      content: 'This is a test announcement.',
      faculty: 'ComputerScience',
      year: 5,
      semester: 1,
  };

  const newAnnouncement = new Announcement(testAnnouncement);
  try {
      await newAnnouncement.save();
  } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.contain('Announcement validation failed');
  }
});

it('should not create an announcement with invalid semester', async () => {
  const testAnnouncement = {
      title: 'Test Announcement',
      content: 'This is a test announcement.',
      faculty: 'ComputerScience',
      year: 1,
      semester: 3,
  };

  const newAnnouncement = new Announcement(testAnnouncement);
  try {
      await newAnnouncement.save();
  } catch (error) {
      expect(error).to.exist;
      expect(error.message).to.contain('Announcement validation failed');
  }
});
});