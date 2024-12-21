# Workout Timer Backend

This repository contains the backend system for a workout timer application. The backend is designed to manage workout routines, log timer events, and store user workout history. It provides a robust API for frontend integration and ensures data persistence and scalability.

## Features

- User authentication and management.
- CRUD operations for workout routines.
- Timer event logging.
- Workout history tracking.
- Scalable and reliable backend architecture.

---

## API Endpoints

### Endpoints Overview

- **POST** `/workoutsRoutine`

  ```json
  {
    "id": "",
    "name": "",
    "workoutid": ["workoutid"...],
    "userid": ""
  }
  ```

- **POST** `/workout`

  ```json
  {
  	"id": "",
  	"exerciseID": "",
  	"time": 000
  }
  ```

- **GET** `/workouts`

- **POST** `/exercise`

- **POST** `/signup`

- **POST** `/login`

- **GET** `/userinfo`

- **POST** `/history`

- **GET** `/history`

---

## Project Configuration

### Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework.
- **PostgreSQL**: Database for persistence.
- **TypeScript**: For type safety and maintainability.
- **JWT**: For user authentication and session management.
- **Docker** (optional): For containerized deployment.

### Project Setup

#### Prerequisites

- Node.js and npm installed.
- PostgreSQL database set up.
- TypeScript configured.

#### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/workout-timer-backend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the `.env` file with:

   - Database credentials (host, port, username, password, database name).
   - JWT secret key.
   - Other environment variables as needed.

4. Compile TypeScript:

   ```bash
   npm run build
   ```

5. Run database migrations:

   ```bash
   npm run migrate
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Build and run in production:
   ```bash
   npm run start
   ```

---

## Future Enhancements

- Add support for real-time timer synchronization using WebSockets.
- Integrate push notifications for reminders and updates.
- Add advanced analytics for workout performance.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any inquiries or issues, feel free to open an issue or contact the maintainer at [your-email@example.com].
