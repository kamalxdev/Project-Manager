# Project Manager

## Overview

This project is a simple task management application that demonstrates full-stack development skills using **Node.js**, **Fastify**, **React**, **Next.js**, **PostgreSQL**, **Drizzle**, **TypeScript**, and **Docker**.

### Objective

The application allows users to:

- View a list of tasks.
- Add new tasks with a title and description.
- Update the status of tasks (mark them as completed).
- See real-time updates when tasks are created or updated by other users using WebSockets.

The backend is built using Fastify and PostgreSQL with Drizzle ORM. The frontend is built with Next.js, and the whole application is containerized using Docker.

---

## Setup Instructions

Follow the steps below to run the application locally.

### Prerequisites

- **Docker**: Make sure Docker and Docker Compose are installed on your machine.
- **Node.js**: Make sure Node.js is installed if you want to run the app locally without Docker.

### Steps to Run the Project Locally

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Build and start the containers:**

   ```bash
   docker-compose up --build
   ```

3. **Access the Application:**
   - _Frontend_ : http://localhost:3000
   - _Backend_ : http://localhost:8080

### API Documentation

### Authentication

_POST_ `/api/auth/login`

- Request
  ```bash
  {
  "email": "user@example.com",
  "password": "userpassword"
  }
  ```
- Response
  ```bash
  user logged in
  ```

### User

_GET_ `/api/user`

- Response
  ```bash
  {
    "name":"Kamal Singh",
    "email":"kamal@example.com"
  }
  ```

### Task Management

_GET_ `/api/task`

- Response

  ```bash
  [
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description of Task 1",
    "status": "PENDING",
    "completedAt":"date",
    "createdAt":"date"
  },
  {
    "id": 2,
    "title": "Task 2",
    "description": "Description of Task 2",
    "status": "COMPLETED",
    "completedAt":"date",
    "createdAt":"date"
  }
  ]
  ```

_POST_ `/api/task`

- Request
  ```bash
  {
    "id": 1,
    "title": "Task 1",
    "description": "Description of Task 1",
    "status": "PENDING",
    "completedAt":"date",
    "createdAt":"date"
  }
  ```
- Response

  ```bash
  {
    "success": "Task Created Successfully",
  "id": 1
  }
  ```

_PUT_ `/api/task/:id`

- Response

  ```bash
    Task Updated Successfully
  ```

### Testing

## Unit testing

```bash
    cd backend
    npm run test
```

## Integration testing

```bash
    chmod 700 ./scripts/integation.sh
    ./scripts/integation.sh
```
