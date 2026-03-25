import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import os
import glob

# Canonical Feature Order
CANONICAL_FEATURES = [
    "Gender",
    "Age",
    "Occupation",
    "Sleep Duration",
    "Physical Activity Level",
    "Stress Level",
    "BMI Category",
    "Blood Pressure",
    "Heart Rate",
    "Daily Steps"
]

def parse_systolic(bp_str):
    try:
        return float(bp_str.split('/')[0])
    except:
        return 120.0

def categorize_quality(q):
    if q >= 7: return "Good"
    elif q >= 5: return "Average"
    return "Poor"

def preprocess_df(df):
    # Clean BMI Category
    df['BMI Category'] = df['BMI Category'].replace('Normal Weight', 'Normal')
    # Blood Pressure -> Systolic
    df['Blood Pressure'] = df['Blood Pressure'].apply(parse_systolic)
    # Target -> Fill missing
    df['Sleep Disorder'] = df['Sleep Disorder'].fillna('None')
    # Quality Target -> Map to string categories
    df['Quality Category'] = df['Quality of Sleep'].apply(categorize_quality)
    return df

def train_model():
    dataset_dir = 'dataset'
    csv_files = glob.glob(os.path.join(dataset_dir, '*.csv'))
    
    if not csv_files:
        print(f"Error: No CSV files found in {dataset_dir}")
        return
    
    dataset_path = csv_files[0]
    print(f"Loading dataset: {dataset_path}")
    df = pd.read_csv(dataset_path)
    df = preprocess_df(df)

    # Features and Target
    X = df[CANONICAL_FEATURES].copy()
    y_disorder = df['Sleep Disorder'].copy()
    y_quality = df['Quality Category'].copy()

    # Encoders for categorical features
    categorical_cols = ["Gender", "Occupation", "BMI Category"]
    feature_encoders = {}
    
    for col in categorical_cols:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col])
        feature_encoders[col] = le
        print(f"Encoded {col}: {dict(zip(le.classes_, range(len(le.classes_))))}")

    # Label Encoders for Targets
    label_encoder_disorder = LabelEncoder()
    y_disorder_encoded = label_encoder_disorder.fit_transform(y_disorder)
    print(f"Disorder Label Mapping: {dict(zip(label_encoder_disorder.classes_, range(len(label_encoder_disorder.classes_))))}")
    
    label_encoder_quality = LabelEncoder()
    y_quality_encoded = label_encoder_quality.fit_transform(y_quality)
    print(f"Quality Label Mapping: {dict(zip(label_encoder_quality.classes_, range(len(label_encoder_quality.classes_))))}")

    # Stratified Split for Disorder (We will use same split idx for simplicity, or train totally separately)
    # Training Disorder Model
    X_train_d, X_test_d, y_train_d, y_test_d = train_test_split(
        X, y_disorder_encoded, test_size=0.2, stratify=y_disorder_encoded, random_state=42
    )

    model_disorder = XGBClassifier(
        n_estimators=300, max_depth=6, learning_rate=0.05,
        subsample=0.8, colsample_bytree=0.8, random_state=42, eval_metric="mlogloss"
    )
    model_disorder.fit(X_train_d, y_train_d)
    print(f"Disorder Model Accuracy: {model_disorder.score(X_test_d, y_test_d):.4f}")

    # Training Quality Model
    X_train_q, X_test_q, y_train_q, y_test_q = train_test_split(
        X, y_quality_encoded, test_size=0.2, stratify=y_quality_encoded, random_state=42
    )

    model_quality = XGBClassifier(
        n_estimators=300, max_depth=6, learning_rate=0.05,
        subsample=0.8, colsample_bytree=0.8, random_state=42, eval_metric="mlogloss"
    )
    model_quality.fit(X_train_q, y_train_q)
    print(f"Quality Model Accuracy: {model_quality.score(X_test_q, y_test_q):.4f}")

    # Save everything compactly
    model_data = {
        'model_disorder': model_disorder,
        'model_quality': model_quality,
        'feature_encoders': feature_encoders,
        'label_encoder_disorder': label_encoder_disorder,
        'label_encoder_quality': label_encoder_quality,
        'feature_names': CANONICAL_FEATURES
    }
    
    model_path = 'ai/sleep_model.pkl'
    os.makedirs('ai', exist_ok=True)
    joblib.dump(model_data, model_path)
    print(f"Model and Encoders saved to {model_path}")

if __name__ == "__main__":
    train_model()
