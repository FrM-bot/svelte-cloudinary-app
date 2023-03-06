<script lang="ts">
	import Card from "./Card.svelte"


	export let legend: string
</script>

<fieldset
	class="border dark:border-custom-dark-2 p-3 w-full flex flex-col gap-4 rounded shadow-primary/20 hover:shadow-lg focus:shadow-lg duration-300"
>
	<!-- <legend class="p-2 border-x border-primary rounded-sm shadow-lg">{legend}</legend> -->
	<Card variant='gradient' tag='legend'>
		{legend}
	</Card>
	<slot />
</fieldset>
