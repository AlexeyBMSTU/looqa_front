import { Input } from 'antd';
import DOMPurify from 'dompurify';
import { ChangeEvent, ReactNode, useCallback } from 'react';

interface InputComponentProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  prefix?: ReactNode;
  type?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export const InputComponent = ({
  onChange,
  value,
  ...rest
}: InputComponentProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      onChange?.(sanitizedValue);
    },
    [onChange]
  );

  return <Input value={value} onChange={handleChange} {...rest} />;
};
