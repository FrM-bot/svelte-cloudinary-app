<script lang="ts">
	export let legend: string
</script>

<fieldset
	class="border-[2px] border-primary p-3 w-full flex flex-col gap-4 rounded shadow-primary/20 hover:shadow-lg focus:shadow-lg duration-300"
>
	<legend class="p-2 border-x-[2px] border-primary rounded shadow-lg">{legend}</legend>
	<slot />
</fieldset>
