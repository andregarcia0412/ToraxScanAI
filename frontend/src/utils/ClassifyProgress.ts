export const classifyProgress = (progress: number): string => {
  switch (true) {
    case progress >= 90:
      return "very-high";
    case progress >= 75:
      return "high";
    case progress >= 60:
      return "moderate";
    default:
      return "low";
  }
};
