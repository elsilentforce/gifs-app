
import { useState } from 'react';


export const useCounter = (initialValue: number = 10) => {
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(prevState => prevState + 1);
  }

  const handleSubstract = () => {
    setCounter(prevState => prevState - 1);
  }

  const handleReset = () => {
    setCounter(initialValue);
  }

  return {
    // Values
    counter,
    // Methods
    handleAdd,
    handleSubstract,
    handleReset
  }
}
