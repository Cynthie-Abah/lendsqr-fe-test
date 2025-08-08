# LENDSQR FRONTEND DEVELOPMENT ASSESSMENT TEST

This repository contains the completed frontend assessment for the **Lendsqr Engineering role**.  
The task involved building four pages using **React**, **TypeScript**, and **SCSS**, based on a provided UI design.  
The goal was to evaluate frontend development skills, code quality, and adherence to design specifications.

---

## Personal Note

This was the **first React project** I built after learning the basics — just `useState` and `useEffect`.  
I’ve chosen to keep it in my portfolio because it shows **how far I’ve come**. This project reflects my **early learning stage**, and I’m proud of the growth since then.

---

## Pages Implemented

### Login Page

- **Open Login:** You can log in using **any email and password combination**, since the mock API used for authentication is no longer active.
- This setup is useful for testing or showcasing the application without restrictions.

> **Note:** Authentication is currently disabled. Credential validation will be restored once a new API is integrated.

### Dashboard Page
- Displays an overview dashboard showing insights from 500 user records fetched from a mock API.

### 👥 User Page
- Shows a list of users.
- Uses [Mocky.io](https://mocky.io) and a JSON generator to simulate an API with 500 mock user records.

### User Details Page
- Displays detailed information about a selected user.
- Uses **localStorage** to persist and retrieve user data.

---

## Tech Stack

- **React** – For building the user interface  
- **TypeScript** – For type safety and improved developer experience  
- **SCSS** – For writing modular and maintainable styles

---

## Installation

To run the application locally:

```bash
# 1. Clone the repository
git clone <repository-url>

# 2. Navigate into the project directory
cd lendsqr-fe-test

# 3. Install dependencies
npm install

# 4. Start the development server
npm start


📁 Folder Structure
pgsql
Copy
Edit
src/
├── assets/
│   ├── image 4.png
│   ├── lendsqr.png
│   ├── pablo-sign-in 1.png
│   ├── react.svg
│   └── Union.svg
│
├── Styles/
│   ├── BaseLayout.scss
│   ├── Dashboard.scss
│   ├── Login.scss
│   └── UserDetails.scss
│
├── templates/
│   ├── BaseLayout.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   ├── MainPage.tsx
│   ├── NotFound.tsx
│   └── UserDetails.tsx
│
├── App.tsx         # Handles routing
├── main.tsx
└── vite-env.d.ts

  

REPOSITORY STRUCTURE 


The repository follows best practices for maintaining a clean and well-documented codebase. The commit history and messages provide clear insights into the development process and the reasoning behind specific changes. This README file provides detailed instructions for setting up the project and running the application. 

 # lendsqr-fe-test
# lendsqr-fe-test
