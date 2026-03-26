type Illness = {
  name: string;
  details: string;
  recomendations: string[];
};

export const ILLNESSES: Record<string, Illness> = {
  Covid: {
    name: "Covid-19",
    details:
      "Detectados padrões de opacidade em vidro fosco bilateralmente, característicos de pneumonia viral por COVID-19.",
    recomendations: [
      "Isolamento imediato recomendado",
      "Teste RT-PCR para confirmação",
      "Monitoramento de saturação de oxigênio",
      "Consulta médica urgente",
    ],
  },
  Lung_Opacity: {
    name: "Outras Condições",
    details:
      "Padrões detectados não correspondem às categorias principais. Possível presença de condições atípicas ou artefatos de imagem.",
    recomendations: [
      "Avaliação médica especializada necessária",
      "Considerar exames complementares (TC de tórax)",
      "Revisão do histórico clínico do paciente",
      "Nova imagem radiológica se necessário",
    ],
  },
  Normal: {
    name: "Normal",
    details:
      "Pulmões com transparência normal. Ausência de infiltrados, consolidações ou efusões. Silhueta cardíaca dentro dos limites normais.",
    recomendations: [
      "Nenhuma ação médica urgente necessária",
      "Manter acompanhamento de rotina",
      "Continuar medidas preventivas de saúde",
    ],
  },
  Viral_Pneumonia: {
    name: "Pneumonia Viral",
    details:
      "Consolidação focal detectada no lobo inferior direito, sugestiva de pneumonia viral.",
    recomendations: [
      "Repouso e hidratação adequada recomendados",
      "Antivirais podem ser considerados conforme avaliação médica",
      "Monitoramento de sintomas e saturação de oxigênio",
      "Acompanhamento médico em 48-72 horas",
    ],
  },
};
