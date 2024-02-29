import type { LayoutServerLoad } from './$types';
import { defaultLocale } from '$lib/i18n';

export const load: LayoutServerLoad = ({ params }) => {
	const locale = params.locale || defaultLocale;
	return {
		locale
	};
};
