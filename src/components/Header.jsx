import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Box } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react'

const Header = () =>
{

	function handleLogin()
	{

	}

	function handleRegister()
	{


	}

	return (
		<Box h="64px" w="100%" display="flex" justifyContent="flex-end" alignItems="center">
			<ButtonGroup>
				<Button onClick={handleLogin} colorScheme='teal' variant='outline'>Login</Button>
				<Button onClick={handleRegister} colorScheme='teal' variant='outline'>Register</Button>
			</ButtonGroup>
			<ColorModeSwitcher justifySelf="flex-end" />
		</Box>
	)
}

export default Header
