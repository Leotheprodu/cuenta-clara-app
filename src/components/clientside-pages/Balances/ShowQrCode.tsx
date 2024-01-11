import QRCode from "react-qr-code";

export const ShowQrCode = ({
  value,
  title,
}: {
  value: string;
  title: string;
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-1">
      <h3 className="text-center font-bold text-5xl text-slate-500">{title}</h3>
      <QRCode value={value} />
    </div>
  );
};
