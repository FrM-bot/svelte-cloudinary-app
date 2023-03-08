<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Dragzone from '$lib/components/Dragzone.svelte'
	import Link from '$lib/components/Link.svelte'
	import TextGradient from '$lib/components/TextGradient.svelte'
	import Card from '$lib/components/Card.svelte'
	import Cross from '$lib/components/icons/Cross.svelte'
	import CloudUpload from '$lib/components/icons/CloudUpload.svelte'
	import { UploadCloudinary } from '$lib/services/upload'
	import ImagePreview from '$lib/components/ImagePreview.svelte'
	import { setLocalStorageValue } from '$lib/utils/localStorage'
	import { LOCAL_STORAGE_KEYS } from '$lib/types/LocalStorage'
	import { goto } from '$app/navigation'
	import { imageToEdit, initialImageState } from '$lib/store/image'
	import type { Image } from '$lib/types/Image'
	import { DestroyCloudinary } from '$lib/services/delete'
	import SkeletonImage from '$lib/components/SkeletonImage.svelte'
	import { MAX_FILE_SIZE } from '$lib/utils/File'
	import { urlState } from '$lib/store/url'

	let File: File | null
	$: imagePreview = {
		alt: File && File.name,
		url: File && URL.createObjectURL(File),
		publicId: $imageToEdit?.publicId ? $imageToEdit?.publicId : ''
	} as Image
	let isLoading = false
	let isLoadingError = false

	async function onRemoveFileToCloudinary({ publicId }: { publicId: string }) {
		const response = await DestroyCloudinary({ publicId })
		if (response?.result) {
			imageToEdit.set(initialImageState)
			setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, null)
		}
	}

	const onInput = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement
		}
	) => {
		if (event.currentTarget.files) {
			const fileInput = event?.currentTarget.files[0]
			const fileSize = fileInput?.size / 1024 / 1024
			if (fileSize > MAX_FILE_SIZE) {
				return alert(`Very big image(Max ${MAX_FILE_SIZE}MB)`)
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
			if ($imageToEdit?.publicId) {
				await onRemoveFileToCloudinary({ publicId: $imageToEdit?.publicId })
			}
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
			await onRemoveFileToCloudinary({ publicId: $imageToEdit.publicId })
		}
		isLoadingError = false
	}
</script>

<svelte:head>
	<title>CloudImage</title>
</svelte:head>

<Dragzone on:drop={inputFile} />

<section class="grid gap-6 w-full h-full">
	<form class="flex flex-col gap-4 items-center w-full" on:submit={onSubmit}>
		<div class="flex items-center justify-center max-w-xl w-full">
			{#if !File && !$imageToEdit?.publicId}
				<Card variant="gradient" tag="label" addClass="w-full">
					<div class="flex flex-col items-center justify-center pt-5 pb-6">
						<span class="animate-pulse">
							<CloudUpload />
						</span>
						<p class="mb-2 text-sm dark:text-gray-400">
							<span class="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p class="text-xs dark:text-gray-400">SVG, PNG, JPG, WEBP, JPEG or GIF (MAX. {MAX_FILE_SIZE}MB)</p>
					</div>
					<input on:change={onInput} id="file_input" accept="image/*" type="file" class="hidden" />
				</Card>
			{/if}
		</div>
		{#if (imagePreview?.url && imagePreview?.alt) || ($imageToEdit.url && $imageToEdit?.alt)}
			<div class="flex gap-4 items-center">
				<Card>
					<TextGradient tag="h2">
						{imagePreview.alt ?? $imageToEdit.alt}
					</TextGradient>
				</Card>
				<div class="mx-auto">
					<Button isLoading={isLoadingError} varint="error" on:click={onRemoveFileInput}>
						<Cross />
					</Button>
				</div>
			</div>
			<ImagePreview
				alt={imagePreview.alt ?? $imageToEdit?.alt}
				src={imagePreview.url ?? $urlState}
			/>
			{#if $imageToEdit?.publicId}
				<Link href={$imageToEdit?.publicId}>Resume</Link>
			{/if}
		{:else}
			<SkeletonImage />
		{/if}
		{#if File}
			<Button varint="success" {isLoading}>Edit</Button>
		{/if}
	</form>
</section>
