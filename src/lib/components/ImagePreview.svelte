<script lang="ts">
	import { imageToEdit } from '$lib/store/image'
	import SkeletonImage from './SkeletonImage.svelte'

	export let alt: string
	export let src: string
	export let errorMessage = ''

</script>

{#if errorMessage}
<SkeletonImage>
	<p>{errorMessage}</p>
</SkeletonImage>

{:else}
	<picture
		class="overflow-hidden w-fit bg-gradient-to-r from-custom-cyan to-custom-pink border-[5px] rounded-md shadow-xl shadow-black/40 [letter-spacing:1px;] active:[letter-spacing:1px;] hover:[letter-spacing:2px;] border-transparent [background:linear-gradient(to_right,#fff,#fff)_padding-box,linear-gradient(to_right,rgb(var(--secondary)),rgb(var(--primary)))_border-box] duration-300"
	>
		<img class="hover:scale-105 max-h-[90vh] duration-300" {src} {alt} />
	</picture>
{/if}
