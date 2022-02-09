import { Box, ListItem } from '@chakra-ui/layout'
import React from 'react'
import { Text } from '@chakra-ui/layout'
import { List } from '@chakra-ui/react'
import { Image } from '@chakra-ui/image'
import { Button } from '@chakra-ui/button'
import { useContext, useState, useEffect } from 'react'
import BasketContext from '../contexts/BasketContext'
import { useColorMode } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


const Basket = () =>
{
	const navigate = useNavigate();
	const { colorMode } = useColorMode();

	const {
		shoppingBasket, removeFromBasket, supabase
	} = useContext(BasketContext);

	function redirectHome()
	{
		navigate("/")
	}

	const [currentPriceTotal, setCurrentPriceTotal] = useState(0)

	useEffect(() =>
	{
		let tempPrice = 0;
		shoppingBasket.map((current) => tempPrice += current.product.product_price)
		setCurrentPriceTotal(tempPrice.toFixed(2))
	}, [shoppingBasket])

	return (

		supabase.auth.currentUser ?
			<Box height="100% - 48px" display="flex" justifyContent="center" width="100%" alignItems="center" flexDirection="column" padding="50px">
				<Box shadow="md" rounded="lg" justifySelf="center" display="flex" width="50%" maxW="50%" flexDirection="column" bg={colorMode === "dark" ? "gray.700" : "gray.200"} w="100%">
					<List display="flex" flexDirection="column" overflow="auto" p="10" gridGap="5" >
						{shoppingBasket.map((current) => (


							<ListItem shadow="md" bg={colorMode === "dark" ? "#FFFFFF0A" : "gray.300"} rounded="lg" overflow="hidden" display="flex" flexDirection="row" h="100px" minH="100px" w="100%" key={current.id}>
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
			:
			<div onLoadStart={redirectHome()}></div>
	)
}

export default Basket
