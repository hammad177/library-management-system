type PropsSpinner = {
  size?: "sm" | "md" | "lg" | "xl";
};

const Spinner = ({ size }: PropsSpinner) => {
  const display_size =
    size === "sm"
      ? "w-10 h-10"
      : size === "md"
      ? "w-12 h-12"
      : size === "lg"
      ? "w-14 h-14"
      : size === "xl"
      ? "w-16 h-16"
      : "w-12 h-12";

  return (
    <div className="spinner-loading-state">
      <div className={`spinner-loading ${display_size}`}></div>
    </div>
  );
};

export default Spinner;
