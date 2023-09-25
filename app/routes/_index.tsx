import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
	return [
		{ title: 'New Remix App' },
		{ name: 'description', content: 'Welcome to Remix!' }
	];
};

export default function Index() {
	return (
		<main>
			<h1 className='text-sm underline'>hello!</h1>
		</main>
	);
}
