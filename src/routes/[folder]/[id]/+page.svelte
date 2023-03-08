<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import ImagePreview from '$lib/components/ImagePreview.svelte'
	import FormDelivery from '$lib/components/FormDelivery.svelte'
	import FormEffect from '$lib/components/FormEffect.svelte'
	import Link from '$lib/components/Link.svelte'
	import Cross from '$lib/components/icons/Cross.svelte'
	import FormAjust from '$lib/components/FormAjust.svelte'
	import FormResize from '$lib/components/FormResize.svelte'
	import TextGradient from '$lib/components/TextGradient.svelte'
	import Transformations from '$lib/components/Transformations.svelte'
	import Grid from '$lib/components/Grid.svelte'
	import Card from '$lib/components/Card.svelte'
	import { imageToEdit, initialImageState } from '$lib/store/image'
	import { transformationsStore } from '$lib/store/transformations'
	import { setLocalStorageValue } from '$lib/utils/localStorage'
	import { LOCAL_STORAGE_KEYS } from '$lib/types/LocalStorage'
	import { goto } from '$app/navigation'
	import { DestroyCloudinary } from '$lib/services/delete'
	import { onMount } from 'svelte'
	import { DownloadImage } from '$lib/services/download'
	import { urlState } from '$lib/store/url'
	import SkeletonImage from '$lib/components/SkeletonImage.svelte'

	let isLoading = false
	let urlDownload: string

	async function onRemoveFileInput() {
		isLoading = true
		const response = await DestroyCloudinary({ publicId: $imageToEdit.publicId })
		if (response.result) {
			imageToEdit.set(initialImageState)
			setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, null)
			isLoading = false
			goto('/')
		}
	}

	let processingImage = true
	let tries = 0
	$: {
		if ($imageToEdit?.url && Object.keys($transformationsStore).length >= 0) {
			const transformApply: (string | undefined)[] = Object.values($transformationsStore).filter(
				(value) => value && value.length > 0
			)
			let splitedBaseUrl: string[] = $imageToEdit?.url.split('/')
			urlState.set(
				[splitedBaseUrl.slice(0, 6), transformApply, splitedBaseUrl.slice(6)].flat(1).join('/')
			)
			DownloadImage($urlState).then(({ blobUrl }) => {
				urlDownload = blobUrl
			})
		}
	}

	$: {
		if (globalThis.window) {
			const img = new Image()
			img.src = $imageToEdit?.url
			img.onload = () => {
				processingImage = false
			}
			img.onerror = () => {
				tries++
				if (tries < 10) {
					setTimeout(() => {
						processingImage = false
					}, 1000)
				}
			}
		}
	}
	onMount(() => {
		if (!$imageToEdit.url) {
			goto('/')
		}
	})
</script>

<svelte:head>
	<title>{$imageToEdit.alt}</title>
</svelte:head>

<section class="flex flex-col items-center gap-4 my-4">
	{#if $imageToEdit?.url && $imageToEdit?.alt}
		<div class="flex items-center gap-4">
			<Card>
				<TextGradient tag="h2">
					{$imageToEdit.alt}
				</TextGradient>
			</Card>
			<Button {isLoading} varint="error" on:click={onRemoveFileInput}><Cross /></Button>
		</div>
		{#if processingImage}
			<SkeletonImage />
		{:else}
			<ImagePreview alt={$imageToEdit.alt} src={$urlState} />
		{/if}
		<div class="flex justify-center flex-wrap gap-4 w-full">
			{#if urlDownload}
				<Link href={urlDownload} Props={{ download: $imageToEdit.alt }}>Download</Link>
			{:else}
				<Button varint="success" on:click={() => DownloadImage($urlState)}>Download</Button>
			{/if}
		</div>
		<Transformations transformations={$transformationsStore} />
		<Grid>
			<FormResize />
			<FormEffect />
			<FormAjust />
			<FormDelivery />
		</Grid>
	{/if}
</section>
