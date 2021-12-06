import React from 'react';
import
{
	ChakraProvider,
	Box,
	Grid,
	theme,
} from '@chakra-ui/react';
import Header from './components/Header';

function App()
{
	return (
		<ChakraProvider theme={theme}>
			<Box textAlign="center" fontSize="xl">
				<Grid minH="100vh" >
					<Header />

				</Grid>
			</Box>
		</ChakraProvider>
	);
}

export default App;
