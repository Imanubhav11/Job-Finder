# Job Portal Application

A responsive and feature-rich job portal application that connects job seekers with recruiters, providing seamless job search and recruitment experiences.

## Features

### General Features
- Dynamic display of the latest and top job openings.
- User-friendly interface with responsive design for both mobile and desktop devices.

### Job Listings
- Grid layout for job cards with modern styling.
- Displays job details fetched from the backend.
- Dynamically updates job listings with real-time data.

### State Management
- Redux-based state management for efficient handling of global state.
- Ensures smooth and fast updates to the UI.

### Mobile Optimization
- Added custom padding and responsive grid structures for better usability on small devices.

## Tech Stack
- **Frontend:** ReactJS, Redux, Tailwind CSS
- **Backend API:** Axios for API calls
- **Styling:** Tailwind CSS for modern and responsive design
- **State Management:** Redux

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-portal-application.git
   ```

2. Navigate to the project directory:
   ```bash
   cd job-portal-application
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Usage
- Open the application in your browser.
- View the latest job listings dynamically displayed.
- Navigate through the responsive grid layout, optimized for mobile and desktop views.

## Folder Structure
```
job-portal-application/
├── src/
│   ├── components/
│   │   ├── LatestJobs.jsx
│   │   ├── LatestJobCards.jsx
│   ├── redux/
│   │   ├── jobSlice.js
│   ├── utils/
│   │   ├── constant.js
│   ├── App.js
│   ├── index.js
├── public/
├── package.json
├── README.md
```

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
Special thanks to all contributors and open-source libraries used in this project.
