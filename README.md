# 🌠 NeoFeed - Near Earth Object Dashboard

A modern, interactive dashboard for visualizing and tracking Near-Earth Objects (NEOs) using NASA's API. This application provides real-time data about asteroids and other celestial objects that pass near Earth, with detailed orbital visualizations and approach data.

![NeoFeed Dashboard Preview](path-to-your-screenshot.png)

## ✨ Features

- **Real-time NEO Tracking**: Monitor near-Earth objects with data directly from NASA
- **Interactive 3D Visualizations**: View orbital paths and trajectories using Plotly
- **Date Range Selection**: Filter NEO data for specific time periods
- **Hazard Identification**: Clear visual indicators for potentially hazardous objects
- **Detailed Object Information**: Access comprehensive data about each NEO
- **Responsive Design**: Modern, space-themed interface that works on all devices

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- NASA API Key ([Get one here](https://api.nasa.gov/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/neofeed.git
cd neofeed
```

2. **Set up the backend**
```bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your NASA API key to .env
```

3. **Set up the frontend**
```bash
cd frontend
npm install
```

### Running the Application

1. **Start the backend server**
```bash
# From the root directory
python backend/main.py
```

2. **Start the frontend development server**
```bash
# From the frontend directory
npm start
```

The application will be available at `http://localhost:3000`

## 🛠 Tech Stack

### Frontend
- React.js
- Plotly.js for 3D visualizations
- Material-UI components
- Custom CSS with modern space theme
- Axios for API communication

### Backend
- Flask
- Python
- NASA NEO API integration
- Plotly for data processing
- RESTful API architecture

## 📊 API Endpoints

### NEO Data
- `GET /api/neo` - Fetch current day's NEO data
- `POST /api/neo` - Fetch NEO data for specific date range
- `GET /api/neoObject/:id` - Fetch detailed information for specific NEO

### Visualization Data
- `POST /api/updatedChart` - Generate new orbital visualization
- `GET /api/mars` - Fetch Mars-related data

## 🎨 Styling

The application features a modern, space-themed design with:
- Dark mode interface
- Dynamic gradients
- Interactive hover states
- Responsive layouts
- Hazard indicators
- Smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Free use for educators and educational purposes.

## 🙏 Acknowledgments

- NASA NEO API for providing the data
- Plotly.js for visualization capabilities
- The space science community for inspiration

## 📧 Contact

Your Name - [@howe_s_](https://twitter.com/howe_s_)

Project Link: [https://github.com/howe-s/neofeed](https://github.com/howe-s/neofeed)

