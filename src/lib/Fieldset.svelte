<script lang="ts">
	export let legend: string
</script>

<fieldset
	class="border border-primary p-3 w-full flex flex-col gap-4 rounded shadow-primary/20 hover:shadow-lg focus:shadow-lg duration-300"
>
	<legend class="p-2 border-x border-primary rounded-sm shadow-lg">{legend}</legend>
	<slot />
</fieldset>
