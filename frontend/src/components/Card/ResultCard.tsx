import { ILLNESSES } from "../../data/constants/illnesses";
import type { ClassificationDto } from "../../data/dto/classification.dto";
import { classifyProgressNomenclature } from "../../utils/ClassifyProgressNomenclature";
import "./style.result-card.css";
import Stethoscope from "../../assets/stethoscope.svg";
import VitalSignsBlue from "../../assets/vital_signs_blue.svg";
import Error from "../../assets/error.svg";
import Warning from "../../assets/warning.svg";
import Help from "../../assets/help.svg";
import Check from "../../assets/check.svg";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import ErrorBlue from "../../assets/error_blue.svg";

type ResultCardProps = {
  classification: ClassificationDto;
};

export const ResultCard = ({ classification }: ResultCardProps) => {
  const result = ILLNESSES[classification.className];
  const confidence = classification.confidence * 100;

  let imageIcon: string;
  switch (classification.className) {
    case "Covid":
      imageIcon = Error;
      break;
    case "Lung_Opacity":
      imageIcon = Help;
      break;
    case "Viral_Pneumonia":
      imageIcon = Warning;
      break;
    default:
      imageIcon = Check;
      break;
  }

  return (
    <div className={`result-card ${classification.className}`}>
      <div className={`result-card-header ${classification.className}`}>
        <div className="result-card-title">
          <img src={imageIcon} draggable={false} />
          <div className="result-card-title-inner">
            <h2>{result.name}</h2>
            <p>Resultado da análise por IA</p>
          </div>
        </div>
        <div className="result-card-percentage">
          <p>{confidence.toFixed(1)}%</p>
        </div>
      </div>

      <div className="result-card-body">
        <div className="result-card-progress">
          <div className="result-card-progress-title">
            <p>Nível de Confiança</p>
            <p>{classifyProgressNomenclature(confidence)}</p>
          </div>
          <ProgressBar percentage={confidence} />
        </div>

        <div className="result-card-details">
          <div className="result-card-details-title">
            <img src={VitalSignsBlue} />
            <p>Análise Detalhada</p>
          </div>
          <div className="result-card-details-body">
            <p>{result.details}</p>
          </div>
        </div>
      </div>

      <div className="result-card-recomendations">
        <div className="result-card-recomendations-title">
          <img src={Stethoscope} />
          <h2>Recomendações</h2>
        </div>
        <div className="result-card-recomendations-list">
          <ul>
            {result.recomendations.map((recomendation: string) => {
              return <li>{recomendation}</li>;
            })}
          </ul>
        </div>
      </div>

      <div className="result-card-warning-wrapper">
        <div className="result-card-warning">
          <div className="result-card-warning-title">
            <img src={ErrorBlue} />
            <p>Aviso Médico</p>
          </div>
          <p className="result-card-warning-description">
            Este diagnóstico foi gerado por inteligência artificial e deve ser
            usado apenas como ferramenta de apoio. Consulte sempre um médico
            especialista para confirmação e tratamento adequado.
          </p>
        </div>
      </div>
    </div>
  );
};
