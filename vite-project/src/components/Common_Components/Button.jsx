const Button = ({
  label,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-full ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
