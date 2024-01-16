import QRCode from "react-qr-code";

export const ShowQrCode = ({
  value,
  title,
  handleShowBigQR,
}: {
  value: string;
  title: string;
  handleShowBigQR: () => void;
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-1 relative">
      <button
        className="absolute text-danger-500 top-[-1.2rem] right-[-0.7rem]"
        onClick={handleShowBigQR}
      >
        x
      </button>
      <h3 className="text-center font-bold text-5xl text-slate-500">{title}</h3>
      <QRCode value={value} />
    </div>
  );
};
