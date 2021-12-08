import { Box, Container, ListIcon, ListItem } from '@chakra-ui/layout'
import React from 'react'
import { Text } from '@chakra-ui/layout'
import { List } from '@chakra-ui/react'
import { Image } from '@chakra-ui/image'
import { Button } from '@chakra-ui/button'

const Basket = ({ supabase, shoppingBasket, setShoppingBasket }) =>
{

	return (

		<Box height="100%" display="flex" justifyContent="center" flexDirection="column">
			<Container shadow="md" rounded="lg" justifySelf="center" display="flex" flexDirection="column" p="10" bg="gray.700" w="100%">
				<List display="flex" flexDirection="column" gridGap="5" >
					{shoppingBasket.map((current) => (
						<ListItem shadow="md" bg="#FFFFFF0A" rounded="lg" overflow="hidden" display="flex" flexDirection="row" h="150" w="100%" key={current.id}>
							<Box h="150px" w="150px" display="flex">
								<Image h="100%" w="100%" objectFit='cover' alt="shopping item" src={current.product.image} />
							</Box>
							<Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="space-between" p="4">
								<Text>{current.product.product_name}</Text>
								<Button colorScheme="teal" display="flex" justifySelf="flex-end"  >Remove</Button>
							</Box>
						</ListItem>

					))}
				</List>
			</Container>
		</Box>
	)
}

export default Basket
