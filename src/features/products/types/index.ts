export type Product = {
	product_id: number,
	title: string,
	image: string
}

export type ContentItem = {
	type: string,
	contents: string,
	position: string
}


export type ContentsPayload = {
	data: ContentItem[]
}

export type ProductsPayload = {
	products: Product[];
}