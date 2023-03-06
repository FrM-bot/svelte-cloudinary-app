<script>
	import { onMount, onDestroy } from 'svelte'
	import Footer from '$lib/Footer.svelte'
	import Herader from '$lib/Herader.svelte'
	import '../styles/app.css'
	import { imageToEdit } from '../store/image'
	import { setLocalStorageValue } from '../utils/localStorage'
	import { LOCAL_STORAGE_KEYS } from '../types/LocalStorage'
	import { goto } from '$app/navigation'
	onMount(() => {
		window.addEventListener('beforeunload', function (e) {
			const confirmationMessage = 'o/'
			e.returnValue = confirmationMessage
			return confirmationMessage
		})
		window.onunload = function () {
			if (!navigator.sendBeacon) return

			if ($imageToEdit?.publicId.length > 0) {
				const url = `/api/${$imageToEdit.publicId}`
				setLocalStorageValue(LOCAL_STORAGE_KEYS.IMAGE, null)
				navigator.sendBeacon(url, JSON.stringify({ publicId: $imageToEdit?.publicId }))
				goto('/')
			}
		}
	})
</script>

<Herader />

<main class="my-6 max-w-7xl mx-auto min-h-[75vh] px-3">
	<slot />
</main>

<Footer />
