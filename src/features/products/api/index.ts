import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType } from '@/lib/react-query';
import { ContentsPayload, ProductsPayload } from '../types';
import { PagePath } from '@/types';

const endpoints = {
	content: '/content',
	products: '/products'
} as const;

type Endpoint = typeof endpoints[keyof typeof endpoints];

const getItems = <Tpayload>(endpoint: Endpoint) => ({ page }: { page: PagePath }): Promise<Tpayload> => {
	return axios.get(endpoint, {
		params: {
			page
		}
	});
};

const getProducts = getItems<ProductsPayload>(endpoints.products);

const getContent = getItems<ContentsPayload>(endpoints.content);

type ProductQueryFnType = typeof getProducts;

type ContentQueryFnType = typeof getContent;

type UseFetchOptions = {
	page: PagePath;
};

export const useProducts = ({ page }: UseFetchOptions) => {
	return useQuery<ExtractFnReturnType<ProductQueryFnType>>({
		queryKey: ['products', page],
		queryFn: () => getProducts({ page }),
	});
};

export const useContent = ({ page }: UseFetchOptions) => {
	return useQuery<ExtractFnReturnType<ContentQueryFnType>>({
		queryKey: ['content', page],
		queryFn: () => getContent({ page }),
	});
};