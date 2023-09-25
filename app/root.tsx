import { cssBundleHref } from '@remix-run/css-bundle';
import {
	json,
	type DataFunctionArgs,
	type LinksFunction
} from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData
} from '@remix-run/react';
import { getUserLanguage } from './utils/language.server';
import { getContentFromFile } from './lib/read-content.server';
import { Nav, type NavContent } from './components/Nav';

import styles from '~/tailwind.css';

export const links: LinksFunction = () => [
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous'
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Nabla&display=swap'
	},
	{ rel: 'stylesheet', href: styles },
	...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : [])
];

export async function loader({ request }: DataFunctionArgs) {
	const language = await getUserLanguage(request);

	const navContent = (await getContentFromFile(
		'app/content/nav.json',
		language
	)) as NavContent;

	const metaContent = await getContentFromFile(
		'app/content/meta.json',
		language
	);

	// TODO: cache data
	return json(
		{ language, navContent, metaContent },
		{
			headers: {
				'Cache-Control': 'public, max-age=604800, s-maxage=604800'
			}
		}
	);
}

export default function App() {
	const { language, navContent } = useLoaderData<typeof loader>();

	return (
		<html lang='en' className='h-full'>
			<head>
				{/* TODO: Add better meta */}
				<link
					rel='icon'
					href='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>&#129312;</text></svg>'
				/>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body className='dark h-full'>
				<Nav language={language} content={navContent} />
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
