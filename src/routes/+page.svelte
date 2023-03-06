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
	// onMount(() => {
	// 	recientImage = getLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE)
	// 	if (recientImage) {
	// 		imagePreview = recientImage
	// 	}
	// })
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

<div class="flex flex-col justify-center items-center gap-6 w-full h-full">
	<form class="flex flex-col gap-4 items-center w-full" on:submit={(e) => onSubmit(e)}>
		<div class="max-w-xl w-full">
			<div class="flex items-center justify-center w-full">
				{#if !File && !$imageToEdit?.publicId}
					<Card variant="gradient" tag="label" addClass="w-full">
						<div class="flex flex-col items-center justify-center pt-5 pb-6">
							<svg
								aria-hidden="true"
								class="w-10 h-10 mb-3 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
								/></svg
							>
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
						><Cross /></Button
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
				<div role="status" class="rounded inline-block w-full md:h-[50vh] h-64 animate-pulse my-3">
					<div class="flex items-center bg-white justify-center h-full rounded dark:bg-custom-dark">
						<svg
							class="w-12 h-12 text-gray-200 dark:text-gray-600"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 640 512"
							><path
								d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"
							/></svg
						>
					</div>
				</div>
			</Card>
		{/if}
		{#if File}
			<Button varint="success" {isLoading}>Edit</Button>
		{/if}
	</form>
</div>
