import { createCookie } from '@remix-run/node';
import { supportedLanguages, type Language } from '~/types/language.type';

export const langCookie = createCookie('lang');

export async function serializeLangCookie(lang: string) {
	return langCookie.serialize(lang);
}

export async function deserializeLangCookie(request: Request) {
	const cookieHeader = request.headers.get('Cookie');
	return langCookie.parse(cookieHeader) || {};
}

export async function getUserLanguage(request: Request): Promise<Language> {
	const cookieHeader = request.headers.get('Cookie');
	const cookieValue = await langCookie.parse(cookieHeader);

	if (!cookieValue) {
		const langs = request.headers.get('Accept-Language')?.split(',') || [''];
		const language = getPrimaryLanguage(langs);
		return language;
	}

	if (supportedLanguages.includes(cookieValue as Language)) {
		return cookieValue as Language;
	}

	return 'en';
}

function getPrimaryLanguage(languages: Array<string>): Language {
	const primary = languages[0];
	const sanitized = primary.split('-')[0];

	if (supportedLanguages.includes(sanitized as Language)) {
		return sanitized as Language;
	}

	return 'en';
}
