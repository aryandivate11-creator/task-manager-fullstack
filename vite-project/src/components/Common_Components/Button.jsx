import MuiButton from "@mui/material/Button";

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "contained",
  color = "primary",
  fullWidth = false,
  sx = {},
  disabled = false,
}) => {
  return (
    <MuiButton
      type={type}
      onClick={onClick}
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      sx={sx}
      disabled={disabled}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
