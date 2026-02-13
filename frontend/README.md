# JobTracker

Built this to keep track of job applications in one place. Status, interview rounds, follow-up dates, salary range. The usual spreadsheet approach gets messy fast, especially when you're applying to multiple companies at the same time.

Also used it as an excuse to work with Angular 17 and MongoDB properly outside of work. At my day job I mostly work with Cassandra and Couchbase, so this was a good chance to get hands-on with document modeling.

## Stack

**Backend:** Java 17, Spring Boot 3.x, Spring Security 6, JWT, MongoDB  
**Frontend:** Angular 17, Angular Material, NgRx, TypeScript  
**Infrastructure:** Docker, GitHub Actions, AWS EC2, S3

## Features

- JWT based auth, register and login
- Add, edit and delete job applications
- Track status per application: Applied, Screening, Interview, Offer, Rejected
- Filter applications by status
- Dashboard showing a breakdown of where you stand

## Running locally

You need Java 17, Node.js 20 and Docker installed.
```bash
git clone https://github.com/Vamshikrishna1226/job-tracker.git
cd job-tracker

# start MongoDB
docker run -d -p 27017:27017 --name mongo mongo:7.0

# run backend
cd backend
mvn spring-boot:run

# run frontend (open a new terminal)
cd frontend
npm install
ng serve
```

Frontend at `http://localhost:4200`, API at `http://localhost:8080`

## API

| Method | Endpoint | What it does |
|--------|----------|--------------|
| POST | /api/auth/register | create account |
| POST | /api/auth/login | login, returns JWT |
| GET | /api/applications | get all applications |
| POST | /api/applications | add a new one |
| PUT | /api/applications/:id | update status or details |
| DELETE | /api/applications/:id | remove it |
| GET | /api/applications/stats | counts by status |

## Why MongoDB

I use Cassandra and Couchbase at work. Job applications have a lot of optional, variable fields. Some have salary info, some don't. Some have follow-up dates, some don't. The document model fits this better than a rigid schema. Wanted to see that difference firsthand rather than just read about it.