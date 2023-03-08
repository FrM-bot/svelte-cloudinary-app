<script>
	import { onMount } from 'svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Herader from '$lib/components/Herader.svelte'
	import '$lib/styles/app.css'
	import { imageToEdit } from '$lib/store/image'
	import { setLocalStorageValue } from '$lib/utils/localStorage'
	import { LOCAL_STORAGE_KEYS } from '$lib/types/LocalStorage'
	onMount(() => {
		window.addEventListener('beforeunload', (event) => {
			event.preventDefault()
			return (event.returnValue = '')
		})
		window.onunload = () => {
			if (!window.navigator.sendBeacon) return

			if ($imageToEdit?.publicId) {
				const url = `/api/${$imageToEdit.publicId}`
				navigator.sendBeacon(url, JSON.stringify({ publicId: $imageToEdit?.publicId }))
				setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, null)
			}
		}
	})
</script>

<Herader />

<main class="my-6 max-w-7xl mx-auto min-h-[75vh] px-3">
	<slot />
</main>

<Footer />
