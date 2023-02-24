<script lang="ts">
	import Button from '$lib/Button.svelte'
	import Dragzone from '$lib/Dragzone.svelte'
	import { UploadCloudinary } from '../services/upload'
	import ImagePreview from '$lib/ImagePreview.svelte'
	import { getLocalStorageValue, setLocalStorageValue } from '../utils/localStorage'
	import { LOCAL_STORAGE_KEYS } from '../types/LocalStorage'
	import { onMount } from 'svelte'

	let File: File | null
	$: imagePreview = {
		src: File && URL?.createObjectURL(File),
		name: File && File?.name?.split('.')[0]
	}
	let imageToEdite = {
		url: '',
		alt: ''
	}
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
			const response = await UploadCloudinary(File)
			if (response) {
				const { public_id: publicId, url } = response
				imageToEdite.url = url
				const [_folder, name] = publicId.split('/')
				imageToEdite.alt = name
				setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, imageToEdite)
			}
		}
	}

	function inputFile(event: CustomEvent<{ file: File }>) {
		const fileInput = event.detail.file
		File = fileInput
	}
	function onRemoveFileInput() {
		File = null
	}
	onMount(() => {
		const localImage = getLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE) as { url: string, alt: string }
		if (localImage) {
			imageToEdite = localImage
		}
	})
</script>

<Dragzone on:drop={inputFile} />

<div class="h-full">
	<form class="flex flex-col items-center gap-4 w-full" on:submit={(e) => onSubmit(e)}>
		<label
			class="bg-gradient-to-r to-primary from-secondary p-[3px] w-fit h-fit rounded-lg grid place-content-center border-[2px] dark:border-custom-dark-2 shadow-lg shadow-black/20 hover:shadow-primary/10 duration-300"
			for="file_input"
		>
			<span
				class="bg-white z-0 dark:border-t-slate-800 dark:bg-custom-dark-2 cursor-pointer text-3xl font-semibold px-3 py-1 rounded-md border-t duration-300"
			>
				UPLOAD FILE
			</span>
		</label>
		<input id="file_input" type="file" on:input={onInput} accept="image/*" class="hidden" />

		<div>
			<Button>Save</Button>
		</div>
	</form>
</div>

<div class="flex flex-col items-center gap-4 mt-4">
	{#if imageToEdite?.url && imageToEdite?.alt}
		<ImagePreview alt={imageToEdite.alt} src={imageToEdite.url} />
		<div>
			<Button on:click={onRemoveFileInput}>Remove</Button>
		</div>
	{:else if imagePreview?.name && imagePreview?.src}
		<ImagePreview alt={imagePreview.name} src={imagePreview.src} />
		<div>
			<Button on:click={onRemoveFileInput}>Remove</Button>
		</div>
	{/if}
</div>
