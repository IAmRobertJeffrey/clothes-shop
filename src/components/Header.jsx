import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Box } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

import { MdOutlineShoppingBasket } from 'react-icons/md'
import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { FaShoppingBasket } from 'react-icons/fa'

const Header = ({ supabase, shoppingBasket, isOpenRegister, isOpenLogin, forceUpdate, onOpenLogin, onOpenRegister, onCloseLogin, onCloseRegister, setLoginEmailInput, setLoginPasswordInput, }) =>
{




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
		<Box h="64px" w="100%" display="flex" justifyContent="space-between" alignItems="center" pl="4">
			<Link to="/"><Button p="2" fontSize="2xl" variant="link">Shop</Button></Link>

			<ButtonGroup>
				{
					supabase.auth.currentUser !== null ?
						(
							<>
								<Link to="/basket"><Button colorScheme='teal' variant="outline"><FaShoppingBasket />&nbsp;{shoppingBasket.length && ` ${shoppingBasket.length}`}</Button></Link>
								<Link to="/profile"><Button colorScheme='teal' variant='outline'>{supabase.auth.currentUser.user_metadata.username}</Button></Link>
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

				<ColorModeSwitcher justifySelf="flex-end" />
			</ButtonGroup>
		</Box>
	)
}

export default Header
