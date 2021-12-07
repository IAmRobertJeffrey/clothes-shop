import { Container } from '@chakra-ui/layout'
import React from 'react'
import { useEffect } from 'react'
import Product from '../components/Product'
import Masonry from 'react-masonry-css'
import '../style.css'
import { Text } from '@chakra-ui/layout'

const Home = ({ supabase, products, setProducts }) =>
{
	const breakpointColumnsObj = {
		default: 3,
		1500: 2,
		1000: 1,
		500: 1
	};

	useEffect(() =>
	{

		async function getProducts()
		{
			const products = await supabase.from("product")

			setProducts(products.data)
		}
		getProducts()
	}, [supabase, setProducts])

	return (
		<Container display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" width="100%" maxW="100%">
			<Text fontSize="7xl">Welcome to Rob's shop</Text>
			<Container p="2rem" width="60%" maxW="60%">
				<Text textAlign="left">This is a fake shopping website for the purpose of demonstrating what I can make. <b> Nothing on this website can actually be purchased.</b> You can register a new account, login, logout, delete your account, change your login details, browse my fake catalog and add items to your basket. Below are three examples of items you can find in my catalog.</Text>
			</Container>
			<Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid"
				columnClassName="my-masonry-grid_column">
				{

					products.map((current) => (

						current.id < 4 && (<Product key={current.id} current={current} />)


					))}

			</Masonry>
		</Container>
	)
}

export default Home
