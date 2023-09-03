interface FormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<FormErrorProps> = ({ errorMessage }) => (
  <span className="font-medium text-sm text-red-500">{errorMessage}</span>
);
