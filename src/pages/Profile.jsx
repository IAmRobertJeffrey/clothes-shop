import React from 'react'
import { Divider, VStack } from '@chakra-ui/layout'
import { Container } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useEffect } from 'react'

const Profile = ({ supabase, forceUpdate, newUsernameInput, setNewUsernameInput, oldPasswordInput, newPasswordInput, verifyNewPasswordInput, setNewPasswordInput, setOldPasswordInput, setVerifyNewPasswordInput }) =>
{

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

				<Container shadow="lg" w="100%" p="10" bg="gray.700" rounded="lg" display="flex" flexDirection="column">

					<form onSubmit={(e) => updateUsername(e)}>
						<FormControl >
							<Text>Change Username</Text>
							<FormLabel>New Username</FormLabel>
							<Input type="text" value={newUsernameInput} onChange={(e) => setNewUsernameInput(e.target.value)} placeholder={supabase.auth.currentUser.user_metadata.username} />
							<Button type="submit" mt="2" bg="teal" w="100%">Submit</Button>
						</FormControl>
					</form>
					<Divider my="5" bg="white" />
					<form onSubmit={(e) => updatePassword(e)}>
						<FormControl>
							<Text >Change password</Text>

							<FormLabel>New Password</FormLabel>
							<Input type="password" value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} placeholder='Password' />

							<FormLabel pt="5">Verify New Password</FormLabel>
							<Input type="password" value={verifyNewPasswordInput} onChange={(e) => setVerifyNewPasswordInput(e.target.value)} placeholder='Password' />
							<Button type="submit" mt="2" bg="teal" w="100%">Submit</Button>
						</FormControl>
					</form>

				</Container>

			</VStack>
		</Container>
	)
}

export default Profile
