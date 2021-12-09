import { Box, Container, ListIcon, ListItem } from '@chakra-ui/layout'
import React from 'react'
import { Text } from '@chakra-ui/layout'
import { List } from '@chakra-ui/react'
import { Image } from '@chakra-ui/image'
import { Button } from '@chakra-ui/button'
import { useContext, useState, useEffect } from 'react'
import BasketContext from '../contexts/BasketContext'

const Basket = () =>
{
	const {
		shoppingBasket, getBasket, supabase, removeFromBasket
	} = useContext(BasketContext);


	const [currentPriceTotal, setCurrentPriceTotal] = useState(0)

	useEffect(() =>
	{
		let tempPrice = 0;
		shoppingBasket.map((current) =>
		{
			tempPrice += current.product.product_price;

		})
		setCurrentPriceTotal(tempPrice.toFixed(2))
	}, [shoppingBasket])

	return (

		<Box height="100%" display="flex" justifyContent="center" width="100%" alignItems="center" flexDirection="column">
			<Box shadow="md" rounded="lg" justifySelf="center" display="flex" width="50%" maxW="50%" flexDirection="column" bg="gray.700" w="100%">
				<List display="flex" flexDirection="column" maxH="600px" overflow="auto" p="10" gridGap="5" >
					{shoppingBasket.map((current) => (


						<ListItem shadow="md" bg="#FFFFFF0A" rounded="lg" overflow="hidden" display="flex" flexDirection="row" h="100px" minH="100px" w="100%" key={current.id}>
							<Box h="150px" w="150px" display="flex">
								<Image h="100%" w="100%" objectFit='cover' alt="shopping item" src={current.product.image} />
							</Box>
							<Box w="100%" h="100%" display="flex" alignItems="center" justifyContent="space-between" p="4">
								<Text>{current.product.product_name}</Text>
								<Box display="flex" gridGap="5">
									<Text>&#163;{current.product.product_price}</Text>
									<Button onClick={() => removeFromBasket(current.id)} colorScheme="teal" display="flex" justifySelf="flex-end"  >Remove</Button>
								</Box>
							</Box>
						</ListItem>

					))}
					<Box display="flex" justifyContent="flex-end" gridGap="10" alignItems="center">
						<Box display="flex" gridGap="2">
							<Text>Total:</Text><Text>&#163;{currentPriceTotal}</Text>
						</Box>
						<Button alignSelf='flex-end' width="3xs" minH="50px" colorScheme="teal">Continue to checkout</Button>
					</Box>
				</List>

			</Box>
		</Box>
	)
}

export default Basket
