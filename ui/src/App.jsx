import { Header } from "./components/header/Header";
import './styles/app.scss';
import {  Route, Routes } from 'react-router-dom';
import { Post } from "./pages/post/Post";
import { Logs } from "./pages/logs/Logs";

function App() {
	return <div className='app'>
		<Header/>
		<Routes>
			<Route path="/post" element={<Post/>} />
			<Route path="/logs" element={<Logs/>} />
		</Routes>
	</div>;
}

export default App;
