export const Heading = ({
  label,
  backButtonLabel,
  backButtonHref,
  backButtonLabelAction,
}) => {
  return (
    <div className="flex flex-col items-start self-start gap-2.5'">
      <label className="leading-tight text-2xl font-bold cursor-default">
        {label}
      </label>

      <a href={backButtonHref} className="text-sm font-medium text-Grey-60">
        {backButtonLabel}{" "}
        <span className="text-Form-Blue">{backButtonLabelAction}</span>
      </a>
    </div>
  );
};
