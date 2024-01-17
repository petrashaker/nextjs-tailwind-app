import { useState } from "react";

const Select = (props: { options: string[], defaultValue: string }) => {
  const [value, setValue] = useState(props.defaultValue)
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleKeyPress = () => {

  };

  const handleOptionClick = (item: string) => {

  };

  return(
    <div
      className="border border-cyan-200 bg-cyan-200 rounded p-1 w-full"
      onClick={ () => handleClick() }
      tabIndex={1}
      onKeyDown={ handleKeyPress }
    >
      <div
        className="flex items-baseline justify-between"
      >
        <span>{ value }</span>
      
        { open ?
          <span className="cursor-pointer h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-blue-600" />
          :
          <span className="cursor-pointer h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-blue-600" />
        }
      </div>
      {
        open && (
          <div>
            { props.options.map((option: string, id: number) => (
                <div
                  className="hover:bg-slate-50 cursor-pointer"
                  key={id + option}
                  onClick={ () => handleOptionClick(option) }
                >
                { option }
              </div>
            ))
            }
          </div>
        )
      }

    </div>
  );
};

export default Select;