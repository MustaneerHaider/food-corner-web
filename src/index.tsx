import React from 'react';
import ReactDOM from 'react-dom';
import './globals.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
