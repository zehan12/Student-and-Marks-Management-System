# Zithara Task

## Student and Marks Management System

#### This Node.js application manages student information and their marks in multiple subjects. It provides REST endpoints for retrieving student details with pagination

### support and fetching overall results.

### API Endpoint
`https://student-and-marks-api.onrender.com/`

### Tech Stack
* Node.js: The runtime environment for running JavaScript on the server-side.

* Express.js: A popular web application framework for Node.js used to build robust APIs.

* PostgreSQL: A powerful open-source relational database used to store student and marks data.

* Prisma: An ORM (Object-Relational Mapping) tool for Node.js and TypeScript, used to interact with the PostgreSQL database.

## Tables

##### Student Table

- Student_id
- student_name
- standard

##### Marks Table

- marks_id
- student_id (Foreign Key referencing Student Table)
- subject_name
- marks
- test_date

## REST Endpoints

#### 1. Get Students with Pagination

- Endpoint: /students
- Method: GET
- Parameters:
  `page (optional): Page number for pagination`
  `length (optional): default: 10, max 100`
  `query (optional): Filter students by id, name or standard`

##### Response:

- List of students with details
- Pagination details (total pages, current page, etc.)

`GET /students`

```json
{
  "students": [
    {
      "student_id": 1,
      "student_name": "Zehan Khan",
      "standard": "12th"
    },
    {
      "student_id": 2,
      "student_name": "Jane Smith",
      "standard": "10th"
    }
    // ... other student objects ...
  ],
  "pagination": {
    "totalStudents": 1000,
    "totalPages": 100,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

#### 2. Fetch Results

- Endpoint: /fetch_results
- Method: GET
- Parameters:
  ` student_id (optional): Fetch results for a specific student`

##### Response:

List of student results with the following format:

`GET /fetch_results?student_id=1`

```json
{
  "student_name": "Zehan Khan",
  "percentage": "85.25",
  "result": "Distinction"
}
```

##### The result is determined based on the percentage:

- &lt; 35: &quot;Fail&quot;
- 35 - 60: &quot;Second Class&quot;
- 60 - 85: &quot;First Class&quot;
- &gt; 85: &quot;Distinction&quot;

#### Author
- [@zehan12](https://www.github.com/zehan12)

