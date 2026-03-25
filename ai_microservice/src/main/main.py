from flask import Flask, request, jsonify
from dotenv import load_dotenv
from src.inference.image_handler import load_and_preprocess_image
from src.inference.predictor import predict_image
import os
import time
import psutil
from flasgger import Swagger

load_dotenv()

app = Flask(__name__)
app.config["SWAGGER"] = {
    "title": "ToraxScan Microservice",
    "uiversion": 3
}

swagger = Swagger(app)

start_time = time.time()

@app.route("/predict", methods=["POST"])
def predict():
    """
    Predicts sickness from X-Ray image.
    ---
    tags:
      - Inference
    consumes:
      - multipart/form-data
    parameters:
      - in: formData
        name: image
        type: file
        required: true
        description: Image file (should be called image)
    responses:
      200:
        description: Predicted
        schema:
          type: object
          properties:
            class_name: 
                type: string
            confidence: 
                type: number
                format: float
                example: 0.9971098303794861
      400:
        description: Error validating image
        schema:
          type: object
          properties:
            error:
              type: string
    """
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
    """
    Microservice health check.
    ---
    tags:
      - System
    responses:
      200:
        description: Serviço ok
        schema:
          type: object
          properties:
            status:
              type: string
              example: ok
            uptime:
              type: number
              format: float
            cpu_percent:
              type: number
              format: float
            virtual_memory_percent:
              type: number
              format: float
    """
    return jsonify({
        "status":"ok",
        "uptime": time.time() - start_time,
        "cpu_percent": psutil.cpu_percent(),
        "virtual_memory_percent": psutil.virtual_memory().percent
    }), 200

if(__name__ == "__main__"):
    port = int(os.getenv("PORT", 8000))
    print(f" * Docs on http://localhost:{port}/apidocs/")
    app.run(host="0.0.0.0", port=port)