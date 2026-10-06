import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Load dataset
df = pd.read_csv("diabetes.csv")

# Separate input and output
X = df.drop("Outcome", axis=1)
y = df["Outcome"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=0
)

# Create model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=0
)

# Train model
model.fit(X_train, y_train)

# Calculate accuracy
accuracy = accuracy_score(
    y_test,
    model.predict(X_test)
)

print("Model Accuracy:", accuracy * 100)
