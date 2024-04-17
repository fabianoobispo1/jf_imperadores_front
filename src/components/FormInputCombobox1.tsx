import React from "react";
import { useFormContext } from "react-hook-form";

// unificar esse funcao com o FormInputComboBox para receber os itens via parametro

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  
};

const FormInputComboBox1: React.FC<FormInputProps> = ({
  label,
  name,
  type ,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="">
      <label htmlFor={name} className="block text-ct-blue-600 mb-3">
        {label}
      </label>
{/*       <input
        type={type}
        placeholder=" "
        className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"
        step="0.01"
        {...register(name)}
      /> */}
      <select 

        placeholder=" "
        className="block w-full rounded-2xl appearance-none focus:outline-none py-2 px-4"

        {...register(name)}
        >
          <option value="">Selecione</option>
          <option value="ATAQUE">Ataque</option>
          <option value="DEFESA">Defesa</option>
          <option value="ST">ST</option>
          <option value="STAF">STAF</option>


      </select>
      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInputComboBox1;