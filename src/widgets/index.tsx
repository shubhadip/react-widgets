import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './../assets/css/app-main.css';

const requireContextWidgets = (require as any).context(
	'../',
	true,
	/\.widget.tsx?$/
)
const widgetsPathList = requireContextWidgets.keys()

const widgetMap = {}
const widgetCodeRegex = /[a-z-A-Z]+(?=\.widget\.tsx?$)/
for (const path of widgetsPathList) {
	(widgetMap as any)[widgetCodeRegex.exec(path)[0]] = requireContextWidgets(path)
}

function loadWidget(widgetCode: any, containerId : any,props: any = {}) {
	const widgetLoader = (widgetMap as any)[widgetCode]
	if (widgetLoader) {
		const node = document.getElementById(containerId)
		if (node) {
			widgetLoader(function (Component: any) {
				Component = Component.default || Component
				console.log('Component', Component)
				debugger
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
(window as any)['loadWidget'] = loadWidget
export default widgetMap
