---

# AuthServer Backend

A robust Spring Boot authentication server with JWT-based authentication, role-based & multi-role access control, and REST API endpoints for login/signup.

---

## Features

* User signup and login APIs (JSON based)
* JWT token generation with access & refresh tokens
* Role-based and multi-role authorization support
* Password hashing with BCrypt
* Stateless, sessionless authentication using JWT
* Secure password validation and token validation
* Swagger API docs support
* Spring Security integration

---

## Tech Stack

* Java 17+ with Spring Boot 3.x
* Spring Security
* JWT (jjwt library)
* Hibernate Validator (for DTO validation)
* BCrypt password encoder
* Maven build tool

---

## Getting Started

### Prerequisites

* JDK 17+
* Maven 3+
* Database (MySQL / configured in `application.yml`)

---

### Setup and Run

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/AuthServer.git
   cd AuthServer
   ```

2. Configure application properties (`src/main/resources/application.yml`):

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/authdb
   spring.datasource.username=root
   spring.datasource.password=your_password

   jwt.secret-key=YourSuperSecretKeyThatIsAtLeast256BitsLong
   jwt.token-expiration=86400000
   jwt.refresh-token-expiration=604800000
   ```

3. Build the project:

   ```bash
   mvn clean install
   ```

4. Run the application:

   ```bash
   mvn spring-boot:run
   ```

5. Server will start at `http://localhost:8080`

---

## API Endpoints

| Method | URL                    | Description                | Authentication          |
| ------ | ---------------------- | -------------------------- | ----------------------- |
| POST   | `/api/v1/auth/signup`  | User registration          | No                      |
| POST   | `/api/v1/auth/login`   | User login, returns JWT    | No                      |
| POST   | `/api/v1/auth/refresh` | Refresh access token       | Refresh Token required  |
| GET    | `/api/v1/users/me`     | Get logged-in user details | JWT Access Token needed |

> For secured APIs, include header:
> `Authorization: Bearer <JWT_ACCESS_TOKEN>`

---

## Role-Based Access Control

* Roles assigned to users (e.g., `ROLE_USER`, `ROLE_ADMIN`)
* API access restricted based on roles via Spring Security annotations (`@PreAuthorize`)
* Multi-role support enabled

---

## Next Steps (Frontend)

* Develop React frontend for:

  * User signup and login forms
  * Storing JWT tokens securely (e.g., HttpOnly cookies or localStorage with caution)
  * Role-based UI rendering (e.g., admin panel)
  * Refresh token logic integration
  * Secure API calls with Authorization headers

---

## Notes

* Passwords are hashed with BCrypt
* JWT secret key must be strong and kept safe (use environment variables in production)
* This project is backend only, frontend is planned separately
* Use HTTPS in production to secure tokens in transit

---

## Contribution

Contributions and suggestions are welcome! Feel free to open issues or pull requests.

---

## License

MIT License © Mohammad Sharukh
