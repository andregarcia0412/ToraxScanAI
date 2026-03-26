import type { ClassificationDto } from "../../data/dto/classification.dto";
import { api } from "../client";

export const ClassificationService = {
  async classifyImage(image: File): Promise<ClassificationDto> {
    const formData = new FormData();
    formData.append("image", image);
    try {
      const { data } = await api.post("/classification/analyze", formData);
      return data;
    } catch (e) {
      console.error(
        "Error classifiying image:",
        e instanceof Error ? e.message : "Unknown Error",
      );
      throw e;
    }
  },
};
