import React from 'react';
import
{
	ChakraProvider,
	Box,
	theme,
} from '@chakra-ui/react';
import Header from './components/Header';

import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import useForceUpdate from 'use-force-update';
import Basket from './pages/Basket';
import Catalog from './pages/Catalog';
import { useEffect } from 'react';
import BasketContext from './contexts/BasketContext';
import { useContext } from 'react';


// Create a single supabase client for interacting with your database



function App()
{
	const {
		isOpen: isOpenRegister,
		onOpen: onOpenRegister,
		onClose: onCloseRegister
	} = useDisclosure()
	const {
		isOpen: isOpenLogin,
		onOpen: onOpenLogin,
		onClose: onCloseLogin
	} = useDisclosure()
	const initialRef = React.useRef()
	const finalRef = React.useRef()

	const [registerUsernameInput, setRegisterUsernameInput] = useState("")
	const [registerPasswordInput, setRegisterPasswordInput] = useState("")
	const [registerEmailInput, setRegisterEmailInput] = useState("")

	const [loginPasswordInput, setLoginPasswordInput] = useState("")
	const [loginEmailInput, setLoginEmailInput] = useState("")

	const [newUsernameInput, setNewUsernameInput] = useState("")
	const [oldPasswordInput, setOldPasswordInput] = useState("")
	const [newPasswordInput, setNewPasswordInput] = useState("")
	const [verifyNewPasswordInput, setVerifyNewPasswordInput] = useState("")


	const [products, setProducts] = useState([])
	const [categories, setCategories] = useState([])
	const forceUpdate = useForceUpdate()
	const [catalogProducts, setCatalogProducts] = useState([]);

	const {
		setShoppingBasket, shoppingBasket, getBasket, supabase
	} = useContext(BasketContext);

	useEffect(() =>
	{
		if (supabase.auth.currentUser)
		{

			getBasket(supabase.auth.currentUser.id)
		}
	})



	return (
		<ChakraProvider theme={theme}>
			<Box textAlign="center" h="100%" fontSize="xl">
				<Box h="100%" display="flex" flexDirection="column">
					<Header categories={categories} setCategories={setCategories} products={products} shoppingBasket={shoppingBasket} forceUpdate={forceUpdate} supabase={supabase} isOpenRegister={isOpenRegister} isOpenLogin={isOpenLogin} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} onCloseLogin={onCloseLogin} onCloseRegister={onCloseRegister} />

					<RegisterModal onOpen={onOpenRegister} onClose={onCloseRegister} isOpen={isOpenRegister} supabase={supabase} registerEmailInput={registerEmailInput} setRegisterEmailInput={setRegisterEmailInput} registerPasswordInput={registerPasswordInput} setRegisterPasswordInput={setRegisterPasswordInput} registerUsernameInput={registerUsernameInput} setRegisterUsernameInput={setRegisterUsernameInput} initialRef={initialRef} finalRef={finalRef} />
					<LoginModal onOpen={onOpenLogin} onClose={onCloseLogin} isOpen={isOpenLogin} supabase={supabase} loginEmailInput={loginEmailInput} setLoginEmailInput={setLoginEmailInput} loginPasswordInput={loginPasswordInput} setLoginPasswordInput={setLoginPasswordInput} initialRef={initialRef} finalRef={finalRef} />

					<Routes>
						<Route path="/" element={<Home supabase={supabase} setProducts={setProducts} products={products} />} />
						<Route path="/profile" element={<Profile supabase={supabase} forceUpdate={forceUpdate} newUsernameInput={newUsernameInput} setNewUsernameInput={setNewUsernameInput} oldPasswordInput={oldPasswordInput} newPasswordInput={newPasswordInput} verifyNewPasswordInput={verifyNewPasswordInput} setNewPasswordInput={setNewPasswordInput} setOldPasswordInput={setOldPasswordInput} setVerifyNewPasswordInput={setVerifyNewPasswordInput} />} />
						<Route path="/basket" element={<Basket shoppingBasket={shoppingBasket} setShoppingBasket={setShoppingBasket} supabase={supabase} forceUpdate={forceUpdate} newUsernameInput={newUsernameInput} setNewUsernameInput={setNewUsernameInput} oldPasswordInput={oldPasswordInput} newPasswordInput={newPasswordInput} verifyNewPasswordInput={verifyNewPasswordInput} setNewPasswordInput={setNewPasswordInput} setOldPasswordInput={setOldPasswordInput} setVerifyNewPasswordInput={setVerifyNewPasswordInput} />} />
						<Route path="/catalog/:type" element={<Catalog catalogProducts={catalogProducts} setCatalogProducts={setCatalogProducts} supabase={supabase} />} />
					</Routes>
				</Box>


			</Box>
		</ChakraProvider>
	);
}

export default App;
