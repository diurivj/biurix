import type { MetaFunction } from '@remix-run/node';
import { Container } from '~/components/Container';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' }
	];
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
