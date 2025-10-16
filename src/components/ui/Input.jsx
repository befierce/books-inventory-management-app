import { useState, useEffect } from "react";
const Input = ({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  error 
}) => {
  return (
    <div>
      <input
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
      />
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};