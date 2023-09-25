import { type DataFunctionArgs } from '@remix-run/node';
import { serializeLangCookie } from '~/utils/language.server';

export async function action({ request }: DataFunctionArgs) {
	const formData = await request.formData();
	const language = formData.get('language') || 'en';

	console.log('triggered');

	if (typeof language !== 'string') {
		throw new Error('Invalid language');
	}

	return new Response(null, {
		headers: {
			'Set-Cookie': await serializeLangCookie(language)
		}
	});
}
