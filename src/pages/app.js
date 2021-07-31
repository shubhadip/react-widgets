import React from "react"
import TestOne from './../test-one/test-one.widget';

function App() {
	return (<div className="p-20">
		<TestOne />
		<h3 className="text-red">Date : {new Date().toDateString()}</h3>
	</div>)
}

export default App