import { FC } from 'react';

type InputProps = {
  /**
   * 输入框的值
   */
  value?: string;
};

export const Input: FC<InputProps> = (props) => {
  console.log(props);
  return <input />;
};
