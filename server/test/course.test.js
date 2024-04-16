import { expect } from 'chai';
import sinon from 'sinon';
import Course from '../api/models/course.model.js';
import { updateCourse, deleteCourse, assignLecturers, assignInstructors, getCourseByName,
    getAllCourses,
    getCoursesByYearAndSemester,
    getStudentsByCourse,
    getAssignedCourses,
    removeAssignedUser,
    enrollCourse,
    getEnrolledCourses,
    getAvailableCoursesForStudent,
   } from '../api/controllers/course.controller.js';
   import mongoose from 'mongoose';

describe('Integration Testing-Course Controller', function() {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('updateCourse', function() {
    it('should update an existing course', async () => {
      const req = {
        params: { id: 'courseId' },
        body: { name: 'Updated Course Name' },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndUpdateStub = sandbox.stub(Course, 'findByIdAndUpdate').resolves(req.body);

      await updateCourse(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(req.body)).to.be.true;
      expect(findByIdAndUpdateStub.calledOnceWith('courseId', { $set: req.body }, { new: true })).to.be.true;
    });
  });

  describe('deleteCourse', function() {
    it('should delete a course', async () => {
      const req = { params: { id: 'courseId' } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndDeleteStub = sandbox.stub(Course, 'findByIdAndDelete').resolves({});

      await deleteCourse(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Course deleted successfully!' })).to.be.true;
      expect(findByIdAndDeleteStub.calledOnceWith('courseId')).to.be.true;
    });
  });

  describe('assignLecturers', function() {
    it('should assign lecturers to a course', async () => {
      const req = {
        params: { id: 'courseId' },
        body: { lecturers: ['lecturerId1', 'lecturerId2'] },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndUpdateStub = sandbox.stub(Course, 'findByIdAndUpdate').resolves(req.body);

      await assignLecturers(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(req.body)).to.be.true;
      expect(findByIdAndUpdateStub.calledOnceWith('courseId', { $addToSet: { lecturers: req.body.lecturers } }, { new: true })).to.be.true;
    });
  });

  describe('assignInstructors', function() {
    it('should assign instructors to a course', async () => {
      const req = {
        params: { id: 'courseId' },
        body: { instructors: ['instructorId1', 'instructorId2'] },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findByIdAndUpdateStub = sandbox.stub(Course, 'findByIdAndUpdate').resolves(req.body);

      await assignInstructors(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(req.body)).to.be.true;
      expect(findByIdAndUpdateStub.calledOnceWith('courseId', { $addToSet: { instructors: req.body.instructors } }, { new: true })).to.be.true;
    });
  });
  describe('getAllCourses', function() {
    it('should get all courses', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findStub = sandbox.stub(Course, 'find').resolves([{ name: 'Course1' }, { name: 'Course2' }]);

      await getAllCourses(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([{ name: 'Course1' }, { name: 'Course2' }])).to.be.true;
      expect(findStub.calledOnce).to.be.true;
    });
  });

  describe('getCoursesByYearAndSemester', function() {
    it('should get courses by year and semester', async () => {
      const req = { params: { year: 2024, semester: 1 } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findStub = sandbox.stub(Course, 'find').resolves([{ name: 'Course1' }, { name: 'Course2' }]);

      await getCoursesByYearAndSemester(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([{ name: 'Course1' }, { name: 'Course2' }])).to.be.true;
      expect(findStub.calledOnceWith({ year: 2024, semester: 1 })).to.be.true;
    });
  });

  describe('getStudentsByCourse', function() {
    it('should get all students enrolled in a course', async () => {
      const req = { params: { id: 'courseId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const populateStub = sandbox.stub().resolves({ students: ['student1', 'student2'] });
      const findByIdStub = sandbox.stub(Course, 'findById').returns({ populate: populateStub });

      await getStudentsByCourse(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(['student1', 'student2'])).to.be.true;
      expect(findByIdStub.calledOnceWith('courseId')).to.be.true;
    });
  });

  describe('getCourseByName', function() {
    it('should get course details by course name', async () => {
      const req = { params: { name: 'CourseName' } };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findOneStub = sandbox.stub(Course, 'findOne').resolves({ courseName: 'CourseName' });

      await getCourseByName(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ courseName: 'CourseName' })).to.be.true;
      expect(findOneStub.calledOnceWith({ courseName: 'CourseName' })).to.be.true;
    });
  });

  describe('getAssignedCourses', function() {
    it('should get courses assigned to a lecturer or instructor', async () => {
      const req = { user: { id: 'userId' } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const findStub = sandbox.stub(Course, 'find').resolves([{ name: 'Course1' }, { name: 'Course2' }]);

      await getAssignedCourses(req, res, () => {});

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith([{ name: 'Course1' }, { name: 'Course2' }])).to.be.true;
      expect(findStub.calledOnceWith({ $or: [{ lecturers: 'userId' }, { instructors: 'userId' }] })).to.be.true;
    });
  });

  describe('removeAssignedUser', function() {
    it('should remove an assigned user if user is Admin and user is assigned to the course', async function() {
      const req = {
        params: { courseId: 'courseId', userId: 'userId' },
        user: { role: 'Admin' }
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('Assigned user removed successfully!');
        }
      };

      await removeAssignedUser(req, res, () => {});
    });

    
  });

  describe('enrollCourse', function() {
    it('should enroll a student in a course if enrollment key is correct', async function() {
      const courseId = 'courseId';
      const enrollmentKey = 'enrollmentKey';
      const studentId = 'studentId';
      const req = {
        params: { id: courseId },
        body: { enrollmentKey: enrollmentKey },
        user: { id: studentId }
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('Enrolled in course successfully!');
        }
      };

      await enrollCourse(req, res, () => {});
    });
    it('should return an error if user is not Admin', async function() {
      const req = {
        params: { courseId: 'courseId', userId: 'userId' },
        user: { role: 'Student' } 
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('Only Admins can remove assigned users.');
        }
      };

      await removeAssignedUser(req, res, () => {});
    });
    it('should return an error if course is not found', async function() {
      const req = {
        params: { courseId: 'nonExistentCourseId', userId: 'userId' },
        user: { role: 'Admin' }
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('Course not found!');
        }
      };

      await removeAssignedUser(req, res, () => {});
    });
    it('should return an error if course is not found', async function() {
      const req = {
        params: { id: 'nonExistentCourseId' },
        body: { enrollmentKey: 'enrollmentKey' },
        user: { id: 'studentId' }
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('Course not found!');
        }
      };

      await enrollCourse(req, res, () => {});
    });
    it('should return an error if enrollment key is incorrect', async function() {
      const req = {
        params: { id: 'courseId' },
        body: { enrollmentKey: 'incorrectKey' },
        user: { id: 'studentId' }
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('Invalid enrollment key!');
        }
      };

      await enrollCourse(req, res, () => {});
    });
    it('should return an error if student is already enrolled in the course', async function() {
      const req = {
        params: { id: 'courseId' },
        body: { enrollmentKey: 'enrollmentKey' },
        user: { id: 'alreadyEnrolledStudentId' }
      };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('You are already enrolled in this course!');
        }
      };

      await enrollCourse(req, res, () => {});
    });
  });
  describe('getEnrolledCourses', function() {
    it('should return an error if user is not found', async function() {
      const req = { user: { id: 'nonExistentUserId' } };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('User not found!');
        }
      };
  
      await getEnrolledCourses(req, res, () => {});
    });
    it('should return enrolled courses for a user', async function() {
      const userId = 'userId'; 
      const req = { user: { id: userId } };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.be.an('array');
        }
      };

      await getEnrolledCourses(req, res, () => {});
    });

    it('should return an error if user is not found', async function() {
      const req = { user: { id: 'nonExistentUserId' } };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('User not found!');
        }
      };

      await getEnrolledCourses(req, res, () => {});
    });
  
   
  });

  describe('getAvailableCoursesForStudent', function() {
    it('should return available courses for student', async function() {
      const req = { user: { id: 'studentId' } }; 
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.be.an('array');
        }
      };

      await getAvailableCoursesForStudent(req, res, () => {});
    });

    it('should return available courses for a student', async function() {
      const userId = 'studentId'; 
      const req = { user: { id: userId } };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.be.an('array');
        }
      };
  
      await getAvailableCoursesForStudent(req, res, () => {});
    });
  
    it('should return an error if student is not found', async function() {
      const req = { user: { id: 'nonExistentStudentId' } };
      const res = {
        status: function(code) {
          return this;
        },
        json: function(data) {
          expect(data).to.have.property('message').to.equal('User not found!');
        }
      };
  
      await getAvailableCoursesForStudent(req, res, () => {});
    });
  });
 

  
});


