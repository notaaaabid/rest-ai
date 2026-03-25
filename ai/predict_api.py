from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np
import os

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionInput(BaseModel):
    gender: str
    age: float
    occupation: str
    sleep_duration: float
    activity: float
    stress: float
    bmi: str
    blood_pressure: str
    heart_rate: float
    steps: float

model_path = 'ai/sleep_model.pkl'

def parse_systolic(bp_str):
    try:
        return float(bp_str.split('/')[0])
    except:
        return 120.0

def safe_encode(encoder, value, default_val=0):
    try:
        # Check if value exists in encoder classes
        if value in encoder.classes_:
            return encoder.transform([value])[0]
        # Fallback to a case-insensitive match if possible
        classes_lower = [c.lower() for c in encoder.classes_]
        if value.lower() in classes_lower:
            idx = classes_lower.index(value.lower())
            return idx
        return default_val
    except:
        return default_val

@app.post("/predict")
async def predict(data: PredictionInput):
    if not os.path.exists(model_path):
        return {"error": "Model not found. Please run: .venv/bin/python ai/train_model.py"}

    # Load model and encoders
    saved_data = joblib.load(model_path)
    model_disorder = saved_data['model_disorder']
    model_quality = saved_data['model_quality']
    feature_encoders = saved_data['feature_encoders']
    label_encoder_disorder = saved_data['label_encoder_disorder']
    label_encoder_quality = saved_data['label_encoder_quality']
    feature_names = saved_data['feature_names']

    # 1. Preprocessing String Sanitization
    gender = data.gender.capitalize()
    occupation = data.occupation.title()
    bmi = data.bmi
    if bmi.lower() == "normal weight": bmi = "Normal"
    else: bmi = bmi.title()
    
    systolic_bp = parse_systolic(data.blood_pressure)

    # 2. Categorical Encoding (Strict alignment with training)
    gender_enc = safe_encode(feature_encoders['Gender'], gender)
    occupation_enc = safe_encode(feature_encoders['Occupation'], occupation)
    bmi_enc = safe_encode(feature_encoders['BMI Category'], bmi)

    # 3. Construct DataFrame with Canonical Order
    input_dict = {
        'Gender': gender_enc,
        'Age': data.age,
        'Occupation': occupation_enc,
        'Sleep Duration': data.sleep_duration,
        'Physical Activity Level': data.activity,
        'Stress Level': data.stress,
        'BMI Category': bmi_enc,
        'Blood Pressure': systolic_bp,
        'Heart Rate': data.heart_rate,
        'Daily Steps': data.steps
    }
    
    input_df = pd.DataFrame([input_dict])[feature_names]

    # Debug logs
    print("\n--- Processed Input (Encoded) ---")
    print(input_df)
    print("---------------------------------\n")

    # 4. Predict
    prediction_idx_disorder = model_disorder.predict(input_df)[0]
    prediction_idx_quality = model_quality.predict(input_df)[0]
    
    # 5. Inverse Transform back to Label
    label_disorder = label_encoder_disorder.inverse_transform([prediction_idx_disorder])[0]
    label_quality = label_encoder_quality.inverse_transform([prediction_idx_quality])[0]

    return {
        "apnea_prediction": label_disorder,
        "quality_prediction": label_quality
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
