from flask import Flask, request, jsonify
import whisper
import torch

app = Flask(__name__)


model = whisper.load_model("base")
model.load_state_dict(torch.load("jeffrin_model.bin"))

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    audio_path = 'output.wav'
    file.save(audio_path)

 
    audio = whisper.load_audio(audio_path)
    audio = whisper.pad_or_trim(audio)

    
    result = model.transcribe(audio, language="ta")

    return jsonify({'transcription': result['text']})

if __name__ == '__main__':
    app.run(debug=True)
