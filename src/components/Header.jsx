import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Box } from '@chakra-ui/layout';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { MdOutlineShoppingBasket } from 'react-icons/md'
import { IconButton } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/icon';
import { FaShoppingBasket } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

const Header = ({ categories, setCategories, supabase, products, shoppingBasket, isOpenRegister, isOpenLogin, forceUpdate, onOpenLogin, onOpenRegister, onCloseLogin, onCloseRegister, setLoginEmailInput, setLoginPasswordInput, }) =>
{
	const location = useLocation()
	useEffect(() =>
	{

		async function getCategories()
		{
			const categories = await supabase.from("category")

			setCategories(categories.data)
		}
		getCategories()
	}, [supabase, setCategories])



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
		<>
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
			</Box >
			{
				location.pathname !== "/profile" && location.pathname !== "/basket" && location.pathname !== "/login" && location.pathname !== "/register" ?
					<Box>
						<ButtonGroup gridGap="5">
							<Link to="/catalog"><Button variant="link" colorScheme="blue">Men</Button></Link>
							<Link to="/catalog"><Button variant="link" colorScheme="blue">Women</Button></Link>
							<Link to="/catalog"><Button variant="link" colorScheme="blue">Unisex</Button></Link>
						</ButtonGroup>
					</Box>
					:
					null
			}

		</>
	)
}

export default Header
