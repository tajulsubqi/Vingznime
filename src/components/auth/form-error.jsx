import { TiWarning } from "react-icons/ti";

export const FormError = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-Red-95 p-3 rounded-lg flex w-full items-center gap-x-2 text-sm font-medium text-Red-45">
      <TiWarning className=" h-5 w-5" />
      <p>{message}</p>
    </div>
  );
};
