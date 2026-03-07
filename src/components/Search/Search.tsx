import { ChangeEvent, useCallback, useState } from 'react';
import DOMPurify from 'dompurify';
import Search from 'antd/es/input/Search'

interface SearchComponentProps {
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const SearchComponent = ({
  defaultValue = '',
  onChange,
  ...rest
}: SearchComponentProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      setValue(sanitizedValue);
      onChange?.(sanitizedValue);
    },
    [onChange]
  );

  return <Search allowClear value={value} onChange={handleChange} {...rest} />;
};
