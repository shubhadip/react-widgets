import * as React from 'react';
import { useImperativeHandle, useState } from 'react';
import { validationHandler } from '../shared/validations';
import styles from './input.module.css';

const Input = React.forwardRef((props: any, ref: any) => {
  const [value, setValue] = useState(props.value || '');
  const [error, setError] = useState(null);

  const {
    placeholder = '',
    type = 'text',
    customWrapperClass = '',
    customInputClass = ''
  } = props;

  useImperativeHandle(ref, () => ({
    getValue() {
      return value || '';
    },
    isValid(showError: any) {
      let validationObj;
      validationObj = validationHandler(value, props.validations);
      if (!validationObj.isValid && showError) {
        setError(validationObj.message);
      }
      return validationObj.isValid;
    },
    resetValue() {
      setValue('');
    },
  }));

  const handleFocus = () => {
    setError(null);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
    if (!props.isDebounced) {
      if (props.onChange) {
        props.onChange(e.target.value);
      }
    }
  };

  return (
    <div className={[styles.inputWrapper, customWrapperClass].join(' ')}>
      <input
        className={[styles.input, customInputClass].join(' ')}
        type={type}
        name={props.name}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        ref={ref}
        onFocus={() => handleFocus()}
        autoComplete={'off'}
        value={value}
      />
      {error ? <p className={styles.error}> {error}</p> : null}
    </div>
  );
});

Input.displayName = 'Input';


export default Input;