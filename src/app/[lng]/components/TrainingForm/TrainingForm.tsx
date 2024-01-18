import { useEffect, useState } from "react";
import Select from "../Select";
import { ExerciseFormDataType } from "../../../../../types/componentStateTypes";
import { useTranslation } from "../../../i18/client";
import { get, ref } from "firebase/database";
import { database } from "../../../firebaseCongif";

const TrainingForm = (props: { lng: string }) => {
  const { t, i18n } = useTranslation(props.lng, 'training-form')
  const [formData, setFormData] = useState<ExerciseFormDataType>({
    source: "",
    time: 0
  });
  const [options, setOptions] = useState({
    trainingType: [],
    focus: []
  });

  const handleSubmit = () => {
    
  }
  console.log("formData", formData);
  useEffect(() => {
    const formDataRef = ref(database, "training")
    get(formDataRef).then((snapshot) => {
      if(snapshot.exists()) {
        const data = snapshot.val();
        setOptions({
          trainingType: data.trainingType,
          focus: data.focusAt
        });
      } else {
        console.log("No data available")
      }
    }).catch(error => {
      console.error(error)
    })
  }, [props.lng])

  return(
    <form onSubmit={ handleSubmit } className="w-96">
      {/* výběr typu cvičení */}
      <Select 
        defaultValue={ t("trainingType") }
        options={ Object.values(options.trainingType).map(option => option[props.lng]) } 
      />
      {/* zaměření */}
      <Select 
        defaultValue={ t("focus") }
        options={ Object.values(options.focus).map(option => option[props.lng]) } 
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
          { t("trainingType") }
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
          { t("time") }
          {/* Délka cvičení */}
        </label>      
      </div>
      <button type="button" className="cursor-pointer bg-cyan-600 rounded p-1.5 hover:bg-cyan-800" onClick={handleSubmit}>
        { t("submit") }
        {/* Odeslat */}
      </button>
    </form>
  );
};

export default TrainingForm;