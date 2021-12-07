import { Container } from '@chakra-ui/layout'
import React from 'react'
import { useEffect } from 'react'
import Product from '../components/Product'
import Masonry from 'react-masonry-css'
import '../style.css'

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
		<Container display="flex" justifyContent="center" width="100%" maxW="100%">
			<Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid"
				columnClassName="my-masonry-grid_column">
				{

					products.map((current) => (
						<Product key={current.id} current={current} />
					))}

			</Masonry>
		</Container>
	)
}

export default Home
