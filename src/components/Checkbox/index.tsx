import React from "react";

interface ICheckboxProps {
  id?: string;
  label: string;
  className?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox = (props: ICheckboxProps) => {
  const { id, label, className, onChange, checked } = props;
  return (
    <label htmlFor={id} className={`flex items-center ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onChange(!checked)}
        className="bg-gray-900 form-checkbox rounded-md w-5 h-5"
      />
      <span className="pl-3 text-gray-300">{label}</span>
    </label>
  );
};
