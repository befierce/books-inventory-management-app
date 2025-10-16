const TextArea = ({
  name,
  value,
  onChange,
  placeholder,
  rows = "4",
  error,
}) => {
  return (
    <div className="sm:col-span-2">
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextArea;
