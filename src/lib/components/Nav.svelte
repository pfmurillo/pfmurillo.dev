<script lang="ts">
	import { onMount } from 'svelte';
	import { pushState } from '$app/navigation';
	import { currentLocale, _ } from '$lib/i18n';
	import { page } from '$app/stores';

	const sections = [
		{
			id: 'intro',
			inNav: false
		},
		{
			id: 'about',
			inNav: true
		},
		{
			id: 'works',
			inNav: true
		},
		{
			id: 'contact',
			inNav: true
		}
	];

	let scrollY: number = 0;
	let currentSectionId: string | undefined;
	let previousSectionId: string | undefined;

	const getSectionIdByPath = (path: string): string | undefined => {
		let sectionId;
		sections.forEach((section) => {
			if (section.inNav && path.endsWith(section.id)) {
				sectionId = section.id;
			}
		});
		return sectionId;
	};

	const getSectionIdByScrollY = (scrollY: number): string | undefined => {
		let sectionId;
		const windowOffest = window.innerHeight * 0.4;
		const thresholds = sections.map((section) => {
			return getSectionTop(section.id) - windowOffest;
		});
		for (let i = thresholds.length - 1; i >= 0; i--) {
			if (scrollY >= thresholds[i]) {
				if (currentSectionId != sections[i].id) {
					sectionId = sections[i].id;
				}
				break;
			}
		}
		return sectionId;
	};

	const getSectionTop = (id: string): number => {
		const node = document.querySelector(`#${id}`) as HTMLElement;
		return node.getBoundingClientRect().top + document.documentElement.scrollTop;
	};

	const scrollToSectionTop = (id: string) => {
		scrollTo({
			top: getSectionTop(id),
			behavior: 'smooth'
		});
	};

	const setSectionId = async () => {
		let sectionId = getSectionIdByScrollY(window.scrollY);
		if (sectionId && currentSectionId != sectionId) {
			previousSectionId = currentSectionId;
			const section = sections.find((section) => section.id === sectionId);
			let path = `/${$currentLocale}`;
			if (section?.inNav) {
				path += `/${sectionId}`;
			}
			pushState(path, {
				sectionId: sectionId
			});
		}
	};

	onMount(() => {
		currentSectionId =
			getSectionIdByPath($page.url.pathname) || getSectionIdByScrollY(window.scrollY);
		if (currentSectionId) {
			scrollToSectionTop(currentSectionId);
		}
		window.addEventListener('scroll', async () => {
			scrollY = window.scrollY;
			await setSectionId();
		});
	});

	$: currentSectionId = $page.state.sectionId;

	let pageTitle: string;
	$: {
		pageTitle = '';
		const section = sections.find((section) => section.id === currentSectionId);
		if (section?.inNav) {
			pageTitle += $_(`title.${currentSectionId}`) + ' - ';
		}
		pageTitle += $_('title.main');
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<nav>
	<ul class:mini={scrollY > 620}>
		{#each sections.filter((section) => section.inNav) as section}
			<li>
				<a
					href="/{$currentLocale}/{section['id']}"
					aria-current={currentSectionId === section['id'] ? 'page' : false}
					on:click|preventDefault={() => {
						scrollToSectionTop(section['id']);
					}}>{$_(`nav.${section['id']}`)}</a
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
	ul.mini a {
		font-size: 1.3rem;
	}
	a {
		background-color: $root-color-darker;
		text-transform: lowercase;
		text-decoration: none;
		color: rgba($root-color-lighter, 0.08);
		font-size: 1.6rem;
		font-weight: 500;
		-webkit-text-stroke: 1px $root-color-light;
		transition: all 300ms;
		line-height: 1.36;
		padding: 0px 16px;
	}
	a[aria-current='page'] {
		color: $root-color-lighter;
		font-size: 1.7rem !important;
	}
</style>
