<script>
	import Card from "./Card.svelte"

	import ImageIcon from "./icons/ImageIcon.svelte"

</script>
<Card variant="gradient" addClass="max-w-5xl w-full gird place-content-center animate-pulse">
	<div role="status" class="rounded inline-block w-full md:h-[50vh] h-64 my-3">
		<div class="flex flex-col items-center bg-white justify-center h-full rounded dark:bg-custom-dark">
			<ImageIcon />
            <slot />
		</div>
	</div>
</Card>
