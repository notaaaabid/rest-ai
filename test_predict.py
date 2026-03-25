import joblib
import pandas as pd

model_path = 'ai/sleep_model.pkl'
saved_data = joblib.load(model_path)
model_disorder = saved_data['model_disorder']
model_quality = saved_data['model_quality']
label_encoder_disorder = saved_data['label_encoder_disorder']

df = pd.DataFrame([{
    'Gender': 1, # Male
    'Age': 55.0,
    'Occupation': 3, 
    'Sleep Duration': 4.5,
    'Physical Activity Level': 30.0,
    'Stress Level': 8.0,
    'BMI Category': 2, # Obese
    'Blood Pressure': 145.0,
    'Heart Rate': 85.0,
    'Daily Steps': 3000.0
}])[saved_data['feature_names']]

print("Input data:")
print(df)

probs = model_disorder.predict_proba(df)
preds_idx = model_disorder.predict(df)
preds = label_encoder_disorder.inverse_transform(preds_idx)

print("Disorder Probs:", probs)
print("Disorder Preds:", preds)
