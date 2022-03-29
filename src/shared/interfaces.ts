export interface IGenericOption {
    [x:string]: string
}

export enum BaseInputStyle {
    Bordered = 'bordered',
    Underline = 'underline',
  }
  
  export enum BaseInputElement {
    Input = 'input',
    Multiline = 'multiline',
    Select = 'select',
    SelectMenu = 'select-menu',
  }
  
  export enum BaseInputAddonPosition {
    Start = 'start',
    End = 'end',
  }
  

  export interface IBaseInputAddonProps {
    buttonIconClass: string;
    iconClass: string;
    textClass: string;
  }
  
  export interface IBaseInputProps {
    inputClass: string;
    id: string;
    selectIconClass: string;
    selectListClass: string;
    errorClass?: string;
    helperClass?: string;
    customIconClass?: string;
  }