import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useAutocomplete = ({ options, currentOptions = [], onCurrentOptionsChange  }) => {
  const { uid } = useSelector((state) => state.auth);

  const currentOptionsFiltered = useMemo(
    () =>
      currentOptions
        .filter(({ user }) => user._id !== uid)
        .map(({ user }) => ({
          label: user.name,
          id: user._id,
          isChecked: true,
        })),
    [currentOptions, uid]
  ); //Evita que el componente se renderice de manera innecesaria muchas veces

  const [optionSelected, setOptionSelected] = useState(null);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(currentOptionsFiltered);
  const [value, setValue] = useState('');

  useEffect(() => {
    const newOptions = currentOptionSelected.map( option => ( { user: option.id } ))
    onCurrentOptionsChange(newOptions);
  }, [currentOptionSelected, onCurrentOptionsChange]);

  const handleOptionChange = useCallback(({ target }) => {
    const optionFiltered = options.find((option) => option.email === target.value && option.id !== uid);
    if (optionFiltered) {
      const isInCurrent = currentOptionSelected.some((currentOption) => currentOption.id === optionFiltered.id);
      setOptionSelected({
        label: optionFiltered.name,
        id: optionFiltered.id,
        isChecked: isInCurrent,
      });
      setValue(optionFiltered.email);
    } else {
      setOptionSelected(null);
      setValue(target.value);
    }
  }, [options, currentOptionSelected, uid]);

  const handleSelectOption = useCallback(() => {
    setCurrentOptionSelected((prev) => [
      ...prev,
      {
        ...optionSelected,
        isChecked: true,
      },
    ]);
    setOptionSelected(null);
    setValue('');
  }, [optionSelected]);

  const handleRemoveOption = useCallback((optionId) => {
    setCurrentOptionSelected((prev) => prev.filter((option) => option.id !== optionId));
  }, []);

  return {
    optionSelected,
    handleOptionChange,
    currentOptionSelected,
    handleSelectOption,
    handleRemoveOption,
    value,
  };
};