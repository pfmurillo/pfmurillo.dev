<script lang="ts">
	import 'reset-css';
	import '../app.scss';
	import { page } from '$app/stores';
	import { currentLocale } from '$lib/i18n';
	$: $currentLocale = $page.data.locale;
	import Nav from '$lib/components/Nav.svelte';
</script>

<header><Nav /></header>
<main><slot /></main>
