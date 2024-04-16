import { expect } from 'chai';
import sinon from 'sinon';
import {
  getNotificationsByUser, 
  setNotificationAsRead,
  createCustomNotification,
  deleteNotification,
} from '../api/controllers/notification.controller.js';
import Notification from '../api/models/notification.model.js';
import mongoose from 'mongoose';

describe('Integration Testing-Notification Controller', function () {
  describe('getNotificationsByUser', function () {
    it('should return notifications for a user', async function () {
      const userId = 'testUserId';
      const req = { user: { id: userId } };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.be.an('array');
        }
      };

      sinon.stub(Notification, 'find').withArgs({ userId }).resolves([]);

      await getNotificationsByUser(req, res, () => { });

      sinon.restore();
    });

    it('should handle errors', async function () {
      const userId = 'testUserId';
      const req = { user: { id: userId } };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.have.property('message').that.includes('error');
        }
      };

      sinon.stub(Notification, 'find').throws();

      await getNotificationsByUser(req, res, () => { });

      sinon.restore();
    });
  });


  describe('getNotificationsByUser', function () {
    it('should return notifications for a user', async function () {
      const userId = 'userId'; 
      const req = { user: { id: userId } };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data).to.be.an('array');
        }
      };

      await getNotificationsByUser(req, res, () => { });
    });
  });

  describe('setNotificationAsRead', function () {
    it('should set a notification as read', async function () {
      const notificationId = 'notificationId'; 
      const req = { params: { notificationId } };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data.read).to.be.true;
        }
      };

      await setNotificationAsRead(req, res, () => { });
    });
  });

 
  describe('createCustomNotification', function () {
    it('should create a custom notification', async function () {
      const req = {
        body: {
          message: 'Custom Notification Message',
          timetableSlotId: 'timetableSlotId', 
          faculty: 'Faculty',
          year: 1,
          semester: 1,
        }
      };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data.message).to.equal('Custom Notification Message');
        }
      };

      await createCustomNotification(req, res, () => { });
    });
  });

  describe('deleteNotification', function () {
    it('should delete a notification', async function () {
      const notificationId = 'notificationId'; 
      const req = { params: { notificationId } };
      const res = {
        status: function (code) {
          return this;
        },
        json: function (data) {
          expect(data.message).to.equal('Notification deleted');
        }
      };

      await deleteNotification(req, res, () => { });
    });
  });
});

describe('Unit Testing- Notifications ', () => {
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

  it('should create a new notification', async () => {
    const testNotification = {
        message: 'Test notification message',
        timetableSlotId: new mongoose.Types.ObjectId(),
        faculty: 'ComputerScience',
        year: 1,
        semester: 1,
    };

    const newNotification = new Notification(testNotification);
    const savedNotification = await newNotification.save();

    expect(savedNotification.message).to.equal(testNotification.message);
    expect(savedNotification.faculty).to.equal(testNotification.faculty);
    expect(savedNotification.year).to.equal(testNotification.year);
    expect(savedNotification.semester).to.equal(testNotification.semester);
});
it('should mark a notification as read', async () => {
  const testNotification = new Notification({
      message: 'Test notification message',
      timetableSlotId: new mongoose.Types.ObjectId(),
      faculty: 'ComputerScience',
      year: 1,
      semester: 1,
  });

  const savedNotification = await testNotification.save();

  // Mark the notification as read
  savedNotification.read = true;
  const updatedNotification = await savedNotification.save();

  expect(updatedNotification.read).to.equal(true);
});
it('should not create a notification without a message', async () => {
  const testNotification = {
      timetableSlotId: new mongoose.Types.ObjectId(),
      faculty: 'ComputerScience',
      year: 1,
      semester: 1,
  };

  const newNotification = new Notification(testNotification);
  let error = null;
  try {
      await newNotification.save();
  } catch (err) {
      error = err;
  }

  expect(error).to.exist;
  expect(error.errors.message.message).to.equal('Path `message` is required.');
});
});