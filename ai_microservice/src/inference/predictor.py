import os
import torch
from src.model.ToraxRadiographyModel import ToraxRadiographyModel

device = "cuda" if torch.cuda.is_available() else "cpu"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "torax_radiography_disease_classification_model_v2.pth")

class_names = ["Covid", "Lung_Opacity", "Normal", "Viral Pneumonia"]

model = ToraxRadiographyModel(input_shape=3, hidden_units=32, output_shape=4).to(device)
model.load_state_dict(
    torch.load(MODEL_PATH, map_location=device)
)

model.eval()

def predict_image(image_tensor: torch.Tensor):
    with torch.no_grad():
        outputs = model(image_tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probs, 1)

        return {
            "class_name":class_names[predicted.item()],
            "confidence":float(confidence.item())
        }
