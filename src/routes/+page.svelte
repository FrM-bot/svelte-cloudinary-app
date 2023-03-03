<script lang="ts">
	import Button from '$lib/Button.svelte'
	import Dragzone from '$lib/Dragzone.svelte'
	import { UploadCloudinary } from '../services/upload'
	import ImagePreview from '$lib/ImagePreview.svelte'
	import { getLocalStorageValue, setLocalStorageValue } from '../utils/localStorage'
	import { LOCAL_STORAGE_KEYS } from '../types/LocalStorage'
	import { onMount } from 'svelte'

	import { goto } from '$app/navigation'
	import { imageToEdit } from '../store/image'

	// Cloudinary Optios
	// import { Transformation } from '@cloudinary/url-gen'

	// Import required actions.
	// import { byRadius } from '@cloudinary/url-gen/actions/roundCorners'
	// import { sepia } from '@cloudinary/url-gen/actions/effect'
	// import { source } from '@cloudinary/url-gen/actions/overlay'
	// import { opacity, brightness } from '@cloudinary/url-gen/actions/adjust'
	// import { byAngle } from '@cloudinary/url-gen/actions/rotate'

	// Import required qualifiers.
	// import { image } from '@cloudinary/url-gen/qualifiers/source'
	// import { Position } from '@cloudinary/url-gen/qualifiers/position'
	// import { compass } from '@cloudinary/url-gen/qualifiers/gravity'
	// import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
	// import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn'
	import Card from '$lib/Card.svelte'
	import type { Image } from '../store/image'
	import { DestroyCloudinary } from '../services/delete'
	import Link from '$lib/Link.svelte'
	import TextGradient from '$lib/TextGradient.svelte'
	let File: File | null
	$: imagePreview = {
		alt: File && File.name,
		url: File && URL.createObjectURL(File),
		publicId: ''
	} as Image
	let isLoading = false
	let isLoadingError = false

	let recientImage: Image

	const onInput = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement
		}
	) => {
		if (event.currentTarget.files) {
			const fileInput = event?.currentTarget.files[0]
			const fileSize = fileInput.size / 1024 / 1024
			if (fileSize > 7) {
				return alert('Image too big')
			}
			File = fileInput
		}
	}
	const onSubmit = async (
		_event: Event & {
			readonly submitter: HTMLElement | null
		} & {
			currentTarget: EventTarget & HTMLFormElement
		}
	) => {
		if (File) {
			isLoading = true
			const response = await UploadCloudinary(File)
			if (response?.public_id) {
				const { public_id: publicId, original_filename: alt, url, version_id, asset_id } = response

				const imageCloudinary = {
					publicId,
					alt,
					url,
					assetId: asset_id,
					versionId: version_id
				}

				setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, imageCloudinary)
				imageToEdit.set(imageCloudinary)
				goto(`/${publicId}`)
				isLoading = false
			}
		}
	}

	function inputFile(event: CustomEvent<{ file: File }>) {
		const fileInput = event.detail.file
		File = fileInput
	}
	onMount(() => {
		recientImage = getLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE)
		if (recientImage) {
			imagePreview = recientImage
		}
	})
	async function onRemoveFileInput() {
		isLoadingError = true
		File = null
		if (recientImage?.publicId) {
			const response = await DestroyCloudinary({ publicId: $imageToEdit.publicId })
			if (response?.result) {
				imageToEdit.set({
					alt: '',
					assetId: '',
					publicId: '',
					url: '',
					versionId: ''
				})
				setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, null)
			}
		}
		isLoadingError = false
	}
</script>

<Dragzone on:drop={inputFile} />

<div class="flex flex-col items-center gap-4 my-6">
	<div class="h-full">
		<form class="flex justify-center items-center gap-4 w-full" on:submit={(e) => onSubmit(e)}>
			<div class="flex gap-2 flex-col">
				<label
					class="bg-gradient-to-r to-primary from-secondary p-[3px] w-fit h-fit rounded-lg grid place-content-center border-[2px] dark:border-custom-dark-2 shadow-lg shadow-primary/20 hover:shadow-primary/10 duration-300"
					for="file_input"
				>
					<span
						class="bg-white z-0 dark:border-t-slate-800 dark:bg-custom-dark cursor-pointer text-3xl font-semibold px-3 py-1 rounded-md border-t duration-300"
					>
						Upload File
					</span>
				</label>
				<span
					class="dark:bg-custom-dark bg-white p-2 w-fit rounded-md border shadow-primary/20 border-primary shadow-lg"
				>
					Or drop a file
				</span>
				<input id="file_input" type="file" on:change={onInput} accept="image/*" class="hidden" />
				{#if File}
					<div>
						<Button {isLoading}>Edit</Button>
					</div>
				{/if}
			</div>
		</form>
	</div>

	{#if imagePreview?.url && imagePreview?.alt}
		<div class="flex gap-4 items-center">
			<Card>
				<h2 class="truncate w-fit">
					<TextGradient>
						{imagePreview.alt}
					</TextGradient>
				</h2>
			</Card>
			<Button isLoading={isLoadingError} varint="error" on:click={onRemoveFileInput}>Remove Image</Button>
		</div>
		<ImagePreview alt={imagePreview.alt} src={imagePreview.url} />
		{#if recientImage?.publicId}
			<Link href={recientImage.publicId}>Resume</Link>
		{/if}
	{/if}
</div>

