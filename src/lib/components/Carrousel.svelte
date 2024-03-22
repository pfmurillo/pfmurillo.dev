<script lang="ts">
	import { animate, scroll, inView } from 'motion';
	import { _ } from '$lib/i18n';

	const slideOnScroll = (node: HTMLElement) => {
		const element = node.querySelector('ul') as HTMLElement;
		const items = node.querySelectorAll('li') as NodeListOf<Element>;
		node.style.height = `${items.length}00vh`;
		scroll(
			animate(element, {
				transform: [`translateX(-${items.length - 1}00vw)`]
			}),
			{
				target: node
			}
		);
	};

	const animateOnView = (node: HTMLElement) => {
		inView(
			node,
			({ target }) => {
				let details = target.querySelector('.itemDetails') as HTMLDivElement;
				animate(details, { opacity: [0, 1], y: [320, 0] }, { duration: 0.7 });
			},
			{ amount: 0.5 }
		);
	};

	type Item = {
		id: string;
		title: string;
		url: string;
		image: string;
	};
	export let items: Item[];
</script>

<div class="container" use:slideOnScroll>
	<div class="carrousel">
		<ul>
			{#each items as { id, title, url, image }}
				<li use:animateOnView>
					<img src={image} alt={title} />
					<div class="itemDetails">
						<div class="itemTitle">
							<a href={url} class="stabilo" target="_blank">{title}</a>
						</div>
						<div class="itemDescription">
							{$_(`works.${id}`)}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="scss">
	.container {
		width: 100%;
	}
	.carrousel {
		width: 100%;
		height: 100vh;
		position: sticky;
		top: 0;
		overflow-x: hidden;
	}
	ul {
		width: 100%;
		height: 100vh;
		display: flex;
	}
	li {
		flex: 0 0 auto;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		padding: 0px $root-margin-y;
		box-sizing: border-box;
	}
	.itemDetails {
		opacity: 0;
		margin: 24px 0px 0px 0px;
		max-width: 82%;
	}
	.itemTitle {
		font-weight: 500;
		font-size: 1.4rem;
		margin: 12px 0px 18px 0px;
		width: fit-content;
	}
	.itemDescription {
		line-height: 130%;
	}
	img {
		margin-top: 48px;
		max-width: 90%;
		max-height: 40vh;
		border-radius: 8px;
		box-shadow: 1px 1px 2px rgba($root-color-dark, 0.68);
	}
	@media (min-width: $root-breakpoint-desktop) {
		img {
			max-width: 50%;
			margin-top: 0px;
		}
		li {
			flex-direction: row;
			align-items: center;
		}
		.itemDetails {
			margin: 0px 0px 0px 4vw;
			max-width: 48%;
		}
	}
</style>
