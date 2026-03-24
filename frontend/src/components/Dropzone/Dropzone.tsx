import React from "react";
import "./style.dropzone.css";
import Upload from "../../assets/upload.svg";

type DropzoneProps = {
  setEnabled?: (enabled: boolean) => void;
  setOuterImagePreview?: (preview: string | null) => void;
  analyzeOnClick?: () => void;
  setFile?: (file: File | null) => void;
  setShowToast?: (showToast: boolean) => void;
  setToastText?: (text: string) => void;
  loading: boolean;
};

export const Dropzone = ({
  setEnabled,
  setOuterImagePreview,
  analyzeOnClick,
  setFile,
  setShowToast,
  setToastText,
  loading,
}: DropzoneProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [hasFile, setHasFile] = React.useState<boolean>(false);
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const resetPreview = () => {
    setPreview(null);
    setHasFile(false);
    if (setFile) setFile(null);
    if (setOuterImagePreview) setOuterImagePreview(null);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) {
      return;
    }

    setHasFile(true);

    if (!allowedTypes.includes(file.type)) {
      if (setToastText)
        setToastText(
          "Só são aceitos arquivos com as seguintes extensões: .jpeg, .jpg, .png",
        );
      if (setShowToast) setShowToast(true);
      resetPreview();
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      if (setToastText)
        setToastText("Envie um arquivo com tamanho menor que 10MB");
      if (setShowToast) setShowToast(true);
      resetPreview();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      if (setOuterImagePreview) setOuterImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    if (setFile) setFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  return (
    <div className="dropzone-card">
      <div className="dropzone-card-title">
        <h2>Upload de Imagem</h2>
        <p>Envie uma imagem de raio-X torácico para análise</p>
      </div>
      <div
        className={`dropzone ${isDragging ? "dragover" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview && (
          <img className="preview-image" src={preview} alt="Preview" />
        )}
        {!hasFile && (
          <div className="dropzone-items">
            <div className="upload-icon">
              <img src={Upload} />
            </div>
            <p className="dropzone-title">
              Clique ou arraste uma imagem para fazer upload
              <span style={{ color: "#6B7280" }}>PNG, JPG, JPEG até 10MB</span>
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          hidden
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
