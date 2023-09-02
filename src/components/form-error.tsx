interface FormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<FormErrorProps> = ({ errorMessage }) => (
  <span className="font-medium text-sm my-3 text-red-500">{errorMessage}</span>
);
