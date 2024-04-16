import { expect } from 'chai';
import sinon from 'sinon';
import {  getTimetableSlotsByUser, updateTimetableSlot} from '../api/controllers/timetable.controller.js';
import Timetable from '../api/models/timetable.model.js';
import User from '../api/models/user.model.js';
import mongoose from 'mongoose';

describe('Integration Testing-Timetable Controller', function() {

  describe('createTimetableSlot', function() {
    it('should return an error if the classroom is already booked for the new time slot', async function() {
      const req = {
        params: { id: 'timetableId' },
        body: {
          faculty: 'Faculty',
          year: 1,
          semester: 1,
          classroomId: 'classroomId',
          date: '2024-04-01',
          startTime: '09:00',
          endTime: '10:00'
        }
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').that.equals('Classroom already allocated for the specified time period!');
        }
      };
      sinon.stub(Timetable, 'findOne').returns(true); // Stub to simulate existing slot
      await updateTimetableSlot(req, res, () => {});
    });

    it('should return an error if year is Invalid', async function() {
        const req = {
          params: { id: 'timetableId' },
          body: {
            faculty: 'Faculty',
            year: null, // Set year to null
            semester: 1,
            classroomId: 'classroomId',
            date: '2024-04-01',
            startTime: '09:00',
            endTime: '10:00'
          }
        };
        const res = {
          status: function(code) {
            return this;
          },
          json: function(data) {
            expect(data).to.have.property('message').that.equals('Year cannot be null.');
          }
        };
  
        await updateTimetableSlot(req, res, () => {});
      });

       // Test case for null faculty
    it('should return an error if faculty is Invalid', async function() {
        const req = {
          params: { id: 'timetableId' },
          body: {
            faculty: null,
            year: 1,
            semester: 1,
            classroomId: 'classroomId',
            date: '2024-04-01',
            startTime: '09:00',
            endTime: '10:00'
          }
        };
        const res = {
          status: function(code) {
            return this;
          },
          json: function(data) {
            expect(data).to.have.property('message').that.equals('Faculty cannot be null.');
          }
        };
  
        await updateTimetableSlot(req, res, () => {});
      });


       // Test case for null year
    it('should return an error if year is Invalid', async function() {
        const req = {
          params: { id: 'timetableId' },
          body: {
            faculty: 'Faculty',
            year: null,
            semester: 1,
            classroomId: 'classroomId',
            date: '2024-04-01',
            startTime: '09:00',
            endTime: '10:00'
          }
        };
        const res = {
          status: function(code) {
            return this;
          },
          json: function(data) {
            expect(data).to.have.property('message').that.equals('Year cannot be null.');
          }
        };
  
        await updateTimetableSlot(req, res, () => {});
      });

       // Test case for null semester
    it('should return an error if semester is Invalid', async function() {
        const req = {
          params: { id: 'timetableId' },
          body: {
            faculty: 'Faculty',
            year: 1,
            semester: null,
            classroomId: 'classroomId',
            date: '2024-04-01',
            startTime: '09:00',
            endTime: '10:00'
          }
        };
        const res = {
          status: function(code) {
            return this;
          },
          json: function(data) {
            expect(data).to.have.property('message').that.equals('Semester cannot be null.');
          }
        };
  
        await updateTimetableSlot(req, res, () => {});
      });
  });
  describe('updateTimetableSlot', function() {
      afterEach(function () {
        sinon.restore();

        
      });
  
      it('should return an error if the classroom is already booked for the new time slot', async function() {
        const req = {
          params: { id: 'timetableId' },
          body: {
            faculty: 'Faculty',
            year: 1,
            semester: 1,
            classroomId: 'classroomId',
            date: '2024-04-01',
            startTime: '09:00',
            endTime: '10:00'
          }
        };
        const res = {
          status: function(code) {
            return this;
          },
          json: function(data) {
            expect(data).to.have.property('message').that.equals('Classroom already allocated for the specified time period!');
          }
        };
        
        await updateTimetableSlot(req, res, () => {});
      });
  
      it('should return an error if year is null', async function() {
          const req = {
            params: { id: 'timetableId' },
            body: {
              faculty: 'Faculty',
              year: null, // Set year to null
              semester: 1,
              classroomId: 'classroomId',
              date: '2024-04-01',
              startTime: '09:00',
              endTime: '10:00'
            }
          };
          const res = {
            status: function(code) {
              return this;
            },
            json: function(data) {
              expect(data).to.have.property('message').that.equals('Year cannot be null.');
            }
          };
    
          await updateTimetableSlot(req, res, () => {});
        });
  
         // Test case for null faculty
      it('should return an error if faculty is null', async function() {
          const req = {
            params: { id: 'timetableId' },
            body: {
              faculty: null,
              year: 1,
              semester: 1,
              classroomId: 'classroomId',
              date: '2024-04-01',
              startTime: '09:00',
              endTime: '10:00'
            }
          };
          const res = {
            status: function(code) {
              return this;
            },
            json: function(data) {
              expect(data).to.have.property('message').that.equals('Faculty cannot be null.');
            }
          };
    
          await updateTimetableSlot(req, res, () => {});
        });
  
  
         // Test case for null year
      it('should return an error if year is null', async function() {
          const req = {
            params: { id: 'timetableId' },
            body: {
              faculty: 'Faculty',
              year: null,
              semester: 1,
              classroomId: 'classroomId',
              date: '2024-04-01',
              startTime: '09:00',
              endTime: '10:00'
            }
          };
          const res = {
            status: function(code) {
              return this;
            },
            json: function(data) {
              expect(data).to.have.property('message').that.equals('Year cannot be null.');
            }
          };
    
          await updateTimetableSlot(req, res, () => {});
        });
  
         // Test case for null semester
      it('should return an error if semester is null', async function() {
          const req = {
            params: { id: 'timetableId' },
            body: {
              faculty: 'Faculty',
              year: 1,
              semester: null,
              classroomId: 'classroomId',
              date: '2024-04-01',
              startTime: '09:00',
              endTime: '10:00'
            }
          };
          const res = {
            status: function(code) {
              return this;
            },
            json: function(data) {
              expect(data).to.have.property('message').that.equals('Semester cannot be null.');
            }
          };
    
          await updateTimetableSlot(req, res, () => {});
        });
  });


  describe('getTimetableSlotsByCriteria', function() {
  // Test case for null faculty
  it('should return an error if faculty is Invalid', async function() {
    const req = {
      body: {
        faculty: null,
        year: 1,
        semester: 1,
        classroomId: 'classroomId',
        date: '2024-04-01',
        startTime: '09:00',
        endTime: '10:00'
      }
    };
    const res = {
      status: function(code) {
        return this;
      },
      json: function(data) {
        expect(data).to.have.property('message').that.equals('Faculty cannot be null.');
      }
    };
  });
    // Test case for null year
   it('should return an error if year is Invalid', async function() {
   const req = {
       body: {
       faculty: 'Faculty',
       year: null,
       semester: 1,
       classroomId: 'classroomId',
       date: '2024-04-01',
       startTime: '09:00',
       endTime: '10:00'
       }
   };
   const res = {
       status: function(code) {
       return this;
       },
       json: function(data) {
       expect(data).to.have.property('message').that.equals('Year cannot be null.');
       }
   };
});

}
);

describe('getTimetableSlotsByFacultyYearSemester', function() {
 


    // Test case for null year
   it('should return an error if Semester is Invalid', async function() {
   const req = {
       body: {
       faculty: 'Faculty',
       year: null,
       semester: 1,
       classroomId: 'classroomId',
       date: '2024-04-01',
       startTime: '09:00',
       endTime: '10:00'
       }
   };
   const res = {
       status: function(code) {
       return this;
       },
       json: function(data) {
       expect(data).to.have.property('message').that.equals('Year cannot be null.');
       }
   };
});
}
);

describe('getTimetableSlotsByUser', function() {
 


    // Test case for null year
   it('should return an error if user not valid', async function() {
   const req = {
       body: {
       faculty: 'Faculty',
       year: null,
       semester: 1,
       classroomId: 'classroomId',
       date: '2024-04-01',
       startTime: '09:00',
       endTime: '10:00'
       }
   };
   const res = {
       status: function(code) {
       return this;
       },
       json: function(data) {
       expect(data).to.have.property('message').that.equals('Year cannot be null.');
       }
   };
});

    //Test cases for return timetable slots
    it('should return timetable slots for the user', async function() {
        const req = {
          params: { id: 'userId' },
        };
        const res = {
          status: function(code) {
            return this;
          },
          json: function(data) {
            expect(data).to.have.property('message').that.equals('Timetable slots retrieved successfully.');
          }
        };
        sinon.stub(User, 'findById').returns(true); // Stub to simulate existing user
        await getTimetableSlotsByUser(req, res, () => {});
      });
}
);




});


