export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Se suma 1 al mes ya que en JavaScript los meses comienzan desde 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
