from flask import Flask, request, jsonify
from dotenv import load_dotenv
from src.inference.image_handler import load_and_preprocess_image
from src.inference.predictor import predict_image
import os
import time
import psutil

load_dotenv()

app = Flask(__name__)

start_time = time.time()

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "image not provided"}), 400
    
    try:
        image_tensor = load_and_preprocess_image(
            request.files["image"]
        )
        return jsonify(predict_image(image_tensor)), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    
@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status":"ok",
        "uptime": time.time() - start_time,
        "cpu_percent": psutil.cpu_percent(),
        "virtual_memory_percent": psutil.virtual_memory().percent
    }), 200

if(__name__ == "__main__"):
    port = int(os.getenv("PORT", 8000))
    app.run(host="0.0.0.0", port=port)