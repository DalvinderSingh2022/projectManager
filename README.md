# Project Manager

PRojectmanager is a full-stack web application for managing projects, built using the MERN stack (MongoDB, Express.js, React, Node.js) with authentication implemented via JSON Web Tokens (JWT)
[live demo](https://taskmanagerds.netlify.app/)

## Features

- Create, edit, and delete projects
- Set due dates for projects
- Organize tasks into categories(status)
- Mark tasks as completed
- Search and filter projects
- User-friendly and intuitive interface
- Assign projects to other users

## Usage

1. Create an account or log in if you already have one.
2. Add tasks by using the "Create Task" section on the dashboard.
3. Edit or delete projects by clicking the task.
4. Use the filters and search functionality to find specific tasks.
5. Mark tasks as completed when you finish them.
6. Add comments to tasks to give suggestions or to communicate with other users.
7. Your all data is saved using [MongoDB](https://www.mongodb.com/).

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Dashboard

- Users will be able to create new tasks with a title, description, and due date and then can assign it to another user.
- Users will be able to update and delete tasks.
- List view for all user tasks is available on the dashboard.
- Users can also have an eye on its tasks in numbers.
  ![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/ee928ffa-e30d-4e50-92f4-ecb3d41e84e4)

### Tasks page

- The tasks page will give users the power to view the tasks of all users.
- The task card displays the title, detail and some tags as the status of tasks and several comments.
- The user can filter tasks based on their completion status.
- The user can delete (if it's assigned by the user) or edit (if it's assigned by or to to user) tasks.
  ![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/c35a7190-5645-47a0-ba86-7fcdb7fe10ed)

### Users page

- Users can view the profiles of all other users on the platform.
- It gives us the ability to find a perfect user to assign the task
- The user card shows several tasks the user has been involved in.
  ![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/5c141585-179c-4c13-b082-b48a0da433b6)

## Edit task

- User can add comments to help others or to ask a query
- this page shows different UI according to the involvement of the user in that particular task.
- i.e. if a user is not involved in a task (neither assigned by nor assigned to) then the user only can comment.
- if the task is assigned to the user then the user can change the status of the task and comments also.
- if the task is assigned by the user then the user can also delete the task.

-- Not involved
![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/a47d6147-0760-47cc-a67f-83892dc47657)

-- Assigned by user
![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/65780154-be83-4bcd-a83d-8d8eebd25384)

-- Assigned to user
![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/dcb7e1a9-0e81-4182-91ca-a8081234c9b4)

### login/register

- register using email, and password give yourself a name and avatar.
- Users can log in easily using email and password.
- and there is functionality for resetting passwords in case the user forgets the password.
- Users can log out at any time by clicking the button at the sidebar.

- Register
  ![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/4ef3c47c-93c5-480d-ab06-baefe548ac0a)

- Login
  ![image](https://github.com/DalvinderSingh2022/taskManager/assets/110463060/09a7386c-7432-40a0-8e7c-d987fcd0e0a8)


## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node package manager)
- MongoDB

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/DalvinderSingh2022/projectManager.git
   cd Projectmanager
   ```

2. Install backend dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following:

   ```env
   CONNECTION_STRING=your_mongoDB_connection_string
   ACCESS_TOKEN=your_jwt_secret
   ```

4. Start the backend server:

   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```sh
   cd ./frontend
   ```

2. Install frontend dependencies:

   ```sh
   npm install
   ```

3. Start the frontend development server:

   ```sh
   npm start
   ```

The application should now be running at `http://localhost:3000`.

## Technologies Used

- **MongoDB**: Database
- **Express.js**: Backend framework
- **React**: Frontend library
- **Node.js**: Backend runtime
- **JWT (JSON Web Tokens)**: Authentication
