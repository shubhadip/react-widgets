import React from 'react'
import ReactDOM from 'react-dom'
import './../assets/css/app-main.css';

const requireContextWidgets = require.context(
	'../',
	true,
	/\.widget.js?$/
)
const widgetsPathList = requireContextWidgets.keys()

const widgetMap = {}
const widgetCodeRegex = /[a-z-A-Z]+(?=\.widget\.js?$)/
for (const path of widgetsPathList) {
	widgetMap[widgetCodeRegex.exec(path)[0]] = requireContextWidgets(path)
}

function cfLoadWidget(
	widgetCode,
	containerId,
	props = {}
) {
	const widgetLoader = widgetMap[widgetCode]
	if (widgetLoader) {
		const node = document.getElementById(containerId)
		if (node) {
			widgetLoader(function (Component) {
				Component = Component.default || Component
				console.log('Component', Component)
				const renderDom = () =>
					ReactDOM.render(
						<Component {...props} />,
						node
					)
				renderDom()
			})
			return () => ReactDOM.unmountComponentAtNode(node)
		} else {
			throw `Container id(${containerId}) is not valid.`
		}
	} else {
		throw `Widget code(${widgetCode}) is not valid.`
	}
}
console.log('called')
window['testWidget'] = () => { console.log('i am called') }
window['cfLoadWidget'] = cfLoadWidget
export default widgetMap
