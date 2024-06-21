import { FaCheckCircle } from "react-icons/fa";

export const FormSuccess = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-Form-Green/15 p-3 rounded-lg flex w-full items-center gap-x-2 text-sm font-medium text-Form-Green">
      <FaCheckCircle className=" h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
