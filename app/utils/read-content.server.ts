import type { Language } from '~/types/language.type';
import fs from 'node:fs/promises';

export async function getContentFromFile(path: string, lang: Language) {
	const file = await fs.readFile(path);
	const json = JSON.parse(file.toString('utf-8'));
	return json[lang];
}
