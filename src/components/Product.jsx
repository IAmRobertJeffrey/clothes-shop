import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import { Text } from '@chakra-ui/layout'
import { useColorMode } from '@chakra-ui/color-mode'

const Product = ({ current }) =>
{
	const { colorMode } = useColorMode();
	return (
		<Box display="flex"
			boxSizing="border-box"
			flexDirection="column"
			bg={colorMode === "light" ? "gray.200" : "gray.700"}
			rounded="lg"
			overflow="hidden"
			shadow="lg"
			w="100%"
			h="500px">
			<img style={{ objectFit: "cover", height: "50%", width: "100%" }} alt="clothing" key={current.id} src={current.image} />

			<Box display="flex" p="5" isTruncated justifyContent="space-between">{current.product_name} <Button colorScheme="blue">{current.sex === "male" && "Men"}{current.sex === "female" && "Women"}{current.sex === "unisex" && "Unisex"}</Button></Box>
			<Box flexGrow="1" display="flex" p="5"><Text height="3rem" fontSize="sm" noOfLines="2" >{current.product_description}</Text></Box>
			<Box justifyContent="space-between" display="flex" p="5">&#163;{current.product_price} <Button colorScheme="teal">Add To Basket</Button></Box>

		</Box>
	)
}

export default Product
