import type { Handle, Reroute } from '@sveltejs/kit';
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

const translated: Record<string, string> = {
	'/en/about': '/en',
	'/en/works': '/en',
	'/en/contact': '/en',
	'/fr/about': '/fr',
	'/fr/works': '/fr',
	'/fr/contact': '/fr'
};

export const reroute: Reroute = ({ url }) => {
	if (url.pathname in translated) {
		return translated[url.pathname];
	}
};
