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
	import Cross from '$lib/icons/Cross.svelte'
	import CloudUpload from '$lib/icons/CloudUpload.svelte'
	import ImageIcon from '$lib/icons/ImageIcon.svelte'
	let File: File | null
	$: imagePreview = {
		alt: File && File.name,
		url: File && URL.createObjectURL(File),
		publicId: $imageToEdit.publicId ? $imageToEdit?.publicId : ''
	} as Image
	let isLoading = false
	let isLoadingError = false

	// let recientImage: Image

	const onInput = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement
		}
	) => {
		if (event.currentTarget.files) {
			const fileInput = event?.currentTarget.files[0]
			const fileSize = fileInput?.size / 1024 / 1024
			if (fileSize > 5) {
				return alert('Very big image')
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

	async function onRemoveFileInput() {
		isLoadingError = true
		File = null
		if ($imageToEdit?.publicId) {
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

<svelte:head>
	<title>CloudImage</title>
</svelte:head>

<Dragzone on:drop={inputFile} />

<div class="grid gap-6 w-full h-full">
	<form class="flex flex-col gap-4 items-center w-full" on:submit={(e) => onSubmit(e)}>
		<div class="max-w-xl w-full">
			<div class="flex items-center justify-center w-full">
				{#if !File && !$imageToEdit?.publicId}
					<Card variant="gradient" tag="label" addClass="w-full">
						<div class="flex flex-col items-center justify-center pt-5 pb-6">
							<span class="animate-pulse">
								<CloudUpload />
							</span>
							<p class="mb-2 text-sm dark:text-gray-400">
								<span class="font-semibold">Click to upload</span> or drag and drop
							</p>
							<p class="text-xs dark:text-gray-400">SVG, PNG, JPG, WEBP, JPEG or GIF (MAX. 5MB)</p>
						</div>
						<input
							on:change={onInput}
							id="file_input"
							accept="image/*"
							type="file"
							class="hidden"
						/>
					</Card>
				{/if}
			</div>
		</div>
		{#if (imagePreview?.url && imagePreview?.alt) || ($imageToEdit.url && $imageToEdit?.alt)}
			<div
				class="flex gap-4 items-center"
			>
				<Card>
						<TextGradient tag='h2'>
							{imagePreview.alt ?? $imageToEdit.alt}
						</TextGradient>
				</Card>
				<div class="mx-auto">
					<Button isLoading={isLoadingError} varint="error" on:click={onRemoveFileInput}
						>
						<Cross />
					</Button
					>
				</div>
			</div>
			<ImagePreview
				alt={imagePreview.alt ?? $imageToEdit?.alt}
				src={imagePreview.url ?? $imageToEdit.url}
			/>
			{#if $imageToEdit?.publicId}
				<Link href={$imageToEdit?.publicId}>Resume</Link>
			{/if}
		{:else}
			<Card variant="gradient" addClass="max-w-5xl w-full gird place-content-center animate-pulse">
				<div role="status" class="rounded inline-block w-full md:h-[50vh] h-64 my-3">
					<div class="flex items-center bg-white justify-center h-full rounded dark:bg-custom-dark">
						<ImageIcon />
					</div>
				</div>
			</Card>
		{/if}
		{#if File}
			<Button varint="success" {isLoading}>Edit</Button>
		{/if}
	</form>
</div>
