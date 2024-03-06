<script lang="ts">
	import { onMount } from 'svelte';
	import { pushState } from '$app/navigation';
	import { currentLocale, _ } from '$lib/i18n';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	const sections = ['about', 'works', 'contact'];

	const getSectionByPath = () => {
		let match: boolean | string = false;
		sections.forEach((section) => {
			if ($page.url.pathname.endsWith(section)) {
				match = section;
			}
		});
		return match || sections[0];
	};

	const scrollToSection = (sectionId: string, behavior: ScrollBehavior) => {
		if (!browser) return;
		const section = document.querySelector(`#${sectionId}`) as HTMLElement;
		const top = section.getBoundingClientRect().top + document.documentElement.scrollTop;
		scrollTo({
			top,
			behavior
		});
		previousSection = sectionId;
	};

	const watchCurrentSection = async (scrollPosition: number) => {
		if (!browser) return;
		const heightOffset = 45 / 100;
		const thresholds = sections.map((section) => {
			let el = document.querySelector(`#${section}`) as HTMLElement;
			return el.getBoundingClientRect().top + document.documentElement.scrollTop;
		});
		for (let i = thresholds.length - 1; i >= 0; i--) {
			if (scrollPosition >= thresholds[i] - window.innerHeight * heightOffset) {
				if (currentSection != sections[i]) {
					pushState(`/${$currentLocale}/${sections[i]}`, {
						title: $_(`title.${sections[i]}`),
						section: sections[i]
					});
				}
				break;
			}
		}
	};

	onMount(() => {
		previousSection = currentSection;
		scrollToSection(currentSection, 'smooth');
		window.addEventListener('scroll', async () => {
			await watchCurrentSection(window.scrollY);
		});
		window.addEventListener('scrollend', () => {
			if (previousSection != currentSection) {
				scrollToSection(currentSection, 'smooth');
			}
		});
	});

	let currentSection: string;
	let previousSection: string;
	let pageTitle: string;
	$: {
		currentSection = $page.state.section || getSectionByPath();
		pageTitle = $page.state.title || $_(`title.${getSectionByPath()}`);
		pageTitle += ' - ' + $_('title.main');
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<nav>
	<ul>
		{#each sections as section}
			<li>
				<a
					href="/{$currentLocale}/{section}"
					on:click|preventDefault={() => {
						scrollToSection(section, 'smooth');
					}}
					aria-current={currentSection === section ? 'page' : false}>{$_(`nav.${section}`)}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style lang="scss">
	nav {
		display: flex;
		justify-content: flex-end;
		position: fixed;
		top: 28px;
		right: $root-margin-y;
		z-index: 2;
	}
	ul {
		display: flex;
		flex-direction: column;
		text-align: right;
	}
	a {
		text-transform: lowercase;
		text-decoration: none;
		color: transparent;
		font-size: 1.8rem;
		font-weight: bold;
		-webkit-text-stroke: 1px #cfcfcf;
		transition: all 270ms;
	}
	a[aria-current='page'] {
		color: $root-font-color;
	}
</style>
