import { Dropzone } from "../../components/Dropzone/Dropzone";
import "./style.css";
import VitalSignsGrey from "../../assets/vital_signs_grey.svg";
import { Header } from "../../components/Header/Header";
import React from "react";
import { ClassificationService } from "../../api/service/classification.service";
import type { ClassificationDto } from "../../dto/classification.dto";
import { ResultCard } from "../../components/Card/ResultCard";

export const Home = () => {
  const [classificationResponse, setClassificationResponse] =
    React.useState<ClassificationDto | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleUpload = async (image: File) => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await ClassificationService.classifyImage(image);
      console.log(response);
      setClassificationResponse(response);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="home-layout">
        <div className="home-column home-column-left">
          <Dropzone loading={loading} analyzeOnClick={handleUpload} />

          <div className="home-card about-card">
            <h1>Sobre o sistema</h1>
            <p>
              O ToraxScan AI utiliza algoritmos de inteligência artificial para
              auxiliar na detecção de condições pulmonares através de imagens de
              raio-X.
            </p>

            <div className="about-card-list">
              <ul>
                <li>Suporta imagens JPEG, PNG e JPG</li>
                <li>
                  Detecta COVID-19, pneumonia bacteriana e condições normais
                </li>
                <li>Fornece nível de confiança para cada diagnóstico</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="home-column home-column-right">
          <div className="home-card home-card-fill">
            {!classificationResponse ? (
              <div className="home-card-waiting">
                <div className="vital-signs-grey-icon">
                  <img src={VitalSignsGrey} />
                </div>
                <h2>Aguardando Análise</h2>
                <p>
                  Faça upload de uma imagem de raio-X e clique em "Iniciar
                  Análise" para obter o diagnóstico
                </p>
              </div>
            ) : (
              <ResultCard classification={classificationResponse} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
