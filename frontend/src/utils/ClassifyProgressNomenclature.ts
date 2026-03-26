export const classifyProgressNomenclature = (confidence: number): string => {
  switch (true) {
    case confidence >= 90:
      return "Muito Alta";
    case confidence >= 75:
      return "Alta";
    case confidence >= 60:
      return "Moderada";
    default:
      return "Baixa";
  }
};
