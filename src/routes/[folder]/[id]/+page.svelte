<script lang="ts">
	import Button from '$lib/Button.svelte'
	import ImagePreview from '$lib/ImagePreview.svelte'
	import { imageToEdit } from '../../../store/image'
	import FormDelivery from '$lib/FormDelivery.svelte'
	import FormAjust from '$lib/FormAjust.svelte'
	import FormEffect from '$lib/FormEffect.svelte'
	import FormResize from '$lib/FormResize.svelte'
	import Grid from '$lib/Grid.svelte'
	import { transformationsStore } from '../../../store/transformations'
	import Transformations from '$lib/Transformations.svelte'
	import Card from '$lib/Card.svelte'
	import { setLocalStorageValue } from '../../../utils/localStorage'
	import { LOCAL_STORAGE_KEYS } from '../../../types/LocalStorage'
	import { goto } from '$app/navigation'
	import { DestroyCloudinary } from '../../../services/delete'
	import Link from '$lib/Link.svelte'
	import TextGradient from '$lib/TextGradient.svelte'
	import Cross from '$lib/icons/Cross.svelte'

	let isLoading = false
	let urlDownload: string

	async function onRemoveFileInput() {
		isLoading = true
		const response = await DestroyCloudinary({ publicId: $imageToEdit.publicId })
		if (response.result) {
			imageToEdit.set({
				alt: '',
				assetId: '',
				publicId: '',
				url: '',
				versionId: ''
			})
			setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, null)
			isLoading = false
			goto('/')
		}
	}

	let _processingImage = true
	let tries = 0
	let url = $imageToEdit.url
	const onDownload = async (urlImageToDownload: string) => {
		const music = await fetch(urlImageToDownload)
		const musicBlob = await music.blob()
		const urlImage = URL.createObjectURL(musicBlob)
		urlDownload = urlImage
	}
	$: {
		if (globalThis.window) {
			const img = new Image()
			img.src = $imageToEdit?.url
			img.onload = () => {
				_processingImage = false
			}
			img.onerror = () => {
				tries++
				if (tries > 10) {
					_processingImage = false
				}
			}
		}
		if ($imageToEdit?.url && Object.keys($transformationsStore).length >= 0) {
			const transformApply: (string | undefined)[] = Object.values($transformationsStore).filter(
				(value) => value && value.length > 0
			)
			let splitedBaseUrl: string[] = $imageToEdit?.url.split('/')
			url = [splitedBaseUrl.slice(0, 6), transformApply, splitedBaseUrl.slice(6)].flat(1).join('/')
			urlDownload = ''
		}
	}
</script>

<svelte:head>
	<title>{$imageToEdit.alt}</title>
</svelte:head>

<div class="flex flex-col items-center gap-4 my-4">
	{#if $imageToEdit?.url && $imageToEdit?.alt && !_processingImage}
		<div class="flex items-center gap-4">
			<Card>
				<TextGradient tag="span">
					{$imageToEdit.alt}
				</TextGradient>
			</Card>
			<Button {isLoading} varint="error" on:click={onRemoveFileInput}><Cross /></Button>
		</div>
		<ImagePreview alt={$imageToEdit.alt} src={url} />
		<div class="flex justify-center flex-wrap gap-4 w-full">
			{#if urlDownload}
				<Link href={urlDownload} Props={{ download: $imageToEdit.alt }}>Confirm Dwonload</Link>
			{:else}
				<Button varint="success" on:click={() => onDownload(url)}>Download</Button>
			{/if}
		</div>
		<Transformations transformations={$transformationsStore} />
		<Card addClass="w-full">
			<Grid>
				<FormResize />
				<FormEffect />
				<FormAjust />
				<FormDelivery />
			</Grid>
		</Card>
	{/if}
</div>
