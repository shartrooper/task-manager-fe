import { ADD_CHUNK, LARGE_PAGE } from "@/config"
import { useContent, useProducts } from "../api"
import { useMemo, useState } from "react";
import { Product, ContentItem } from "../types";
import { InView } from "react-intersection-observer";
import { ProductModal } from "@/features/modal";


const milestoneRows: Record<number, string> = {
	1: 'row-start-1',
	3: 'row-start-3',
	13: 'row-start-13',
	21: 'row-start-21',
	38: 'row-start-38',
	61: 'row-start-61',
	100: 'row-start-100',
}

export const GridCard: React.FC<{ fields: Product, handleClick: (product: Product) => void }> = ({ fields, handleClick }) => {
	return <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-x cursor-pointer" onClick={() => handleClick(fields)}>
		<img src={fields.image}
			alt="Product" 
			className="h-80 w-72 object-cover rounded-t-xl" 
			loading="lazy"
			/>
		<div className="px-4 py-3 w-72">
			<span className="text-gray-400 mr-3 uppercase text-xs">ID: {fields.product_id}</span>
			<p className="text-lg font-bold text-black truncate block capitalize">{fields.title}</p>
		</div>
	</div>
}

export const Grid: React.FC<{ cards: Product[], contents: ContentItem[], cardCallback: (product: Product) => void }> = ({ cards, contents, cardCallback }) => {

	const rowPosition = (pos: string) => parseInt(pos.split('-')[1]);

	return <div className="pt-2 w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 
	justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5
	">
		{contents.map(content => {
			const position = rowPosition(content.position);
			const milestoneStyle = `${milestoneRows[position]} col-span-full`;
			return <div key={content.position} className={milestoneStyle} dangerouslySetInnerHTML={{ __html: content.contents }} />
		}
		)}
		{cards.map((card, index) => <GridCard key={`product-${index}`} fields={card} handleClick={cardCallback} />)}
	</div>
}

export const GridContainer: React.FC = () => {
	const { data: products, isLoading: productLoading } = useProducts({ page: LARGE_PAGE });
	const { data: content, isLoading: contentLoading } = useContent({ page: LARGE_PAGE });
	const [chunk, setChunk] = useState(ADD_CHUNK);
	const [modalContent, setModalContent] = useState<Product>();

	const handleCardClick = (content: Product) => {
		setModalContent(content);
	};

	const handleCloseModal = () => {
		setModalContent(undefined);
	};

	const cardItemsChunk = useMemo(() => {
		if (!products) return [];
		return products.products.slice(0, chunk);
	}, [products, chunk]);

	const isDataLoading = productLoading && contentLoading;

	return <section className="mt-20">
		{isDataLoading && <>Loading!</>}
		{!isDataLoading && <Grid cards={cardItemsChunk} contents={content?.data ?? []} cardCallback={handleCardClick} />}
		<InView
			rootMargin="100px 0px"
			onChange={async (inView) => inView && setChunk(prev => prev + 9)}
		/>
		<ProductModal product={modalContent} onClose={handleCloseModal} />
	</section>
}