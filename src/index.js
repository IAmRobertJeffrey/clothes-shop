import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import './style.css'
import { BasketProvidor } from './contexts/BasketContext';

ReactDOM.render(
	<StrictMode>
		<ColorModeScript />
		<BrowserRouter>
			<BasketProvidor>
				<App />
			</BasketProvidor>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);


