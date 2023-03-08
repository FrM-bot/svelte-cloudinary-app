<script>
	import { onMount } from 'svelte'
	import Darkmode from './Darkmode.svelte'
	import CloudIcon from './icons/CloudIcon.svelte'
	import Link from './Link.svelte'
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
			<CloudIcon />
			<h1 class="font-bold ml-1">
				CloudImage
			</h1>
		</Link>

		<Darkmode />
	</div>
</header>
