# AI Prediction System Documentation

This project integrates a Machine Learning prediction system into a Next.js application. It uses a Python FastAPI backend to serve a trained model that predicts sleep disorder risks based on a comprehensive set of health and lifestyle features.

## 1. How the System Works

The system follows a simple client-server architecture:

```text
User Input (Frontend)
        ↓
Next.js Form (src/components/SleepForm.tsx)
        ↓
POST request to Prediction API (http://localhost:8000/predict)
        ↓
Python FastAPI server (ai/predict_api.py)
        ↓
Machine Learning Pipeline (ai/sleep_model.pkl)
        ↓
Prediction returned as JSON
        ↓
Displayed in the UI (src/components/PredictionResults.tsx)
```

**Key Improvements:**
- **Reliability**: The model now uses `class_weight="balanced"` and 200 estimators to handle class imbalance (more "None" cases) and improve accuracy.
- **Systolic Blood Pressure**: The system extracts only the systolic value (e.g., "120" from "120/80") as it is the most significant numeric feature for this analysis.
- **Preprocessing**: Uses a scikit-learn `Pipeline` to ensure encoding consistency.

## 2. Project Structure

```text
rest-ai
├ dataset/
│   └ Sleep_health_and_lifestyle_dataset.csv  <-- Source health data
│
├ ai/
│   ├ train_model.py  <-- Script with reliability improvements
│   ├ predict_api.py  <-- FastAPI server
│   └ sleep_model.pkl <-- Saved model pipeline
...
```

## 3. Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js & Bun (or npm/yarn)

### Install Python Dependencies
```bash
.venv/bin/python -m pip install pandas scikit-learn fastapi uvicorn joblib
```

## 4. How to Train the Model

The model uses a **scikit-learn Pipeline** to bundle preprocessing and the `RandomForestClassifier`.
```bash
.venv/bin/python ai/train_model.py
```
**Improvements implemented:**
- Fills missing Sleep Disorder values with `"None"`.
- Uses a balanced Random Forest classifier with 200 trees.

## 5. How to Start the Prediction Server

```bash
.venv/bin/uvicorn ai.predict_api:app --reload --port 8000
```
...

## 6. How to Run the Frontend

```bash
bun dev
```

## 7. How to Verify the System

### Method 1: FastAPI Swagger UI
1. Open [http://localhost:8000/docs](http://localhost:8000/docs).
2. Test the `/predict` endpoint with this full payload:
   ```json
   {
     "gender": "Male",
     "age": 35,
     "occupation": "Doctor",
     "sleep_duration": 7.2,
     "activity": 5,
     "stress": 4,
     "bmi": "Normal",
     "blood_pressure": "120/80",
     "heart_rate": 72,
     "steps": 8000
   }
   ```

### Method 2: Website UI Test
1. Open [http://localhost:3000](http://localhost:3000).
2. Fill the form, click **"Predict Sleep Apnea"**.
3. Verify the prediction appears.
4. Click **"Clear"** and verify both the form and the prediction panel are reset.
