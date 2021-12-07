import React from 'react'
import { Divider, VStack } from '@chakra-ui/layout'
import { Container } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/color-mode'

const Profile = ({ supabase, forceUpdate, newUsernameInput, setNewUsernameInput, oldPasswordInput, newPasswordInput, verifyNewPasswordInput, setNewPasswordInput, setOldPasswordInput, setVerifyNewPasswordInput }) =>
{
	const { colorMode } = useColorMode();
	async function updateUsername(e)
	{
		e.preventDefault();
		const { data, user, error } = await supabase.auth.update({ data: { username: newUsernameInput } })

		if (!error)
		{
			setNewUsernameInput("")
			forceUpdate()



			console.log(error);
		}
	}

	async function updatePassword(e)
	{
		e.preventDefault();
		if (newPasswordInput === verifyNewPasswordInput)
		{

			const { data, user, error } = await supabase.auth.update({ password: newPasswordInput })
			setNewPasswordInput("")
			setVerifyNewPasswordInput("")
			console.log(error);
		}




	}



	return (
		<Container w="100%" h="100%" display="flex" alignItems="center">
			<VStack w="100%" h="100%" display="flex" justifyContent="center" alignItems="center">

				<Container shadow="lg" w="100%" p="10" bg={colorMode === "dark" ? "gray.700" : "gray.200"} rounded="lg" display="flex" flexDirection="column">

					<form onSubmit={(e) => updateUsername(e)}>
						<FormControl >
							<Text>Change Username</Text>
							<FormLabel>New Username</FormLabel>
							<Input focusBorderColor={colorMode === "light" ? "teal.500" : "teal.200"} variant="filled" type="text" value={newUsernameInput} onChange={(e) => setNewUsernameInput(e.target.value)} placeholder={supabase.auth.currentUser.user_metadata.username} />
							<Button type="submit" mt="2" colorScheme="teal" w="100%">Submit</Button>
						</FormControl>
					</form>

					<form onSubmit={(e) => updatePassword(e)}>
						<FormControl>
							<Text mt="10">Change password</Text>

							<FormLabel>New Password</FormLabel>
							<Input focusBorderColor={colorMode === "light" ? "teal.500" : "teal.200"} variant="filled" type="password" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} placeholder='Password' />

							<FormLabel pt="5">Verify New Password</FormLabel>
							<Input focusBorderColor={colorMode === "light" ? "teal.500" : "teal.200"} variant="filled" type="password" value={verifyNewPasswordInput} onChange={(e) => setVerifyNewPasswordInput(e.target.value)} placeholder='Password' />
							<Button type="submit" mt="2" colorScheme="teal" w="100%">Submit</Button>
						</FormControl>
					</form>

				</Container>

			</VStack>
		</Container>
	)
}

export default Profile
