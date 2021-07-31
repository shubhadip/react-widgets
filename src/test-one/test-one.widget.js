import React, { useState } from 'react';
import './test-one.css';

const MOTOR_REGISTRATION_REGEX = new RegExp(/^[A-Za-z]{2}[-]{0,1}[0-9]{1,2}[-]{0,1}[A-Za-z]{0,3}[-]{0,1}[0-9]{2,4}$/);

function RegistrationInput(props) {

  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  
  console.log('props',props);
  
  const handleProceed = () => {
    const isTwoWheeler = props.productType === 'bike';
    if(MOTOR_REGISTRATION_REGEX.test(value)){
      window.location.href=`https://www.paytminsurance.co.in/motor/${isTwoWheeler ? 'twowheeler' : 'fourwheeler'}?regno=${value}&proceed=1`
    }else{
      setError(value.length ? 'Please enter a valid registration number' : 'Registration number is required');
    }
  };

  return (
    <div className="p-20 regnumber">
      <input 
        autoFocus={true}
        type="text"
        name="regInput"
        tabIndex={0}
        value={value}
        onChange={e => {
          setValue(e.target.value);
          setError('')
        }}
        type="text" 
        className="block regnumber_input p-16 font-bold text-16" 
        placeholder="Enter Vehicle Number"
      />
      {
        !!error ? <span className="text-red text-12 mt-4">{error}</span> : ''
      }
      <button 
        className="bg-blue border-blue block my-20 text-white text-16 tracking-0 cursor-pointer rounded-6 regnumber_btn font-bold p-16"
        onClick={handleProceed}>
        Proceed
      </button>
    </div>
  )
}
export default RegistrationInput;