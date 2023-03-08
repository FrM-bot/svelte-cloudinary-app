<script>
	import { page } from '$app/stores'
	import Link from '$lib/components/Link.svelte'
	import TextGradient from '$lib/components/TextGradient.svelte'
</script>

<section class="grid place-content-center gap-6 w-full h-[50vh]">
	<div class='flex flex-col items-center gap-6'>
		<TextGradient addClass='text-2xl' tag="h1">{$page.status} {$page?.error?.message}</TextGradient>
		<Link href="/">Go home</Link>
	</div>
</section>
