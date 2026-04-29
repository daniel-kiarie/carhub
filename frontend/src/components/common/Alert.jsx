const Alert = ({ message, type = "success" }) => {
  const styles = type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200";
  return (
    <div className={`p-4 rounded-lg border ${styles} flex items-center gap-3 mb-4 animate-bounce`}>
      <span>{type === "success" ? "✅" : "⚠️"}</span>
      <p className="font-medium text-sm">{message}</p>
    </div>
  );
};
export default Alert;