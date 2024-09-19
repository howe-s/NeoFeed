# NeoFeed Project

NeoFeed is a web application designed to retrieve and visualize data about near-Earth objects (NEOs) from NASA's NEO API. The application allows users to select a date range, fetch information about NEOs that passed by Earth during that time, and visualize their orbits.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Setup Instructions](#setup-instructions)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Development Notes](#development-notes)
8. [Future Improvements](#future-improvements)

## Project Structure
<code>
NeoFeed/
├── app.py
├── requirements.txt
├── backend/  # New directory for backend code
│   ├── utils/
│   │   ├── neoFeed.py
│   │   └── neoObjectApproach.py
├── frontend/  # Existing directory for frontend code
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ... (rest of frontend files)
│   ├── static/
│   │   └── neo.css
├── templates/
│   └── index.html
├── README.md
</code>

## Technologies Used
- **Frontend:**
  - React (JavaScript)
  - Axios (HTTP requests)
  - Plotly.js (Orbit visualizations)
  - MUI (Date pickers)
  - CSS (Custom styling)

- **Backend:**
  - Python (Flask)
  - NASA NEO API (for fetching NEO data)
  - Skyfield (Planetary positions for orbit plots)
  - Plotly (Python plotting for orbits)

  ## Features
- **Date Range Picker**: Users can select a start and end date to filter NEO data.
- **NEO Data Fetching**: The app sends a request to NASA’s NEO API and retrieves data about near-Earth objects that passed Earth during the selected date range.
- **Dynamic Visualization**: Users can click on a NEO to view its details and orbit plotted with Plotly.js.
- **Orbit Animation**: NEOs' orbits are plotted with respect to Earth or other celestial bodies using accurate data from Skyfield.
- **Hazardous Object Highlighting**: Potentially hazardous NEOs are highlighted in orange for easy identification.

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 14+
- Flask
- React

### Backend Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/neofeed.git

2. **Install dependencies**:
   ```bash
   cd neofeed
   pip install -r requirements.txt

3. **Run the Flask server**
   ```bash
   export FLASK_APP=app.py
   flask run

### Frontend Setup
1. **Navigate to the frontend directory**
   ```bash
   cd frontend
   
   
2. **Install dependencies**:
   ```bash
   npm install

3. **Run the React app**
   ```bash
   npm start

## API Endpoints

1. **GET <code>/api/neo</code>**
    - Fetches NEO data for the current day.
2. **POST <code>/api/neo</code>**
    - Accepts a date range and retrieves NEO data for that range from the NASA NEO API.
    - Request Body Example:
    ```bash
    {
        "start_date": "2024-01-01",
        "end_date": "2024-01-07"
    }
3. **GET <code>/api/neoObject</code>**
    - Fetches details for a specific NEO object using its identifier.
    - Response includes details like its orbit, size, and hazardous status.




