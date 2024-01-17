import { useState } from "react";
import Select from "../select/select";
import { ExerciseFormDataType } from "../../types/componentStateTypes";

const ExerciseForm = () => {
  const [formData, setFormData] = useState<ExerciseFormDataType>({
    source: "",
    time: 0
  });
  
  const handleSubmit = () => {

  }
  
  return(
    <form onSubmit={ handleSubmit }>
      {/* výběr typu cvičení */}
      <Select 
        defaultValue="Typ cvičení"
        options={ ["Pilates", "Venkovní posilovna", "Procházka", "Streching", "Jiné"] } 
      />
      {/* zaměření */}
      <Select 
        defaultValue="Zaměření"
        options={ ["zadek", "paže", "břicho", "nohy", "záda", "celé tělo"] } 
      />
      <div className="relative">
       <input
          id="exerciseSource"
          type="text"
          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          placeholder=" "
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label 
          htmlFor="exerciseSource"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Zdroj cvičení
        </label>
      </div>
      <div className="relative">
        <input
          id="exerciseTime"
          type="number"
          onChange={(e) => setFormData({ ...formData, time: Number(e.target.value) })}
          placeholder=" "
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        <label 
          htmlFor="exerciseTime"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
        >
          Délka cvičení
        </label>      
      </div>
      <button type="button" className="cursor-pointer bg-cyan-600 rounded p-1.5 hover:bg-cyan-800">Odeslat</button>
    </form>
  );
};

export default ExerciseForm;