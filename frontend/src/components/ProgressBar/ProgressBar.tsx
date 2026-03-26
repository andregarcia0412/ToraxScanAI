import { classifyProgress } from "../../utils/ClassifyProgress";
import "./style.progress-bar.css";

type ProgressBarProps = {
  percentage: number;
};

export const ProgressBar = ({ percentage }: ProgressBarProps) => {
  return (
    <div className="progress-bar-outer">
      <div
        className={`progress-bar-inner ${classifyProgress(percentage)}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
