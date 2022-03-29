import * as React from 'react';
import { useState, useEffect, useRef, useImperativeHandle, SyntheticEvent } from 'react'
import { IGenericOption } from '../shared/interfaces';
import styles from './dropdown.module.css'

interface IProps {
	options: {x: string}[]
	placeholder?: string
	disabled?: boolean
	searchable?: boolean
	clearable?: boolean
	mobileMode?: boolean
	dropdownVariant?: 'fullscreen' | 'bottom'
	label?: string
	validations?: {x:string}[]
	autoValidate?: boolean
	optionLabel?: string
	valueLabel?: string
	panelLabel?: string
	searchPlaceholder?: string
	tip?: string
	addon?: any
	id: string
	labelShrink?: boolean
	variant?: string
	emptyListMsg?: string
	arrowRight?: boolean
	autoFocus?: boolean
	clearInvalidInput?: boolean
	defaultValue?: string
	handleSelect?: Function
	opinionatedValue?: string | boolean | number
	showAlphabetAsPreText?: boolean
};

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const AlphabetArray = alpha.map((x) => String.fromCharCode(x));

const SingleSelect = React.forwardRef((props: IProps, ref: any) => {
	const [isOpen, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const refContainer = useRef(null);
	const [data, setData] = useState(props.options || [])
	const [value, setValue] = useState(props.defaultValue || '');
	const searchRef = useRef(null);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	useImperativeHandle(ref, () => ({
		getValue() {
		  return value || '';
		},
		isValid() {
		  return true;
		},
		resetValue() {
		  setValue('');
		},
	  }));

	function selectItem(index : number, event: SyntheticEvent) {
		if (data.length) {
			const selectedFilteredItem = data[index] as IGenericOption;
			const selectedValue = selectedFilteredItem[props.valueLabel || 'value'];
			setValue(selectedValue)
			if(props.handleSelect){
				props.handleSelect(selectedValue, props);
			}
			closeDropdown();
		}
	}

	function handleMouseup(event: MouseEvent) {
		const target = event.target;
		if (refContainer.current) {
			const element = refContainer.current;
			if (!(element === target || element.contains(target))) {
				closeDropdown();
			}
		}
	}

	function handleKeydown(event : KeyboardEvent) {
		const { key } = event;
		const totalItems = data.length;
		if (totalItems) {
			const currentIndex = highlightedIndex;
			if (key === 'ArrowUp') {
				const updatedIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
				// highlightIndex(updatedIndex);
				return;
			}

			if (key === 'ArrowDown') {
				const updatedIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
				// highlightIndex(updatedIndex);
			}
		}

		// hande any other keys here.
	}

	function closeDropdown(){
		unbindEvents();
		if (props.mobileMode) {
			// removeBodyOverflow();
			const dialogDOM = [...document.getElementsByClassName('app-dialog') as any];
			if (dialogDOM.length > 0) {
				dialogDOM.forEach((ele) => {
					(ele).classList.remove('scroll-freeze');
				});
			}
		}
		setOpen(false)
	};

	function unbindEvents() {
		document.removeEventListener('keydown', handleKeydown);
		document.removeEventListener('keyup', handleKeyup);
		if (!props.mobileMode) {
			document.removeEventListener('mouseup', handleMouseup);
		}
	}

	function isDropdownActive() {
		const { activeElement } = document;
		if (activeElement) {
			if (refContainer.current) {
				const dropdown = refContainer.current;
				return dropdown === activeElement || dropdown.contains(activeElement);
			}
		}
		return false;
	}

	function handleKeyup(event: KeyboardEvent) {
		const { key } = event;
		if (key === 'Escape') {
			closeDropdown();
			return;
		}
		if (key === 'Tab') {
			if (!isDropdownActive()) {
				closeDropdown();
			}
			return;
		}
		
		const totalItems = data.length;
		if (totalItems) {
			if (key === 'Enter') {
				// selectItem(highlightedIndex.value, event);
			}
		}
	};

	function bindEvents() {
		document.addEventListener('keyup', handleKeyup);
      if (!props.mobileMode) {
        document.addEventListener('mouseup', handleMouseup);
      }
	};

	useEffect(() => {
		if(isOpen) {
			bindEvents()
		}else {
			unbindEvents()
		}
	},[isOpen])

	const onFocus = () => {
		setOpen(true);
	};

	const close = () => {
		setOpen(false);
	};
	let ddStyles = '';
	if(props.dropdownVariant === 'fullscreen') {
		ddStyles = styles.cInput__panel__fullscreen
	}else if (props.dropdownVariant === 'bottom') {
		ddStyles = styles.cInput__panel__bottom
	}else if (props.dropdownVariant === 'mobile') {
		ddStyles = styles.cInput__panel__bottom
	}

	const labelFloat =  !!(value || props.labelShrink);

	const dynamicBorderColor = !value ? '' : (value === props.opinionatedValue ? styles.cInput_borderCorrect : styles.cInput_borderInCorrect)
	const dynamicTextColor = !value ? styles.cInput__selectValue : (value === props.opinionatedValue ? styles.cInput_Correct : styles.cInput_InCorrect)

	return (
		<span ref={ref}>
			{ props.mobileMode && isOpen ? <div className={styles.cInput__overlay} onClick={closeDropdown}></div> : null }
			<div className={[styles.cInput, dynamicBorderColor].join(' ')} ref={refContainer} >
			{ value ? <div className={[dynamicTextColor].join(' ')}>{ value }</div> : null}
			{ props.label && !value ? <div className={[dynamicTextColor].join(' ')}>{ props.label }</div> : null}
			<input
				id={props.id}
				type="text"
				className={styles.cInput__selectInput}
				disabled={props.disabled}
				readOnly
				onClick={() =>onFocus()}
				autoComplete="off"
				placeholder={props.placeholder}
			/>
				{ isOpen ? <div 
				className={[styles.cInput__panel, ( props.mobileMode ? styles.cInput__panel__mobile : ''),
					props.mobileMode ? ddStyles : '',].join(' ')}
				>
					{ isOpen ? <a className={styles.cInput____panelClose} onClick={close}></a> : null}
					{ props.panelLabel ? <div className={styles.cInput__panelTitle} >{ props.panelLabel }</div> : null}
					{ props.mobileMode && isOpen ? <a className={styles.cInput__panelClose} onClick={closeDropdown}></a> : null }
					{
						props.searchable ? <div className={styles.cInput__search}>
						<input
							type="text"
							ref={searchRef}
							value={search}
							tabIndex={-1}
							onChange={(e)=>{ setSearch(e.target.value)}}
							placeholder={props.searchPlaceholder}
							autoComplete="off"
						/>
						{ props.clearable && search.length ? <a
							className={styles.cInput__searchClear}
							tabIndex={-1}
							onClick={() => {}}
						>
						</a> : null }
					</div>: null }
					<ul className={styles.cInput__options}>
					{ data.length === 0 ? <li className={styles.cInput__optionEmpty} >{ 'emptyListMsg' }</li> : null }
				{
								data.map((i: any, index: number) => {
									const dynamicClass = !value ? '' : (i.value === value ? (
										value === props.opinionatedValue ? styles.cInput__optionSelectedCorrect : styles.cInput__optionSelectedWrong
									) : '');
									return (
										<li className={[styles.cInput__option, 
											(dynamicClass)
										].join(' ')}
											onMouseEnter={() => {}}
											onClick={(e) =>selectItem(index,e)}
											key={i.label}
											
										>
											{ props.showAlphabetAsPreText ? <span className={styles.alphaLabel}>{AlphabetArray[index]}</span> : null}
											<span>{i.label}</span>
										</li>
									)
								})
							}
			</ul>
				</div> : null
				}
		</div>
		</span>
	)
});

SingleSelect.displayName = 'SingleSelect';

export default SingleSelect;