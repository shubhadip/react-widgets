import React, { useState, useRef, useEffect } from "react"
import SingleSelect from "../Dropdown/Dropdown.widget";
import Input from './../Input/Input.widget';

function App(props) {
	const selectRef = useRef(null);
	const ipRef = useRef(null);

	const [value, setValue] = useState({
		name: 'test1',
		value: 'test1'
	})
	
	const items = [{
		label: 'test1',
		value: 'Test1'
	},{
		label: 'test2',
		value: 'Test2'
	}]

	const handleChange = (e, value) => {
		setValue(value)
	};

	const handleSelect = (values, actualProps) => {
		console.log('values', values);
		console.log('props', actualProps);
	};

	const handleClick = () => {
		console.log(selectRef)
		console.log(ipRef)
	};

	return (<div className="">
		<Input 
			ref={ipRef}
		/>
		<div>
		<SingleSelect 
			options={items}
			handleSelect={handleSelect}
			searchable={true}
			ref={selectRef}
			placeholder="Select a value"
			label="Select"
			mobileMode={false}
			autoValidate={true}
			validations={[]}
			variant="bordered"
			id="input1"
			correctValue="Test1"
			opinionatedValue="Test1"
			showAlphabetAsPreText={true}
		/>
		{/* <p>mobile bottom</p>
		<SingleSelect 
			options={items}
			handleSelect={handleSelect}
			searchable={true}
			ref={selectRef}
			placeholder="Select a value"
			label="Select"
			mobileMode={true}
			autoValidate={true}
			dropdownVariant={'bottom'}
			validations={[]}
			id="input1"
		/>
		<p>mobile fullscreen</p>
		<SingleSelect 
			options={items}
			handleSelect={handleSelect}
			searchable={true}
			ref={selectRef}
			placeholder="Select a value"
			label="Select"
			mobileMode={true}
			autoValidate={true}
			dropdownVariant={'fullscreen'}
			validations={[]}
			id="input1"
		/> */}
		<button onClick={handleClick}>Click</button>
		</div>
		{/* <div>
			{
				items.map((item) => {
					return (
						<label>
							<span>
								<input 	
									type="radio"
									value={item.value}
									disabled={item.disabled || props.disabled}
									id={props.id + item.value}
									checked={item.value === value.value}
									onChange={(e) => handleChange(e, item)}
								/>
							</span>
							<span>{item.name}</span>
						</label>
					)
				})
			}
		</div> */}
	</div>)
}

export default App