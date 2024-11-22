
# USER INFORMATION APPLICATION

## OVERVIEW

This application is designed to showcase user information in both a tabular and detailed format. The project consists of a **frontend** built with React and TypeScript, and a **backend** built with Node.js, TypeScript, and Express.

---

## HOW TO RUN THE APPLICATION

### Prerequisites
Ensure that you have the following installed on your system:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

### Backend (SERVER)
1. Navigate to the `SERVER` directory:
   ```bash
   cd SERVER
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```
4. The backend will run on [http://localhost:3000](http://localhost:3000).

### Frontend (UI)
1. Navigate to the `UI` directory:
   ```bash
   cd UI
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## APPLICATION STRUCTURE

### Frontend (UI)
The frontend is a **React** application that provides:
- A **list screen** to display users at the route `/users`.
- A **detail screen** to display detailed information for a specific user at the route `/users/:id`.

### Backend (SERVER)
The backend is a **Node.js** server that provides:
- **Endpoints** for:
  - Fetching all users (`GET /users`)
  - Fetching a specific user by ID (`GET /users/:id`)

---

## FEATURES 

### Frontend:
- **Dynamic Routing**: Routes for list and detail pages.
- **Loading Indicators**: Displayed while fetching data.
- **Error Handling**: Displays a "User Not Found" message for invalid user IDs.
- **Responsive Design**: A clean and attractive UI.

### Backend:
- **CORS Enabled**: Allows the frontend to communicate with the backend.
- **Static Data**: Reads user data from a provided JSON file.
