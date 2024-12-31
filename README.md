# todo-express-mail-auth

This is a Node.js application with Prisma for email authentication, using Docker and Docker Compose for easy development setup.

## Prerequisites

- Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-express-mail-auth.git
cd todo-express-mail-auth
```

### 2. Install dependencies

Make sure you have Docker and Docker Compose installed, then build and start the containers:

```bash
docker-compose up
```

### 3. Prisma Migration

Run the Prisma migration to set up the database:

```bash
npx prisma migrate dev --name init

npx prisma generate

npm run dev
```

### 4. Access the app

Once the containers are up, the application will be available at:

http://localhost:4000

### 5. Environment Variables

The application uses the following environment variables:

- `DATABASE_URL`: The database connection string (Prisma will use SQLite in development).
- `EMAIL_SERVER_HOST`: SMTP server host for sending emails.
- `EMAIL_SERVER_PORT`: SMTP server port.
- `EMAIL_SERVER_USER`: SMTP server username.
- `EMAIL_SERVER_PASSWORD`: SMTP server password.
- `EMAIL_FROM`: The "From" email address used in the emails.
