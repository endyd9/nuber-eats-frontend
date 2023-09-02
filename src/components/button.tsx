interface ButtonProps {
  canClick: boolean;
  loading: boolean;
  acttionText: string;
}

export const Button: React.FC<ButtonProps> = ({
  canClick,
  loading,
  acttionText,
}) => {
  return (
    <button
      className={`${
        canClick
          ? "bg-lime-500 hover:bg-lime-600"
          : "bg-gray-300 pointer-events-none"
      } mt-3 text-lg font-medium text-white py-4   transition-colors hover:ease-in`}
    >
      {loading ? "Loading..." : acttionText}
    </button>
  );
};
