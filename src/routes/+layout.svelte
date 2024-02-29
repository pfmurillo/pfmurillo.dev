<script lang="ts">
	import { page } from '$app/stores';
	import { currentLocale } from '$lib/i18n';
	$: $currentLocale = $page.data.locale;
</script>

<slot />
