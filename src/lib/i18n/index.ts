import { derived, readable, writable } from 'svelte/store';

const localeFiles = import.meta.glob('./*.json');

const getLocaleCode = (fileName: string): string => {
	return fileName.replaceAll(/.(\/|json|default)/g, '');
};

const getDictionnaries = async () => {
	const dictionnaries: Dictionnaries = {};
	for (const fileName in localeFiles) {
		const lf = (await localeFiles[fileName]()) as LocalFile;
		dictionnaries[getLocaleCode(fileName)] = lf.default;
	}
	return dictionnaries;
};

const dictionnaries = readable(await getDictionnaries());

export const availableLocales: string[] = Object.keys(localeFiles).map((fileName) => {
	return getLocaleCode(fileName);
});

export const defaultLocale = getLocaleCode(
	Object.keys(localeFiles).find((fileName) => {
		return fileName.includes('.default');
	}) as string
);

export const currentLocale = writable(defaultLocale);

export const _ = derived(
	[dictionnaries, currentLocale],
	([$dictionnaries, $currentLocale]) =>
		(tag: string, locale: string | null = null) => {
			if (!locale) {
				locale = $currentLocale;
			}
			if (!$dictionnaries[locale][tag]) {
				return `${tag} not available`;
			}
			return $dictionnaries[locale][tag];
		}
);
