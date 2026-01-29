# lendsqr-fe-test

## This project is a frontend assessment for **Lendsqr**. The assessment is designed to evaluate intermediate and senior frontend engineers on **React, TypeScript, and SCSS**.

## Table of Contents

- [Assessment Requirements](#assessment-requirements)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Project Structure](#project-structure)
- [Features](#features)
- [Mock JSON](#mock-JSON)
- [Testing](#testing)
- [Deployment](#deployment)
- [Submission](#submission)
- [Author Notes](#author-notes)

---

## Assessment Requirements

Build the following pages based on the [Figma Design](https://www.figma.com/file/ZKILoCoIoy1IESdBpq3GNC/FrontendTesting?node-id=5530%3A0):

1. **Login Page**
2. **Dashboard Page**
3. **User Page**
4. **User Details Page**

**Specific Requirements:**

- User pages must pull data from a **mock API with 500 records**.
- Store and retrieve user details using **Local Storage**.
- Fully **mobile responsive** across all screen sizes.
- Follow best practices in **TypeScript, React, and SCSS**.
- Pay attention to **details not explicitly specified** in the instructions.

---

## Tech Stack

- **Frontend Framework:** React ( Next.js)
- **Language:** TypeScript (mandatory)
- **Styling:** SCSS (Sass)
- **Mock API:** json-generator.com
- **State Management:** React Query / localStorage
- **Testing:** Vitest / React Testing Library

---

## Setup & Installation

```bash
# Clone the repo
git clone https://github.com/cynthia-abah/lendsqr-fe-test.git

# Navigate to project
cd lendsqr-fe-test

# Install dependencies
npm install

# Start development server
npm run dev
```

The app should now be available at `http://localhost:3000`.

---

```
login details for testing the app

Email: example@gmail.com
Password: 12345678

```

## Project Structure

<!-- app router next js structure  -->

---

## Features

- **Responsive Design:** Mobile-first, adapts to all screen sizes
- **User Management:** Display user list with filters and search
- **User Details:** Detailed user info stored in local storage
- **Tabs & Modals:** Using HeadlessUI for accessibility
- **Mock Data:** 500 user records with realistic data
- **Visual Fidelity:** Pixel-perfect match to Figma design

---

## Mock API

- Data is fetched from data mocked using **JSON Generator**.
- Example user object:

```json
{
  "_id": "69750c5ac3a39646f401e526",
  "organization": "Lendsqr",
  "username": "Mcknight Horne",
  "email": "mcknighthorne@farmage.com",
  "phone": "+234 7885695818",
  "date_joined": "2022-09-23T09:06:28-01:00",
  "status": "Active",
  "tier": 3,
  "account_balance": "₦485,412.60",
  "bank_details": "8890751426/Miraclis Bank",
  "personal_information": { ... },
  "education_and_employment": { ... },
  "socials": { ... },
  "guarantors": [ ... ]
}
```

---

## Testing

- Positive and negative scenario testing implemented using **Vitest** and **React Testing Library**.
- Test cases cover:
  - Rendering components
  - API fetches and error handling
  - Local storage persistence
  - Conditional rendering

---

## Deployment

The app is deployed on vercel:

```
https://cynthia-abah-lendsqr-fe-test-rose.vercel.app

```

---

## Submission

- Public GitHub repo named `lendsqr-fe-test`.
- README documentation (this file).
- Optional Loom video review (max 3 minutes) comparing Figma vs implementation.

---
