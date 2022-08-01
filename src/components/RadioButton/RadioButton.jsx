export default function RadioButton({name, value, selected, text, onChange}) {
    return (
    <label className="radioButton__radio-container">
      <input
        value={value}
        name={name}
        className="radioButton__input"
        type="radio"
        onClick={() => onChange(value)}
      />

      <div
        className={`radioButton__circle ${
          value === selected && 'radioButton__circle--active'
        }`}
      ></div>
      
      <div className="radioButton__helper-text">{text}</div>
    </label>
  );
}