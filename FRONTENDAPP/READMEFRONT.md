# ⚛Self-Love Bombs App - Frontend

Welcome to the frontend of the **Self-Love Bombs App**! This user interface is built as a modern Single Page Application (SPA) powered by **React** and built using **Vite** for a fast and optimized developer experience.

---

## Tech Stack

* **Framework:** React
* **Build Tool:** Vite
* **Runtime Environment:** Node.js
* **Package Manager:** npm (Node Package Manager)

---

## Getting Started

To get your frontend development server up and running locally, follow these steps:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your computer.

### 2. Navigate to the Frontend Directory
Open your terminal and navigate to the directory where your frontend package configuration file resides:
```bash
cd FRONTENDAPP
```

### 3. Install Dependencies
Run the installation command to fetch all required React and Vite packages:
```bash
npm install
```

### 4. Launch the Development Server
Start the Vite local development instance:
```bash
npm run dev
```
Once initialized, open [http://localhost:5173] in your web browser to view and interact with the application live.

Start by creating a user and saving it to the database then continue to move through the app.

---

## Available Scripts

You can execute the following core scripts within your frontend directory:

* **`npm run dev`**: Starts the lightning-fast Vite dev server with Hot Module Replacement (HMR). Code updates instantly reflect in the browser.
* **`npm run build`**: Bundles, tree-shakes, and minifies your React application into the production-ready `/dist` directory.
* **`npm run preview`**: Boots up a local server to test and preview the production build generated inside the `/dist` folder.

---

## Backend Integration

This frontend environment is designed to interface with the **Java / Maven backend** located in the root directory of this repository.
* **API Calls:** Ensure your backend server is active (typically running at `http://localhost:8080`) when trying to fetch data or process requests from this React interface.

## Future Features & Unsolved Problems
* **Polishing CSS and Display** I would like to create a more consistent, cohesive, and polished UI.
* **Check In Using Feelings wheel** A goal would be to superimpose a map of buttons onto an emotions wheel which would replace the check in buttons
* **Create Picture Submissions** Allow users to upload pictures to correspond with their check-ins, love bombs, and user