export default function AuthInput({ label, type = "text", icon: Icon, value, onChange, placeholder, required = true }) {
  return (
    <div className="auth-field">
      <label>{label}</label>
      <div className="auth-input-wrap">
        {Icon && <Icon className="auth-input-icon" size={18} />}
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="auth-input"
        />
      </div>
    </div>
  );
}
