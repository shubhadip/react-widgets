"use strict";(self.webpackChunkreact_widgets=self.webpackChunkreact_widgets||[]).push([[692],{378:(e,t,r)=>{r.r(t),r.d(t,{default:()=>c});var n=r(294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],u=!0,l=!1;try{for(r=r.call(e);!(u=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);u=!0);}catch(e){l=!0,a=e}finally{try{u||null==r.return||r.return()}finally{if(l)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l=new RegExp(/^[A-Za-z]{2}[-]{0,1}[0-9]{1,2}[-]{0,1}[A-Za-z]{0,3}[-]{0,1}[0-9]{2,4}$/);const c=function(e){var t,r=o((0,n.useState)(""),2),u=r[0],c=r[1],i=o((0,n.useState)(""),2),s=i[0],b=i[1];return console.log("props",e),n.createElement("div",{className:"p-20 regnumber"},n.createElement("input",(a(t={autoFocus:!0,type:"text",name:"regInput",tabIndex:0,value:u,onChange:function(e){c(e.target.value),b("")}},"type","text"),a(t,"className","block regnumber_input p-16 font-bold text-16"),a(t,"placeholder","Enter Vehicle Number"),t)),s?n.createElement("span",{className:"text-red text-12 mt-4"},s):"",n.createElement("button",{className:"bg-blue border-blue block my-20 text-white text-16 tracking-0 cursor-pointer rounded-6 regnumber_btn font-bold p-16",onClick:function(){var t="bike"===e.productType;l.test(u)?window.location.href="https://www.paytminsurance.co.in/motor/".concat(t?"twowheeler":"fourwheeler","?regno=").concat(u,"&proceed=1"):b(u.length?"Please enter a valid registration number":"Registration number is required")}},"Proceed"))}}}]);