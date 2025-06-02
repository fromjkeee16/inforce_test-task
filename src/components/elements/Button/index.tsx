import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = props => {
  return (
    <button {...props} className={classNames(styles.button, props.className)} />
  );
};
