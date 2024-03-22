<script lang="ts">
	import { animate, inView } from 'motion';

	const progressBar = (node: HTMLSpanElement, rating: number) => {
		inView(
			node,
			() => {
				const el = node.querySelector('.rating') as HTMLSpanElement;
				animate(el, { width: `${rating * 10}%` }, { duration: 1.8, delay: 0.2 });
			},
			{ amount: 1 }
		);
	};

	type Item = {
		name: string;
		rating: number;
	};
	export let item: Item;
</script>

<span class="skill" use:progressBar={item.rating}>
	{item.name}
	<span class="rating"></span>
</span>

<style lang="scss">
	.skill {
		display: block;
		width: 80%;
		max-width: 540px;
		font-family: monospace;
		margin: 12px auto;
		padding: 12px 0px;
		position: relative;
		z-index: 0;
	}
	.rating {
		display: inline-block;
		width: 0%;
		height: 24px;
		background-color: rgb(199, 217, 118);
		position: absolute;
		bottom: 0px;
		left: -12px;
		z-index: -1;
		box-shadow: 1px 1px 2px rgba($root-color-dark, 0.28);
	}
</style>
