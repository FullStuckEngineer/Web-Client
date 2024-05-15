const Button = ({
  children,
  onClick = () => {},
  type = "button",
  className,
}) => {
  return (
    <button
      className={`h-10 w-32 font-semibold rounded-xl ${className} text-white`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
