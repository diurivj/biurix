import type { MetaFunction } from '@remix-run/node';
import type { Language } from '~/types/language.type';
import { Container } from '~/components/Container';

export const meta: MetaFunction = ({ matches }) => {
	const { metaContent } = matches.find(match => match.id === 'root')?.data as {
		language: Language;
		metaContent: any;
	};

	const title = metaContent['_index'].title;
	const description = metaContent['_index'].description;

	return [{ title }, { name: 'description', content: description }];
};

export default function Index() {
	return (
		<Container
			as='main'
			className='flex h-full flex-col items-center justify-center'
		>
			<h1 className='font-nabla select-none scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				diurivj
			</h1>
		</Container>
	);
}
