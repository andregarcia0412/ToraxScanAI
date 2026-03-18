from torch import nn
import torch

class ToraxRadiographyModel(nn.Module):
    def __init__(self, input_shape, hidden_units, output_shape):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=input_shape, out_channels=hidden_units, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units, out_channels=hidden_units*2, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*2),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units*2, out_channels=hidden_units*4, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*4),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units*4, out_channels=hidden_units*8, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*8),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units*8, out_channels=hidden_units*16, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*16),
            nn.ReLU(),
            nn.MaxPool2d(2),

            nn.Conv2d(hidden_units*16, out_channels=hidden_units*32, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*32),
            nn.ReLU(),

            nn.Conv2d(in_channels=hidden_units*32, out_channels=hidden_units*64, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*64),
            nn.ReLU(),
            nn.AdaptiveAvgPool2d((1,1))
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(hidden_units*64, output_shape)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.features(x)
        x = self.classifier(x)

        return x