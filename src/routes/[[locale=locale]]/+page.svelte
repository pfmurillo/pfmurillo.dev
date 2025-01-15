<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { _ } from '$lib/i18n';
	import Carrousel from '$lib/components/Carrousel.svelte';
	import Progressbar from '$lib/components/Progressbar.svelte';

	onMount(() => {
		animate('h1', { opacity: [0, 1] }, { duration: 1.8, delay: 0.3 });
		animate('h1', { x: [90, 0] }, { duration: 1.1, delay: 0.1 });
	});

	const skills = [
		{
			name: 'Svelte / SvelteKit',
			rating: 8
		},
		{
			name: 'Vue',
			rating: 7
		},
		{
			name: 'JavaScript / TypeScript',
			rating: 9
		},
		{
			name: 'CSS / SASS',
			rating: 8
		},
		{
			name: 'HTML',
			rating: 9
		},
		{
			name: 'PHP',
			rating: 8
		},
		{
			name: 'SQL',
			rating: 7
		},
		{
			name: 'Solidity',
			rating: 7
		}
	];
	const works = [
		{
			id: 'maisondodue',
			title: 'Maison Dodue',
			url: 'https://maisondodue.com',
			image: '/works/maisondodue.webp'
		},
		{
			id: 'designinverse',
			title: 'Design Inversé',
			url: 'https://design-inverse.com',
			image: '/works/designinverse.webp'
		},
		{
			id: 'shrks',
			title: 'Shrks',
			url: 'https://web.shrks.app',
			image: '/works/shrks.webp'
		},
		{
			id: 'daninos',
			title: 'Christian Daninos',
			url: 'https://christiandaninos.com',
			image: '/works/daninos.webp'
		},
		{
			id: 'lhote',
			title: 'André Lhote',
			url: 'https://andre-lhote.org',
			image: '/works/lhote.webp'
		}
	];
</script>

<section id="intro">
	<h1>{$_('intro.h1')}</h1>
</section>
<section id="about">
	<div id="aboutContent">
		<div id="aboutDescription">
			<p>
				{@html $_('about.p1')}
			</p>
			<p>
				{@html $_('about.p2')}
			</p>
			<p>
				{@html $_('about.p3')}
			</p>
			<p>
				{@html $_('about.p4')}
			</p>
		</div>
		<div id="aboutSkills">
			{#each skills as skill}
				<Progressbar item={skill} />
			{/each}
		</div>
	</div>
</section>
<section id="works">
	<Carrousel items={works} />
</section>
<section id="contact">
	<p>
		{@html $_('contact.p1')}
	</p>
	<p>
		{@html $_('contact.p2')}
	</p>
	<p>
		{@html $_('contact.p3')}
	</p>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
		min-height: 100vmin;
		min-height: 100svh;
		position: relative;
		align-items: center;
		justify-content: center;
	}
	#intro {
		background: $root-color-dark;
		background-image: url('/about/me.svg');
		background-repeat: no-repeat;
		background-position: left bottom;
		background-size: auto 50%;
		background-attachment: fixed;
		overflow-x: hidden;
	}
	h1 {
		opacity: 0;
		color: transparent;
		background-clip: text;
		background-size: cover;
		background-image: linear-gradient(90deg, $root-color-light 0%, $root-color-accent 66%);
		line-height: 92%;
		width: fit-content;
		margin: 0px $root-margin-y;
		position: relative;
		top: -4vh;
	}
	#about {
		background-color: $root-color-light;
	}
	#about p:first-of-type {
		margin-top: 188px;
	}
	#about p:last-of-type {
		margin-bottom: 24px;
	}
	#aboutContent {
		display: flex;
		flex-direction: column;
	}
	#aboutSkills {
		font-size: 0.9rem;
		margin-bottom: 48px;
	}
	#works {
		background-color: $root-color-lighter;
	}
	#contact {
		min-height: 100lvh;
		background-color: $root-color-light;
	}
	// desktop
	@media (min-width: $root-breakpoint-desktop) {
		#intro {
			background-size: auto 68%;
		}
		h1 {
			max-width: 50%;
		}
		#about p:first-of-type {
			margin-top: 0px;
		}
		#about p:last-of-type {
			margin-bottom: 0px;
		}
		#aboutContent {
			flex-direction: row;
			align-items: center;
		}
		#aboutDescription,
		#aboutSkills {
			width: 50%;
		}
		#aboutSkills {
			margin-bottom: 0px;
		}
	}
</style>
