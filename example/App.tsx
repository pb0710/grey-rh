import React, { FC } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.scss'
import ExampleIndex from './views/ExampleIndex'

const App: FC = () => {
	return (
		<div className="example">
			<div className="nav-bar">
				<Link to="/">
					<div className="nav-item">Index</div>
				</Link>
			</div>
			<div className="content">
				<Routes>
					<Route path="/">
						<Route index element={<ExampleIndex />} />
					</Route>
				</Routes>
			</div>
		</div>
	)
}

export default App
