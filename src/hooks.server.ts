import type { Handle } from '@sveltejs/kit';
import { availableLocales, defaultLocale } from '$lib/i18n';

export const handle: Handle = async ({ resolve, event }) => {
	let locale: string = defaultLocale;
	availableLocales.forEach((l) => {
		if (event.url.pathname.startsWith(`/${l}`)) {
			locale = l;
		}
	});
	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%locale%', locale)
	});
};
