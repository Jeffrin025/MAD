import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
import numpy as np
import pandas as pd

# Example barcode dataset (for demonstration purposes, replace with actual data)
# Assuming you have barcode numbers and corresponding product categories

data = pd.DataFrame({
    'barcode': [1234567890, 2345678901, 3456789012, 4567890123],
    'category': ['Electronics', 'Clothing', 'Food', 'Furniture']
})

# Preprocessing the data
# Convert barcode numbers to numerical features (e.g., using one-hot encoding or other methods)
X = np.array(data['barcode'].values)  # Features (Barcode numbers)
y = pd.get_dummies(data['category']).values  # Labels (Categories)

# Build a simple model
model = Sequential()
model.add(Dense(64, input_dim=1, activation='relu'))  # Input layer (1-dimensional input for barcode)
model.add(Dense(32, activation='relu'))
model.add(Dense(4, activation='softmax'))  # Output layer (4 categories for this example)

# Compile the model
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

# Train the model
model.fit(X, y, epochs=10, batch_size=1)

# Save the model
model.save('barcode_classifier.h5')

print("Model saved as barcode_classifier.h5")
