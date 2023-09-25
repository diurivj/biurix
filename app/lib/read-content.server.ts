import fs from 'node:fs/promises';
import type { Language } from '~/types/language.type';

export async function getContentFromFile(path: string, lang: Language) {
	console.log(path);
	const file = await fs.readFile(path);
	const json = JSON.parse(file.toString('utf-8'));
	return json[lang];
}
