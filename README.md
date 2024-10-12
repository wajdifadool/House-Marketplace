# Simple House Marketplace - React - Firebase


 **House Marketplace**, a Mobile First UI platform where users can list homes or apartments for rent or sale. This project utilizes Firebase for the backend, including database, authentication, and file storage. Users can register, list properties, and add special offers, with a mobile-first design that also works seamlessly on desktops.

## Features

- **User Authentication**: Sign up with email and password or via Google OAuth. Users can manage their profiles and listings.
- **Property Listings**: Users can list properties for sale or rent with up to six images and detailed descriptions. Special offers are supported.
- **Image Upload**: Firebase storage is used to handle image uploads for listings.
- **Responsive Design**: A mobile-first design ensures the app looks great on any device.
- **Explore Page**: Displays the latest listings, with sections for rent and sale, and a slider showcasing the most recent listings.
- **Offers Page**: Lists properties that have special discounted prices.
- **User Profile Management**: Users can update their profile details and manage their listings, including editing or deleting them.

## Demo

> Demo Gif
> 
![ezgif-4-2cc196210b-1](https://github.com/user-attachments/assets/03b9674f-bf07-4aa8-98d9-8f0b8d18e0f7)



- **Explore**: View a slider of the latest listings, browse properties for rent or sale, and see special offers.
- **Listings**: Each property has a detailed page with a slider of images, property information, 
- **Special Offers**: Listings with special discounts are highlighted on the offers page.
- **Authentication**: Sign up with email/password or Google OAuth, manage profile information, and create or edit listings.
- **Add Listings**: Users can add properties with details like bedrooms, bathrooms, parking, and furnished status. Images can be uploaded, and special offers can be applied.
- **Geolocation**: Each property is displayed on a map using **Leaflet** and Google Geocoding.

## Technologies Stack

- **React**: Front-end framework for building the user interface.
- **Firebase**: 
  - **Firebase Authentication**: For user sign-up and login using email/password and Google OAuth.
  - **Firestore**: NoSQL database to store listing data.
  - **Firebase Storage**: For storing listing images.
- **React Router**: For client-side routing between pages.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/house-marketplace.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure Firebase:
    - Set up a Firebase project and get your configuration credentials.
    - Add a `.env` file in the root directory with the following variables:

      ```bash
      REACT_APP_FIREBASE_API_KEY=your-api-key
      REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
      ```

4. Run the app:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Available Scripts

In the project directory, you can run:
- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.


## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
