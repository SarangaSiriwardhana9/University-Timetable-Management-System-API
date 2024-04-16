[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MhkFIDKy)

## IT21166792-Siriwardhana E.A.L.S 

# University Timetable Management System API


This project is a RESTful API for managing a university's timetable system  for the 3rd year 2nd semester Application Framework module , focusing on the backend implementation. It allows users to sign up, sign in, manage courses, enroll in courses, manage timetables, and receive notifications about timetable changes and announcements. The API is built using Express.js (Node.js) and MongoDB, with authentication using JWT.

## Setup

To set up the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/sliitcsse/assignment-01-SarangaSiriwardhana9.git

2. Install dependencies:
   
   ```bash
    cd server
    npm install
   ```
   
3. Environment Variables
    - Create a `.env` file in the root directory of the project and add the following variables with your details:
      
    ```bash
      MONGO_DB_URL='your_mongodb_url_here'
      JWT_SECRET='your_jwt_secret_here'
      ```
   
4. Start the server:

    ```
    npm start
      
## Setup

1. To run the tests, use the following command:
     ```bash
   npm test

## User Roles and Authentication

- Students, lecturers, and instructors can sign up with their details, providing their university ID.
- The system identifies the role (lecturer, instructor, admin) and faculty based on the university ID.
- After successful signup, users can sign in and set their year and semester. They can also update their profile.
- JWT is used for authentication, with middleware for access control from each role.

## Course Management

- Admins can create, update, and delete courses.
- Admins can assign lecturers and instructors to courses and remove them.
- Admins provide an enrollment key for students to enroll in courses.
- Students can enroll in courses using the enrollment key.
- Users can search for courses by name, faculty, year, and semester.
- Signed-in students can see both enrolled and unenrolled courses belonging to their faculty, semester, and year.
- Lecturers and instructors can see their assigned courses.
- Admins and lecturers can see enrolled students for courses and manage them.

## Room and Resource Booking
- Admins can add, update, and delete classrooms.
- Admins can add, update, and delete resources.

## Timetable Management

- Admins can create weekly timetable slots for each faculty, year, and semester.
- Admins can assign classrooms and resources to timetable slots without overlapping.
- Admins can update and delete timetable slots.

## Notifications and Alerts

- When updating timetable slots, affected users are notified based on faculty, year, and semester.
- Admins and lecturers can create custom messages to notify students.

## Testing

- The API has been tested using Mocha with Chai for integration and unit tests. Performance testing has also been performed using Postman.

## API Documentation

View the API documentation [here](https://documenter.getpostman.com/view/26798436/2sA35Bc4Yk).
