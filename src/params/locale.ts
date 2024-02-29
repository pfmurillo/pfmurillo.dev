import type { ParamMatcher } from '@sveltejs/kit';
import { availableLocales } from '$lib/i18n';

export const match: ParamMatcher = (param) => {
	return availableLocales.includes(param);
};
