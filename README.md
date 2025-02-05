# Restaurant Management Website 🍽️

## Description

Welcome to **FoodMAN Restaurant SPA**! This is a single-page web application (SPA) that allows users to log in, add food items, view the details of food items added by other users, update their own items, and manage their orders. Users can also delete their own orders but cannot buy their own food items.

This project uses **Express** for the backend and **ReactJS** for the frontend. It is designed to provide a smooth user experience and a modern interface with real-time interaction.

### Live Demo

Visit the live website: [FoodMAN Restaurant SPA](https://comfy-travesseiro-549a4f.netlify.app)

---

### Technologies Used

- **Frontend:** React.js, Tailwind CSS, Firebase Authentication
- **Backend:** Node.js, Express.js, MongoDB (with environment variables for security)
- **Authentication:** Firebase Auth, JWT (JSON Web Token)
- **Deployment:** Netlify (Frontend), Vercel/Render (Backend)

## Features

- **User Authentication:** Email/password & Google/GitHub login (Firebase Authentication)
- **Food Management:** Users can add, update, and delete food items (private route)
- **Purchase System:** Users can buy food, with real-time quantity validation
- **Order Management:** Users can view and delete their orders
- **Search Functionality:** Search food items dynamically
- **Image Gallery:** Clickable lightbox gallery with static images
- **JWT Authentication:** Secure access to private routes
- **Theme Customization:** Dark and light mode toggle
- **Responsive Design:** Optimized for mobile, tablet, and desktop

## Dependencies Used

- **axios**: To make HTTP requests to the backend.
- **firebase**: For user authentication and storing user data.
- **lottie-react**: For adding animations.
- **moment**: For formatting and displaying dates and times.
- **react**: Core JavaScript library for building user interfaces.
- **react-dom**: For rendering React components into the DOM.
- **react-helmet-async**: For managing the document head (e.g., titles and meta tags) dynamically.
- **react-icons**: To use icons in the user interface.
- **react-router**: For navigation and routing.
- **react-router-dom**: For handling routing in a web environment.
- **sweetalert2**: For displaying elegant and interactive alerts.
- **swiper**: For creating swiping galleries and sliders.
- **yet-another-react-lightbox**: For displaying images in a lightbox.

---

## Setup & Installation

### Prerequisites

- Node.js installed
- MongoDB configured

### Steps to Run the Project Locally

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/dmsumon2020/foodman.git
   cd restaurant-management
   ```

2. **Set Up Environment Variables:**

   - Create a `.env` file in both `client` and `server` directories
   - Add Firebase API keys and MongoDB URI

3. **Install Dependencies:**

   ```bash
   cd client && npm install  # Install frontend dependencies
   cd ../server && npm install  # Install backend dependencies
   ```

4. **Run the Development Server:**

   ```bash
   cd server && npm start  # Starts backend server
   cd client && npm run dev  # Starts frontend
   ```

5. **Access the Application:**
   - Open `http://localhost:5173` in your browser for frontend
   - Backend runs on `http://localhost:5000`

## Screenshots

_(Add relevant screenshots here to showcase the project visually)_

## Live Links & Resources

- **Live Site:** [Link](https://comfy-travesseiro-549a4f.netlify.app)
- **Frontend Repo:** [GitHub](https://github.com/dmsumon2020/foodman)
- **Backend Repo:** [GitHub](https://github.com/programming-hero-web-course2/b10a11-server-side-dmsumon2020)

---

For any queries, feel free to reach out! 🚀
