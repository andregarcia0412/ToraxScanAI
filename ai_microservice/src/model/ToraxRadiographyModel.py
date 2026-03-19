from torch import nn
import torch

class ToraxRadiographyModel(nn.Module):
    def __init__(self, input_shape, hidden_units, output_shape, dropout_rate=0.5):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=input_shape, out_channels=hidden_units, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units),
            nn.LeakyReLU(0.1),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units, out_channels=hidden_units*2, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*2),
            nn.LeakyReLU(0.1),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units*2, out_channels=hidden_units*4, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*4),
            nn.LeakyReLU(0.1),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units*4, out_channels=hidden_units*8, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*8),
            nn.LeakyReLU(0.1),
            nn.MaxPool2d(2),

            nn.Conv2d(in_channels=hidden_units*8, out_channels=hidden_units*16, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*16),
            nn.LeakyReLU(0.1),
            nn.MaxPool2d(2),

            nn.Conv2d(hidden_units*16, out_channels=hidden_units*32, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*32),
            nn.LeakyReLU(0.1),

            nn.Conv2d(in_channels=hidden_units*32, out_channels=hidden_units*64, kernel_size=3, padding=1),
            nn.BatchNorm2d(hidden_units*64),
            nn.LeakyReLU(0.1),
            nn.AdaptiveAvgPool2d((1,1))
        )

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(p=dropout_rate),
            nn.Linear(hidden_units*64, hidden_units*16),
            nn.BatchNorm1d(hidden_units*16),
            nn.LeakyReLU(0.1),
            nn.Dropout(p=dropout_rate / 2),
            nn.Linear(hidden_units*16, output_shape)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.features(x)
        x = self.classifier(x)

        return x