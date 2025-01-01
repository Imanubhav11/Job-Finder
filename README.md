# JobFinder Portal

The **JobFinder Portal** is a comprehensive platform that connects job seekers with recruiters, providing an easy and effective way to find and post job opportunities. This application is built with modern web technologies and offers a seamless user experience for both job seekers and recruiters.

## Usage

### Job Seeker Login
- **Email:** rohankumar65@gmail.com
- **Password:** Hirohan12

### Recruiter Login
- **Email:** robin12@gmail.com
- **Password:** robin12

Once logged in, you can explore the features available for your role.

## Features

### For Job Seekers:
- Browse the latest and top job openings.
- Search and filter job listings based on preferences.
- Apply for jobs directly from the portal.

### For Recruiters:
- Post job openings with detailed descriptions.
- Manage job postings.
- Review applications from job seekers.

## Technologies Used
- **Frontend:** React.js, Redux, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), Cookies
- **UI Components:** shadcn/UI
- **Icons:** Lucide React

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your local machine.
- MongoDB instance running locally or on a cloud provider.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/jobfinder-portal.git
   ```

2. Navigate to the project directory:
   ```bash
   cd jobfinder-portal
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` - Start the development server.
- `npm run build` - Build the project for production.
- `npm start` - Start the production server.

## Contributing

Contributions are always welcome! If you'd like to contribute, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
