# Rest AI - Sleep Health & Apnea Predictor

Rest AI is a full-stack web application designed to evaluate your sleep health using machine learning. By entering a few lifestyle and health details, the system can predict your likelihood of experiencing **Sleep Apnea** and assess your overall **Sleep Quality**.

## Features
- **AI-Powered Predictions**: Uses robust XGBoost models trained on real sleep health data to deliver accurate insights.
- **Sleep Apnea Risk Detection**: Identifies whether you have a low, medium, or high risk for sleep apnea or insomnia.
- **Sleep Quality Evaluation**: Predicts your sleep quality as Good, Average, or Poor.
- **Modern User Interface**: Built with Next.js, React, Tailwind CSS, and shadcn-ui for a seamless and responsive user experience.
- **FastAPI Backend**: A lightweight, lightning-fast Python API serving the machine learning predictions.

## Tech Stack
### Frontend
- **Next.js 16** (App Router)
- **React 19** 
- **TypeScript**
- **Tailwind CSS**
- **shadcn-ui** components

### Backend & AI
- **Python 3**
- **FastAPI**
- **XGBoost** & **scikit-learn** (ML modeling and preprocessing)
- **Pandas** & **NumPy**

## Setup & Installation

### 1. Python Environment & ML Setup
You'll need Python 3 installed to run the backend API and train the machine learning models.

```bash
# Navigate to the project directory
cd rest-ai

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Install dependencies (ensure you have pandas, numpy, scikit-learn, xgboost, fastapi, uvicorn, and joblib installed)
pip install pandas numpy scikit-learn xgboost fastapi uvicorn joblib

# Train the ML models to generate the required model data (sleep_model.pkl)
python ai/train_model.py
```

### 2. Start the FastAPI Backend
Once the model is trained, start the API server that will listen for predictions from the frontend.

```bash
python ai/predict_api.py
# The server will start running on http://127.0.0.1:8000
```

### 3. Frontend Setup
In a new terminal, install the Node.js dependencies and start the Next.js development server.

```bash
# Install dependencies
bun install   # or npm install / pnpm install

# Start the frontend server 
bun dev       # running on http://localhost:3000
```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Click **Start Sleep Analysis**.
3. Fill out the **Health & Lifestyle Information** form completely.
4. Click either **Predict Sleep Apnea** or **Predict Sleep Quality**.
5. The Next.js frontend will communicate with the FastAPI backend, process your data through the XGBoost models, and display your personalized predictions!

## Dataset Information
The models are trained using the **Sleep Health and Lifestyle Dataset** available in the `dataset` folder. It includes features like Age, Gender, Occupation, Sleep Duration, Physical Activity, Stress Level, BMI, Blood Pressure, Heart Rate, and Daily Steps.

## License
MIT License
