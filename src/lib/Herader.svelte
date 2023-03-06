<script>
	import { onMount } from 'svelte'
	import Darkmode from './Darkmode.svelte'
	import Cloudinary from './icons/Cloudinary.svelte'
	import Link from './Link.svelte'
	let scrollY = 0
	onMount(() => {
		const header = document.querySelector('#header')
		window.onscroll = (e) => {
			if (window.scrollY > 0 && !header?.classList.contains('shadow-lg')) {
				header?.classList.add('shadow-lg')
			}
			if (window.scrollY === 0 && header?.classList.contains('shadow-lg')) {
				header?.classList.remove('shadow-lg')
			}
		}
	})
</script>

<header
	id="header"
	class="dark:bg-custom-dark/70 py-4 px-6 sticky top-0 bg-white/50 backdrop-blur-sm z-10 duration-300"
>
	<div class="flex justify-between items-center">
		<Link href="/" addClass="flex items-center text-2xl">
			<svg
				class="text-secondary w-8 h-8"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
				/>
			</svg>
			<span class="font-bold ml-1">
				Cloud
			</span>

			<span class="font-extrabold">
				Image
			</span>
		</Link>

		<Darkmode />
	</div>
</header>
