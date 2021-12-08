import { Container } from '@chakra-ui/layout'
import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useParams } from 'react-router'
import Product from '../components/Product'
import Masonry from 'react-masonry-css'

const Catalog = ({ supabase, catalogProducts, setCatalogProducts, handleAddProduct }) =>
{
	const breakpointColumnsObj = {
		default: 3,
		1500: 2,
		1000: 1,
		500: 1
	};
	const location = useLocation();
	const { type } = useParams()
	console.log(type);
	useEffect(() =>
	{

		async function getCertainCategory(category)
		{
			const { data, error } = await supabase
				.from('product')
				.select().like('sex', category)

			console.log(data);
			setCatalogProducts(data)
			console.log(error);
		}

		const sexes = new Map()
		sexes.set("men", "male")
		sexes.set("women", "female")
		sexes.set("unisex", "unisex")
		getCertainCategory(sexes.get(type))



	}, [supabase, location, type, setCatalogProducts])

	return (
		<Container display="flex" justifyContent="center" w="100%" maxW="100%" pt="10">
			<Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid"
				columnClassName="my-masonry-grid_column">
				{
					catalogProducts.map((current) => (
						<Product key={current.id} handleAddProduct={() => handleAddProduct(current)} current={current} />
					))
				}
			</Masonry>
		</Container>
	)
}

export default Catalog
