import React from 'react'
import { createContext, useState, } from 'react'
import { createClient } from '@supabase/supabase-js'
const BasketContext = createContext({})
export const BasketProvidor = ({ children }) =>
{
	const [shoppingBasket, setShoppingBasket] = useState([])
	const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY)
	async function handleAddProduct(productId)
	{
		console.log(productId);
		const { data, error } = await supabase
			.from('basket')
			.insert([
				{ name: 'The Shire', country_id: 554 }
			])

		console.log(data);
		if (data)	
		{

			setShoppingBasket(data)
		}
		else
		{
			console.log(error);
		}

	}


	async function getBasket()
	{
		const { data, error } = await supabase
			.from('basket')
			.select(`
				id,
				product:product_id ( id, product_name, product_price, image )
				`)

		console.log(data);
		if (data)	
		{

			setShoppingBasket(data)
		}
		else
		{
			console.log(error);
		}


	}


	return (
		<BasketContext.Provider value={{
			handleAddProduct,
			shoppingBasket,
			setShoppingBasket,
			getBasket,
			supabase

		}}>
			{children}
		</BasketContext.Provider>
	)
}

export default BasketContext
