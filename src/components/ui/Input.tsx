import type { ReactNode } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputType = {
  type?: string;
  lable: string;
  error?: FieldError;
  register: UseFormRegisterReturn<string>;
  icon: ReactNode;
};

export default function Input({
  lable,
  type,
  register,
  error,
  icon,
}: InputType) {
  if (lable === "Message") {
    return (
      <div className="flex flex-col gap-1">
        <label
          htmlFor={lable}
          className="text-gray-300 flex items-center gap-2"
        >
          {icon} {lable} :
        </label>
        <textarea
          id={lable}
          {...register}
          className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {error && <p className="text-red-600">{error.message}</p>}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={lable} className="text-gray-300 flex items-center gap-2">
        {icon}
        {lable}:
      </label>
      <input
        id={lable}
        type={type}
        {...register}
        className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      />
      {error && <p className="text-red-600">{error.message}</p>}
    </div>
  );
}
