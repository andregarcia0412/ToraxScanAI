import "./style.header.css";
import VitalSignsWhite from "../../assets/vital_signs_white.svg";

export const Header = () => {
  return (
    <div className="header">
      <div className="header-icon">
        <img src={VitalSignsWhite} draggable={false}/>
      </div>
      <div className="header-title">
        <h1>ToraxScan AI</h1>
        <p>Diagnóstico por imagem assistido por IA</p>
      </div>
    </div>
  );
};
