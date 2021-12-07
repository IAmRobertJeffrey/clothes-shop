import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/modal'
import { FormControl } from '@chakra-ui/form-control'
import { FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

const RegisterModal = ({ supabase, initialRef, finalRef, onClose, isOpen, setRegisterUsernameInput, registerUsernameInput, setRegisterPasswordInput, registerPasswordInput, setRegisterEmailInput, registerEmailInput }) =>
{


	async function handleRegister()
	{
		if (registerPasswordInput && registerEmailInput && registerUsernameInput)
		{


			const { user, session, error } = await supabase.auth.signUp({ email: registerEmailInput, password: registerPasswordInput }, {
				data: {
					username: registerUsernameInput
				}
			})
			console.log(user);
			console.log(session);
			console.log(error);
			onClose();
			setRegisterUsernameInput("")
			setRegisterEmailInput("")
			setRegisterPasswordInput("")
		}
	}
	function handleClose()
	{
		setRegisterUsernameInput("")
		setRegisterPasswordInput("")
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
				<ModalHeader>Create Your Account</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Email</FormLabel>
						<Input type="email" value={registerEmailInput} onChange={(e) => setRegisterEmailInput(e.target.value)} ref={initialRef} placeholder='Email' />
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Username</FormLabel>
						<Input type="text" value={registerUsernameInput} onChange={(e) => setRegisterUsernameInput(e.target.value)} placeholder='Password' />
					</FormControl>

					<FormControl mt={4}>
						<FormLabel>Password</FormLabel>
						<Input type="password" value={registerPasswordInput} onChange={(e) => setRegisterPasswordInput(e.target.value)} placeholder='Password' />
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button onClick={handleRegister} colorScheme='blue' mr={3}>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default RegisterModal
