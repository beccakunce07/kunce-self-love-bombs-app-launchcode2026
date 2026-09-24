# Self Love Bombs - Backend API 

## Description
We at **Self Love Bombs** feel confident there is enough hate to go around. But love? We could always use more. SelfLoveBombs was developed to help spread the love. The kicker, tho? For this app, it's to yourself. The medicine is self-love and **Self Love Bombs** is here to be the bridge for you to reach it. With just clicks of a button you can turn your self-doubt into self-confidence right from your phone. Simply click a few buttons, and we will provide you with a love bomb of personalized inspiration! With features that allow you to create a user, save your personalized love bombs and daily check ins, and more, this app gets to know you and will become your personal bestie by cheering you on from your phone, tablet, or computer! Are you ready to start falling for yourself? Let's go! Bombs Away! Note: This is the backend server for the **Self Love Bombs** application, built as the culminating project for LaunchCode. It acts as a RESTful API that handles user data, tracks app logic, and securely interfaces with the database to serve content directly to the frontend user.

---

## Technologies Used
* **Java** - Core programming language.
* **Spring Boot** - Backend framework for building REST APIs.
* **Apache Maven** - Dependency management and project build automation.
* **MySQL / PostgreSQL** - unit-2-love-bombs-BK Database management system.
* **Spring Data JPA / Hibernate** - Object-Relational Mapping (ORM) for data management.

---

## Installation & Local Setup

To run this backend application locally on your machine, follow these execution steps:

### Prerequisites
* Ensure you have **Java Development Kit (JDK) 17 or higher** installed.
* Ensure you have **Maven** installed (or use the included Maven Wrapper `mvnw`).

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/beccakunce07/kunce-self-love-bombs-app-launchcode2026.git
   ```
2. **Navigate into the project directory:**
   ```bash
   cd kunce-self-love-bombs-app-launchcode2026
   ```
3. **Configure Environment Variables / Database Connection:**
   Open the file located at `src/main/resources/application.properties` (or `application.yml`) and update your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/unit-2-love-bombs-BK
   spring.datasource.username=root
   spring.datasource.password=IAMROOT369!!
   ```
4. **Build the application:**
   ```bash
   ./mvnw clean install
   ```
5. **Run the local server:**
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend server should now be running locally, typically on `http://localhost:8080`.*

---

## Design & Planning
* [Link to Wireframes](https://www.figma.com/design/NS60Bp3kK2gs6VdhLHFBlB/Self-Love-Bombs?node-id=0-1&p=f&t=wJWuuJC1ej6znSM0-0) - Visual layout and user interface sketches.
* [Link to Entity Relationship Diagram (ERD)](https://lucid.app/lucidchart/ea902adf-3fdf-49f6-a315-8b756852f30a/edit?invitationId=inv_9a016327-cc04-45c7-864a-c71bd60b3d99) - Visual structural model of the database tables and relations.

---

## Future Features & Unsolved Problems
* **Database Migration Setup:** Completing full integration of relational tables for persistent tracking.
* **User Authentication:** Implementing Spring Security with JWT tokens for secure user sign-in and session handling.
* **Database Expansion** Adding storing opportunities for the pet love bombs as well as Feelings Wheel integration in Check In (see front end README).

