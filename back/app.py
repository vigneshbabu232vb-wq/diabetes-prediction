from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from model import model, accuracy


app = FastAPI(
    title="Diabetes Prediction API",
    description="API for predicting diabetes using Random Forest",
    version="1.0"
)


# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Input data format
class DiabetesData(BaseModel):

    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


# Home API
@app.get("/")
def home():

    return {
        "message": "Diabetes Prediction API is running"
    }


# Accuracy API
@app.get("/accuracy")
def get_accuracy():

    return {
        "accuracy": round(accuracy * 100, 2)
    }


# Prediction API
@app.post("/predict")
def predict_diabetes(data: DiabetesData):

    input_data = [[
        data.Pregnancies,
        data.Glucose,
        data.BloodPressure,
        data.SkinThickness,
        data.Insulin,
        data.BMI,
        data.DiabetesPedigreeFunction,
        data.Age
    ]]

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0]

    diabetes_probability = probability[1] * 100

    if prediction == 0:

        result = "You are unlikely to have diabetes"

    else:

        result = "You may have diabetes"

    return {

        "prediction": int(prediction),

        "result": result,

        "probability": round(diabetes_probability, 2)

    }