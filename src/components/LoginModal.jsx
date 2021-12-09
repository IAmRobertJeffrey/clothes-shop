import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal'
import { FormControl } from '@chakra-ui/form-control'
import { FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { useContext } from 'react'
import BasketContext from '../contexts/BasketContext'

const LoginModal = ({ onClose, isOpen, initialRef, finalRef, setLoginPasswordInput, loginPasswordInput, setLoginEmailInput, loginEmailInput }) =>
{

	const {
		getBasket, supabase
	} = useContext(BasketContext);


	async function handleLogin()
	{
		if (loginPasswordInput && loginEmailInput)
		{
			const { user, session, error } = await supabase.auth.signIn({ email: loginEmailInput, password: loginPasswordInput })
			console.log(user);
			console.log(session);
			console.log(error);
			getBasket(supabase.auth.currentUser.id)
			onClose();
			setLoginEmailInput("")
			setLoginPasswordInput("")

		}
	}
	function handleClose()
	{
		setLoginEmailInput("")
		setLoginPasswordInput("")
		onClose();
	}
	return (
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={handleClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Log in</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input type="email" value={loginEmailInput} onChange={(e) => setLoginEmailInput(e.target.value)} ref={initialRef} placeholder='Email' />
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Password</FormLabel>
						<Input type="password" value={loginPasswordInput} onChange={(e) => setLoginPasswordInput(e.target.value)} placeholder='Password' />
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button onClick={handleLogin} colorScheme='blue' mr={3}>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default LoginModal
