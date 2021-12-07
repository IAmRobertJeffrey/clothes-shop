import React from 'react';
import
{
	ChakraProvider,
	Box,
	Grid,
	theme,
} from '@chakra-ui/react';
import Header from './components/Header';
import { Text } from '@chakra-ui/react'
import { createClient } from '@supabase/supabase-js'
import RegisterModal from './components/RegisterModal';
import LoginModal from './components/LoginModal';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import useForceUpdate from 'use-force-update';
import Basket from './pages/Basket';


// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY)


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

	const [shoppingBasket, setShoppingBasket] = useState([])
	const [products, setProducts] = useState([])
	const forceUpdate = useForceUpdate()

	return (
		<ChakraProvider theme={theme}>
			<Box textAlign="center" h="100%" fontSize="xl">
				<Box h="100%" display="flex" flexDirection="column">
					<Header shoppingBasket={shoppingBasket} forceUpdate={forceUpdate} supabase={supabase} isOpenRegister={isOpenRegister} isOpenLogin={isOpenLogin} onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} onCloseLogin={onCloseLogin} onCloseRegister={onCloseRegister} />

					<RegisterModal onOpen={onOpenRegister} onClose={onCloseRegister} isOpen={isOpenRegister} supabase={supabase} registerEmailInput={registerEmailInput} setRegisterEmailInput={setRegisterEmailInput} registerPasswordInput={registerPasswordInput} setRegisterPasswordInput={setRegisterPasswordInput} registerUsernameInput={registerUsernameInput} setRegisterUsernameInput={setRegisterUsernameInput} initialRef={initialRef} finalRef={finalRef} />
					<LoginModal onOpen={onOpenLogin} onClose={onCloseLogin} isOpen={isOpenLogin} supabase={supabase} loginEmailInput={loginEmailInput} setLoginEmailInput={setLoginEmailInput} loginPasswordInput={loginPasswordInput} setLoginPasswordInput={setLoginPasswordInput} initialRef={initialRef} finalRef={finalRef} />

					<Routes>
						<Route path="/" element={<Home supabase={supabase} setProducts={setProducts} products={products} />} />
						<Route path="/profile" element={<Profile supabase={supabase} forceUpdate={forceUpdate} newUsernameInput={newUsernameInput} setNewUsernameInput={setNewUsernameInput} oldPasswordInput={oldPasswordInput} newPasswordInput={newPasswordInput} verifyNewPasswordInput={verifyNewPasswordInput} setNewPasswordInput={setNewPasswordInput} setOldPasswordInput={setOldPasswordInput} setVerifyNewPasswordInput={setVerifyNewPasswordInput} />} />
						<Route path="/basket" element={<Basket supabase={supabase} forceUpdate={forceUpdate} newUsernameInput={newUsernameInput} setNewUsernameInput={setNewUsernameInput} oldPasswordInput={oldPasswordInput} newPasswordInput={newPasswordInput} verifyNewPasswordInput={verifyNewPasswordInput} setNewPasswordInput={setNewPasswordInput} setOldPasswordInput={setOldPasswordInput} setVerifyNewPasswordInput={setVerifyNewPasswordInput} />} />

					</Routes>
				</Box>


			</Box>
		</ChakraProvider>
	);
}

export default App;
