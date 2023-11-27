import { useState } from 'react';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };
  
  const reset = () => {
    setValue('');
  }
  
  let component = {
    type,
    value,
    onChange,
    reset,
  }
  
  return Object.defineProperties(component, { reset: { enumerable: false }});
};