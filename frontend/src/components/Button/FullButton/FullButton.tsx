import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import "./style.full-button.css";

type FullButtonVariant = "solid" | "outline";

type FullButtonProps = {
  title: string;
  icon?: ReactNode;
  width?: string | number;
  variant?: FullButtonVariant;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const normalizeWidth = (width?: string | number) => {
  if (typeof width === "number") {
    return `${width}px`;
  }

  return width;
};

const renderIcon = (icon: ReactNode) => {
  if (typeof icon === "string") {
    return (
      <img
        src={icon}
        alt=""
        className="full-button__icon-image"
        draggable={false}
      />
    );
  }

  return icon;
};

export const FullButton = ({
  title,
  icon,
  width,
  variant = "solid",
  backgroundColor,
  textColor,
  borderColor,
  loading = false,
  loadingText = "Carregando...",
  fullWidth = false,
  className,
  disabled,
  type = "button",
  style,
  ...props
}: FullButtonProps) => {
  const isDisabled = disabled || loading;
  const resolvedWidth = fullWidth ? "100%" : normalizeWidth(width);
  const resolvedTextColor =
    textColor ?? (variant === "outline" ? "#2563eb" : "#ffffff");
  const resolvedBackgroundColor =
    variant === "outline" ? "transparent" : (backgroundColor ?? "#2563eb");
  const resolvedBorderColor =
    borderColor ?? (variant === "outline" ? resolvedTextColor : "transparent");

  const buttonStyle: CSSProperties = {
    width: resolvedWidth,
    backgroundColor: resolvedBackgroundColor,
    color: resolvedTextColor,
    borderColor: resolvedBorderColor,
    ...style,
  };

  const classes = [
    "full-button",
    `full-button--${variant}`,
    fullWidth ? "full-button--full-width" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      style={buttonStyle}
      disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      <span className="full-button__content">
        {loading ? (
          <span className="full-button__spinner" aria-hidden="true" />
        ) : (
          icon && (
            <span className="full-button__icon" aria-hidden="true">
              {renderIcon(icon)}
            </span>
          )
        )}
        <span className="full-button__title">
          {loading ? loadingText : title}
        </span>
      </span>
    </button>
  );
};
