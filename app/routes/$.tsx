import type { MetaFunction } from '@remix-run/node';
import type { Language } from '~/types/language.type';
import { Container } from '~/components/Container';

export const meta: MetaFunction = ({ matches }) => {
	const { metaContent } = matches.find(match => match.id === 'root')?.data as {
		language: Language;
		metaContent: any;
	};

	const title = metaContent['not_found'].title;
	const description = metaContent['not_found'].description;

	return [{ title }, { name: 'description', content: description }];
};

export default function NotFound() {
	return (
		<Container
			as='main'
			className='flex h-full flex-col items-center justify-center'
		>
			<h1 className='font-nabla select-none scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
				404!
			</h1>
		</Container>
	);
}
