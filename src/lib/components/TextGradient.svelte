<script lang="ts">
	import { classNameJoin } from "$lib/utils/ClassNames"
	export let tag = 'span'
    export let addClass = ''
</script>

<svelte:element
	this={tag}
	class={classNameJoin(addClass ?? '', "bg-clip-text text-[#fff0] bg-gradient-to-l from-primary to-custom-pink truncate w-fit md:max-w-fit sm:max-w-xs max-w-[250px] flex")}
>
	<slot />
</svelte:element>
