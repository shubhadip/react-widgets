import * as React from  'react';
import { IBaseInputAddonProps, BaseInputStyle, BaseInputAddonPosition, BaseInputElement, IBaseInputProps } from '../shared/interfaces';

import styles from './inputwrapper.module.css';

interface IProps  {
	staticLabel?: string
	id?: string
	labelText?: string
	variant?: string
	addon?: string
	error?: boolean
	labelShrink?: boolean
	focused?: boolean
	disabled?: boolean
	hasAddonStart?: boolean
	hasAddonEnd?: boolean
	addonEnd?: any
	addonStart?: any
	helperText?: boolean
	helperComponent?: any
	handleFocusInput?: Function
	children: React.ReactChild | React.ReactChildren;
	element?: 'input' | 'multiline' | 'select' | 'select-menu'
}

const InputWrapper = (props:IProps) => {

	 /**
     * classes for various addon types available through 'adonProps' slotscope context
     * textClass - for text
     * buttonIconClass - button type icon
     * iconClass - svg icon
     */
    const addonProps: IBaseInputAddonProps = {
      textClass: styles.cInput__addontext,
      buttonIconClass: styles.cInput__btn,
      iconClass: styles.cInput__icon
    };

    const isBordered = props.variant === BaseInputStyle.Bordered;
    const isUnderline =  props.variant === BaseInputStyle.Underline;
    const hasAddonStart =  props.addon === BaseInputAddonPosition.Start;
    const hasAddonEnd =  props.addon === BaseInputAddonPosition.End;

		const handleFocus = () => {
			if(props.handleFocusInput){
				props.handleFocusInput()
			}
		};

		const inputProps = (): IBaseInputProps => {
        const { element } = props;
        const elementClass: { [key: string]: string } = {
          [BaseInputElement.Input]: 'c-input__input',
          [BaseInputElement.Multiline]: 'c-input__multiline',
          [BaseInputElement.Select]: 'c-input__select',
          [BaseInputElement.SelectMenu]: 'c-input__select c-input__select-menu',
        };
        return {
          inputClass: [ styles.cInput__elem, `${elementClass[element]}` ].join(' '),
          id: props.id,
          selectIconClass: styles.cInput__selecticon,
          customIconClass: styles.cInput__customicon,
          selectListClass: styles.cInput__selectmenulist,
          errorClass: styles.cInput__error,
          helperClass: styles.cInput__helper,
        };
      }

    return (
        <div className={styles.cInput}>
            {props.staticLabel ? <div className={[
							styles.cInput__slabel,
							(isUnderline ? styles.cInput__slabelul: null)
							(isBordered ? styles.cInput__slabelbr: null)
						].join(' ')}>
							{ props.staticLabel }
							</div> : <>
							<label
							className={[styles.cInput__label, (isUnderline ? styles.cInput__labelul : null),
								(isBordered ? styles.cInput__labelbr : null),
								(props.labelShrink ? styles.cInput__labelshrink : null), (props.error ? 'iserror': null)].join(' ')}
							htmlFor={props.id}
						>
							{ props.labelText }
						</label>
						</>}
						<div
						className={[styles.cInput__base, 
							( isUnderline ? styles.cInput__baseul: null),
							( isBordered ? styles.cInput__basebr: null),
							( hasAddonStart ? styles.cInput__baseaddonstart: null),
							( hasAddonEnd ? styles.cInput__baseaddonend: null),
							( props.focused ? styles.isfocused: null),
							( props.error ? styles.iserror: null),
							( props.disabled ? styles.isdisabled: null),
							( props.staticLabel ? styles.cInput__basesbase: null),
						].join(' ')}
						>
							{ props.staticLabel ?<div className={[styles.cInput__splaceholder, (isUnderline ? styles.cInput__splaceholderul : null ),
								(isBordered ? styles.cInput__splaceholderbr : null )].join(' ')}>
									{ !props.labelShrink ? props.labelText : '' }
							</div> : null }
							{ props.hasAddonStart ? <div v-if="" className="c-input__addon-start" onClick={handleFocus}>
								{/* props handling <slot name="addon" v-bind:addonProps="addonProps" /> */}
								{props.addonStart}
							</div> : null }
							{/* <slot v-bind:inputProps="inputProps" /> */}
							{props.children}
							{ props.hasAddonEnd  ? <div className="c-input__addon-end" onClick={handleFocus}>
								{/* props handling <slot name="addon" v-bind:addonProps="addonProps" /> */}
								{props.addonEnd}
							</div> : null }
						</div>
						{/* props handling <slot name="helper-text" v-bind:inputProps="inputProps"></slot> */}
						{ props.helperText ? props.helperComponent : null }
      </div>
    )
}

export default InputWrapper;