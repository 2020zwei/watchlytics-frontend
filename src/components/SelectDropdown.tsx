import React from 'react';
import Select, { MultiValue, ActionMeta } from 'react-select';

export type OptionType = {
  value: string | number;
  label: string;
};

type SelectDropdownProps = {
  options: OptionType[];
  value: OptionType[]; // Assuming multi-select
  isMulti?: boolean;
  onChange: (selected: OptionType[], removed?: OptionType) => void;
  placeholder?: string;
  isSearchable?: boolean;
  classNamePrefix?: string;
  style:any
};

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  isSearchable = false,
  isMulti = true,
  classNamePrefix = 'multi-select',
  style
}) => {
  const handleChange = (
    newValue: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    let removed: OptionType | undefined;

    if (actionMeta.action === 'remove-value' || actionMeta.action === 'pop-value') {
      removed = value.find((item) => !newValue.some((i) => i.value === item.value));
    }
    // console.log(removed,'removed')

    onChange(newValue as OptionType[], removed);
  };

  return (
    <Select
      isMulti={isMulti}
      options={options}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      isSearchable={isSearchable}
      classNamePrefix={classNamePrefix}
      styles={style}
    />
  );
};

export default SelectDropdown;
