import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Box } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react'
import useForceUpdate from 'use-force-update';

const Header = ({ supabase, isOpenRegister, isOpenLogin, onOpenLogin, onOpenRegister, onCloseLogin, onCloseRegister, setLoginEmailInput, setLoginPasswordInput, }) =>
{
	const forceUpdate = useForceUpdate();



	async function handleLogOut()
	{
		await supabase.auth.signOut()
		forceUpdate();

	}

	async function handleDeleteAccount()
	{

		const { data: user, error } = await supabase.auth.api.deleteUser(
			supabase.auth.currentUser.id,
			process.env.REACT_APP_SERVICE_KEY
		)
		await supabase.auth.signOut()
		forceUpdate();
		console.log(user);
		console.log(error);
	}

	return (
		<Box h="64px" w="100%" display="flex" justifyContent="flex-end" alignItems="center">
			<ButtonGroup>
				{
					supabase.auth.currentUser !== null ?
						(
							<>
								<Button colorScheme='teal' variant='outline'>{supabase.auth.currentUser.user_metadata.username}</Button>
								<Button onClick={handleLogOut} colorScheme='teal' variant='outline'>Log out</Button>
								{/* <Button onClick={handleDeleteAccount} colorScheme='teal' variant='outline'>Delete Account</Button> */}

							</>
						)
						:
						<>
							<Button onClick={onOpenLogin} colorScheme='teal' variant='outline'>Log in</Button>
							<Button onClick={onOpenRegister} colorScheme='teal' variant='outline'>Register</Button>
						</>
				}

			</ButtonGroup>
			<ColorModeSwitcher justifySelf="flex-end" />
		</Box>
	)
}

export default Header
