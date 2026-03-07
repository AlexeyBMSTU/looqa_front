import { Input } from 'antd';
import { ChangeEvent, useCallback, useState } from 'react';
import DOMPurify from 'dompurify';

interface InputComponentProps {
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export const InputComponent = ({
  defaultValue = '',
  onChange,
  ...rest
}: InputComponentProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      setValue(sanitizedValue);
      onChange?.(sanitizedValue);
    },
    [onChange]
  );

  return <Input value={value} onChange={handleChange} {...rest} />;
};
