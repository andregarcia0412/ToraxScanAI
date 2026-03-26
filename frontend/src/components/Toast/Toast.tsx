import React from "react";
import "./style.toast.css";

type ToastProps = {
  backgroundColor: string;
  text: string;
  setShowToast: (showToast: boolean) => void;
};

export const Toast = ({ backgroundColor, text, setShowToast }: ToastProps) => {
  const [selectAnimation, setSelectAnimation] = React.useState<boolean>(true);

  React.useEffect(() => {
    setTimeout(() => {
      setSelectAnimation(false);
    }, 3000);
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  }, []);

  return (
    <div
      className={`toast ${selectAnimation ? "active" : "inactive"}`}
      style={{ backgroundColor }}
    >
      <p>{text}</p>
    </div>
  );
};
