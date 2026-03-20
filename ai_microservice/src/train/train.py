import os
import torch
from torch import nn
from torchvision import transforms
from torch.utils.data import Subset
from torch.utils.data import DataLoader
from src.model.ToraxRadiographyModel import ToraxRadiographyModel
from torchvision.datasets import ImageFolder
from pathlib import Path

device = "cuda" if torch.cuda.is_available() else "cpu"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
        )
])

test_transform = transforms.Compose([
     transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

full_train_dataset = ImageFolder(root=os.path.join(BASE_DIR, "../dataset"), transform=train_transform)
full_test_dataset = ImageFolder(root=os.path.join(BASE_DIR, "../dataset"), transform=test_transform)

dataset_size = len(full_train_dataset)
indices = torch.randperm(dataset_size).tolist()
train_size = int(0.8 * dataset_size)

train_indices = indices[:train_size]
train_dataset = Subset(full_train_dataset, train_indices)
test_indices = indices[train_size:]
test_dataset = Subset(full_test_dataset, test_indices)

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True,
)

test_loader = DataLoader(
    test_dataset,
    batch_size=32,
    shuffle=False,
)

model = ToraxRadiographyModel(input_shape=3, hidden_units=32, output_shape=4).to(device)

def train_step(model: torch.nn.Module, data_loader: torch.utils.data.DataLoader, loss_fn: torch.nn.Module, optimizer: torch.optim.Optimizer, accuracy_fn, device: torch.device=device):
    train_loss, train_acc = 0,0

    model.train()
    for batch, (X, y) in enumerate(data_loader):
        X,y = X.to(device), y.to(device)

        y_pred = model(X)

        loss = loss_fn(y_pred, y)
        train_loss += loss.item()
        train_acc += accuracy_fn(y, y_pred.argmax(dim=1))

        optimizer.zero_grad()

        loss.backward()

        optimizer.step()
        
    train_loss /= len(data_loader)
    train_acc /= len(data_loader)
    print(f"Train loss: {train_loss:.5f} | Train acc: {train_acc:.2f}%")

def test_step(model: torch.nn.Module, data_loader: torch.utils.data.DataLoader, loss_fn: torch.nn.Module, accuracy_fn, device: torch.device = device):
  test_loss, test_acc = 0,0

  model.eval()
  with torch.inference_mode():
    for X,y in data_loader:
      X, y = X.to(device), y.to(device)

      test_pred = model(X)

      test_loss += loss_fn(test_pred, y).item()
      test_acc += accuracy_fn(y, test_pred.argmax(dim=1))

    test_loss /= len(data_loader)
    test_acc /= len(data_loader)

    print(f"Test loss: {test_loss:.5f} | Test acc: {test_acc:.2f}%")
    return test_loss, test_acc

def accuracy_fn(y_true, y_pred):
    correct = torch.eq(y_true, y_pred).sum().item()
    acc = (correct / len(y_pred)) * 100
    return acc


loss_fn = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(params=model.parameters(), lr=0.001)
epochs = 100

try:
    for epoch in range(epochs):
        print(f"Epoch: {epoch}")
        train_step(model=model, data_loader=train_loader, loss_fn=loss_fn, optimizer=optimizer, accuracy_fn=accuracy_fn, device=device)
        test_loss, test_acc = test_step(model, test_loader, loss_fn, accuracy_fn)

except KeyboardInterrupt:
   print("\nTraining interrupted")
finally: 
    MODEL_PATH = Path("src/model")
    MODEL_PATH.mkdir(parents=True, exist_ok=True)

    MODEL_NAME = "torax_radiography_disease_classification_model_v3.pth"
    MODEL_SAVE_PATH = MODEL_PATH / MODEL_NAME

    print(f"Saving to: {MODEL_SAVE_PATH}")
    torch.save(model.state_dict(), MODEL_SAVE_PATH)
