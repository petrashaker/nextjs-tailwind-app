import { useState } from "react";
import { SelectType } from "../../../../../../types/componentPropTypes";

const Select = (props: SelectType) => {
  const [value, setValue] = useState(props.defaultValue)
  // state to open/close select 
  const [open, setOpen] = useState(false);
  // index used for key handle, initial state === nothing has been chosen yet
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleClick = () => {
    setOpen(!open);
  };

  /**
   * Handle option select by key press
   * @param e 
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    let nextIndexCount = 0;
    const notNullResultLength = props.options ? props.options.length : 1;
    const openingKey = e.code.toLowerCase() === "enter" || e.code.toLowerCase() === "space"
    
    if(openingKey) {
      setOpen((prev) => prev = true)
    }
    if(e.key.toLowerCase() === "arrowdown") {
      nextIndexCount = (focusedIndex + 1) % notNullResultLength
    }
    if(e.key.toLowerCase() === "arrowup") {
      nextIndexCount = (focusedIndex + notNullResultLength - 1) % notNullResultLength
    }
    setFocusedIndex(nextIndexCount)

    if(focusedIndex >= 0 && openingKey) {
      props.options.filter((option: { id: string, name: string }, id: number) => {
        if(id === focusedIndex) {
          handleSelectionByEnter(option)
          setOpen((prev) => prev = false)
        }
        setFocusedIndex(-1)
      })
    }
  };

  const handleSelectionByEnter = (item: { id: string, name: string }) => {
    setValue(item.name);
    props.onItemChange(item, props.id);
  };

  /**
   * Setting value of Select component and sending the result to parent component
   * @param item 
   */
  const handleOptionClick = (item: { id: string, name: string }) => {
    setValue(item.name);
    props.onItemChange(item, props.id)
  };

  /**
   * Change style while using arrows to move up or down
   * @param id 
   * @returns 
   */
  const handleStyle = (id: number) => {
    if(id === focusedIndex ) {
      return {
        backgroundColor: "#ffd385",
      };
    } else {
      return {};
    }
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
            { props.options.map((option, id: number) => (
                <div
                  className="hover:bg-slate-50 cursor-pointer"
                  key={id}
                  onClick={ () => handleOptionClick(option) }
                  style={handleStyle(id)}
                >
                { option.name }
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