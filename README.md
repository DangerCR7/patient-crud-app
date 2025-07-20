# Patient CRUD App

A user-friendly, open source web application for managing patient records with full CRUD (Create, Read, Update, Delete) operations. Designed for healthcare professionals, clinics, and developers, this app makes it easy to add, view, update, and delete patient information.

---

## Features

- Add new patient records
- View a list of all patients
- Update existing patient details
- Delete patient records securely
- Responsive and intuitive Next.js frontend

---

## Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/) (React) with global CSS
- **Backend:** [Java Spring Boot](https://spring.io/projects/spring-boot)
- **Database:** [H2 Database (in-memory)](https://www.h2database.com/)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for the frontend)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Java 17+](https://adoptopenjdk.net/) (for Spring Boot)
- [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) (for backend)

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/DangerCR7/patient-crud-app.git
cd patient-crud-app
```

#### 2. Backend Setup (Spring Boot)

- Go to the backend directory (e.g., `cd backend` or the subfolder containing the Spring Boot app).
- Build and run the Spring Boot app:

```bash
# If using Maven
./mvnw spring-boot:run

# Or with Gradle
./gradlew bootRun
```

- The backend server will start on [http://localhost:8080](http://localhost:8080) by default.
- The H2 console is available at [http://localhost:8080/h2-console](http://localhost:8080/h2-console)  
  (JDBC URL: `jdbc:h2:mem:testdb`)

#### 3. Frontend Setup (Next.js)

- In another terminal, go to the frontend directory (e.g., `cd frontend`).
- Install dependencies:

```bash
npm install
```
or
```bash
yarn install
```

- Start the frontend:

```bash
npm run dev
```
or
```bash
yarn dev
```

- Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Create Patient:** Fill out the form to add a new patient.
- **View Patients:** See a list of all registered patients.
- **Edit Patient:** Update patient details by clicking the edit option.
- **Delete Patient:** Remove a patient record with a single click.

---

## Database

- H2 is used as an in-memory database (data resets on server restart).
- Access the H2 console at [http://localhost:8080/h2-console](http://localhost:8080/h2-console).
    - JDBC URL: `jdbc:h2:mem:testdb`
    - User: `sa`
    - Password: (leave blank unless specified in your `application.properties`)

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contact

For questions or support, please open an issue in this repository.