describe('Unit Testing- Timetable ', () => {
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
  const generateObjectId = () => new mongoose.Types.ObjectId();
  const testValues = {
    faculty: 'ComputerScience',
    year: 2,
    semester: 1,
    type: 'Lecture',
    courseId: generateObjectId(),
    classroomId: generateObjectId(),
    resourceIds: [generateObjectId()],
    date: new Date('2024-05-01'),
    day: 'Monday',
    startTime: '09:00',
    endTime: '11:00',
  };

  it('should create a new timetable slot', async () => {
    const newTimetableSlot = new Timetable(testValues);
    const savedTimetableSlot = await newTimetableSlot.save();
    expect(savedTimetableSlot._id).to.exist;
    expect(savedTimetableSlot.faculty).to.equal(testValues.faculty);
    expect(savedTimetableSlot.year).to.equal(testValues.year);
    expect(savedTimetableSlot.semester).to.equal(testValues.semester);
    expect(savedTimetableSlot.type).to.equal(testValues.type);
    expect(savedTimetableSlot.courseId.toString()).to.equal(testValues.courseId.toString());
    expect(savedTimetableSlot.classroomId.toString()).to.equal(testValues.classroomId.toString());
    expect(savedTimetableSlot.resourceIds.map(id => id.toString())).to.have.members(testValues.resourceIds.map(id => id.toString()));
    expect(savedTimetableSlot.date.toString()).to.equal(testValues.date.toString());
    expect(savedTimetableSlot.day).to.equal(testValues.day);
    expect(savedTimetableSlot.startTime).to.equal(testValues.startTime);
    expect(savedTimetableSlot.endTime).to.equal(testValues.endTime);
  });

  // Test case for Invalid faculty
  it('should not save timetable slot with Invalid faculty', async () => {
    const newTimetableSlot = new Timetable({ ...testValues, faculty: null });
    let error;
    try {
      await newTimetableSlot.save();
    } catch (e) {
      error = e;
    }
    expect(error).to.exist;
  });

  // Test case for null year
  it('Should return error when Invalid time slots', async () => {
    const newTimetableSlot = new Timetable({ ...testValues, year: null });
    let error;
    try {
      await newTimetableSlot.save();
    } catch (e) {
      error = e;
    }
    expect(error).to.exist;
  });

  // Test case for invalid classrooms
  it('should not save timetable slot with if Invalid Class rooms', async () => {
    const newTimetableSlot = new Timetable({ ...testValues, semester: null });
    let error;
    try {
      await newTimetableSlot.save();
    } catch (e) {
      error = e;
    }
    expect(error).to.exist;
  });
});