import { Container } from '@chakra-ui/layout'
import React from 'react'
import { useEffect } from 'react'

const Catalog = ({ supabase }) =>
{


	useEffect(() =>
	{

		async function getCertainCategory(category)
		{
			const { data, error } = await supabase
				.from('product')
				.select().like('sex', category)

			console.log(data);
			console.log(error);
		}

		getCertainCategory("female")


	}, [supabase])

	return (
		<Container display="flex" justifyContent="center" h="100%" w="100%" maxW="100%">
			{

			}

		</Container>
	)
}

export default Catalog
