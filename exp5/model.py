

import whisper
import torch
import os


print("Loading Whisper model...")
model = whisper.load_model("base")
print("Model loaded successfully!")


def save_model(model, file_path):
   
    dir_name = os.path.dirname(file_path)
    if not os.path.exists(dir_name) and dir_name != '':
        os.makedirs(dir_name)
        print(f"Directory '{dir_name}' created.")
    
  
    torch.save(model.state_dict(), file_path)
    print(f"Model saved to {file_path}")


def load_model(file_path):
   
    if not os.path.exists(file_path):
        print(f"Error: The file '{file_path}' does not exist.")
        return None

    print(f"Loading model from {file_path}...")
    
    model = whisper.load_model("base")
    
   
    model.load_state_dict(torch.load(file_path))
    model.eval()  
    
    print(f"Model loaded successfully from {file_path}")
    return model


save_model(model, "saved_models/jeffrin_model.bin")


loaded_model = load_model("saved_models/jeffrin_model.bin")
if loaded_model:
    print("Model loading test passed!")
else:
    print("Model loading test failed.")
