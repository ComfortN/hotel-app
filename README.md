# Hotel App

## Overview
The LuxeStay Hotel App is a comprehensive solution for managing hotel accommodations. It features user authentication, accommodation listings, booking functionality, user profiles, an admin panel, and more. The app utilizes Firebase for backend services and Redux for state management.

## Features

### User Authentication
- **Register and Login**: Users can register and log in using Firebase Authentication.

### Accommodation Listings
- **View Accommodations**: Users can view available accommodations.
- **Accommodation Details**:
  - **Photo Gallery**: View images of the hotel.
  - **Map**: See the location of the hotel.
  - **Price Details**: View cost per night and other pricing information.
  - **Basic Information**: Address, star rating, and other relevant details.
  - **Hotel Facilities & Policies**: Amenities offered and policies.
  - **Call-to-Action Button**: Book or view more details.
  - **Sharing Button**: Share accommodation details.
  - **Favourites Button**: Save accommodations to favourites.

### Booking Functionality
- **Booking Process**:
  - Select check-in and check-out dates.
  - Specify number of rooms and guests.
  - Enter Customer Details
- **Payment Integration**: Supports payments through Stripe gateway.

### User Profile
- **Profile Management**: View and edit user profile details.
- **Booking History**: View past bookings.
- **Favourites**: Manage favourite accommodations.
- **Reviews**: Manage reviews.


### Data Storage
- **Backend**: Firebase Firestore/Real-time for storing accommodation listings, user data, booking information, etc.

### State Management
- **Redux**: Manage application state.


### Scalability & Performance
- **Scalability**: Designed to handle a large number of users and accommodations.
- **Performance**: Optimized for a smooth user experience.


### Responsive Design
- The app is responsive and optimized for different devices and screen sizes.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ComfortN/hotel-app.git
    cd hotel-app
   ```

2. Install dependencies:

    ```
        npm install
    ```

3. Start the app:

    ```
        npm start
    ```

### Backend

1. Navigate to the backend directory:

```
    cd backend
```

2. Install backend dependencies:

```
    npm install
```

4. Start the backend server:

```
    node server.js
```

The server will run on `http://localhost:8888` by default.

## Technologies Used

* Frontend: React, Redux, React-icons
* Backend: Express.js, Node.js
* Database: Firebase Firestore, Firebase Authentication
* Payments: (Stripe)
* State Management: Redux
* Routing: React Router
* Email Testing: Mailtrap


## API Endpoints

- POST `/api/send-email`: Sends a booking confirmation email


## UI/UX Designs

### The design
    https://www.figma.com/design/GFn9GO5osA3TM5GKs4AI46/Hotel-App-design?node-id=0-1&t=a3T6iQDkoXlE4z4T-1

### The Wireframe
    https://www.figma.com/design/dFWzTddo2tl9GPcwLjjocx/HOTEL-WIREFRAME?node-id=6-160&t=JQe4KXP4wCIrwmx8-1

### The flows
    https://www.figma.com/board/DkIeaYJeuqm2ki4n21JY6u/Hotel-App-Flows?node-id=0-1&t=2X5moy4eXfqRHd1c-1 (edited)