describe('Unit Testing- Course ', () => {
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

  it('should create a new course', async () => {
    const courseData = {
      faculty: 'ComputerScience',
      year: 2,
      semester: 1,
      courseName: 'Example Course',
      courseCode: 'CSC101',
      description: 'This is an example course.',
      credits: 3,
      enrollmentKey: 'enrollmentkey123',
      LIC: new mongoose.Types.ObjectId(), // Correct usage
      lecturers: [new mongoose.Types.ObjectId()], // Correct usage
      instructors: [new mongoose.Types.ObjectId()], // Correct usage
      students: [new mongoose.Types.ObjectId()], // Correct usage
    };
  
    const newCourse = new Course(courseData);
    const createdCourse = await newCourse.save();
  
    expect(createdCourse.courseCode).to.equal('CSC101');
    expect(createdCourse.faculty).to.equal('ComputerScience');
    expect(createdCourse.year).to.equal(2);
    expect(createdCourse.semester).to.equal(1);
  });
  
  // return error when enrollment key is missing
  it('should return an error when enrollment key is missing', async () => {
    const courseData = {
      faculty: 'ComputerScience',
      year: 2,
      semester: 1,
      courseName: 'Example Course',
      courseCode: 'CSC101',
      description: 'This is an example course.',
      credits: 3,
      LIC: new mongoose.Types.ObjectId(), // Correct usage
      lecturers: [new mongoose.Types.ObjectId()], // Correct usage
      instructors: [new mongoose.Types.ObjectId()], // Correct usage
      students: [new mongoose.Types.ObjectId()], // Correct usage
    };
  
    const newCourse = new Course(courseData);
    try {
      await newCourse.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property('enrollmentKey');
    }
  });

  // return error when faculty is Invalid
  it('should return an error when faculty is Invalid', async () => {
    const courseData = {
      year: 2,
      semester: 1,
      courseName: 'Example Course',
      courseCode: 'CSC101',
      description: 'This is an example course.',
      credits: 3,
      enrollmentKey: 'enrollmentkey123',
      LIC: new mongoose.Types.ObjectId(), // Correct usage
      lecturers: [new mongoose.Types.ObjectId()], // Correct usage
      instructors: [new mongoose.Types.ObjectId()], // Correct usage
      students: [new mongoose.Types.ObjectId()], // Correct usage
    };
  
    const newCourse = new Course(courseData);
    try {
      await newCourse.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property('faculty');
    }
  });
  //return error when year is Invalid
  it('should return an error when year is invalid', async () => {
    const courseData = {
      faculty: 'ComputerScience',
      semester: 1,
      courseName: 'Example Course',
      courseCode: 'CSC101',
      description: 'This is an example course.',
      credits: 3,
      enrollmentKey: 'enrollmentkey123',
      LIC: new mongoose.Types.ObjectId(), // Correct usage
      lecturers: [new mongoose.Types.ObjectId()], // Correct usage
      instructors: [new mongoose.Types.ObjectId()], // Correct usage
      students: [new mongoose.Types.ObjectId()], // Correct usage
    };
  
    const newCourse = new Course(courseData);
    try {
      await newCourse.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property('year');
    }
  });
  //return error when semester is Invalid
  it('should return an error when Duplicate values', async () => {
    const courseData = {
      faculty: 'ComputerScience',
      year: 2,
      courseName: 'Example Course',
      courseCode: 'CSC101',
      description: 'This is an example course.',
      credits: 3,
      enrollmentKey: 'enrollmentkey123',
      LIC: new mongoose.Types.ObjectId(), // Correct usage
      lecturers: [new mongoose.Types.ObjectId()], // Correct usage
      instructors: [new mongoose.Types.ObjectId()], // Correct usage
      students: [new mongoose.Types.ObjectId()], // Correct usage
    };
  
    const newCourse = new Course(courseData);
    try {
      await newCourse.save();
    } catch (error) {
      expect(error).to.exist;
      expect(error.errors).to.have.property('semester');
    }
  });

});