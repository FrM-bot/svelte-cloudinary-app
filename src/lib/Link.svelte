<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements'
	import { classNameJoin } from '../utils/ClassNames'
	import TextGradient from './TextGradient.svelte'
	export let href: string
	export let addClass = ''
	export let Props = {} as HTMLAnchorAttributes

</script>

<a
	{href}
	{...Props}
	class={classNameJoin(addClass ?? '', "bg-clip-text text-[#fff0] bg-gradient-to-l from-primary to-custom-pink truncate after:absolute text-lg after:bg-gradient-to-l after:from-primary after:to-custom-pink hover:[letter-spacing:2px] after:z-0 duration-300 after:w-full after:h-px after:bottom-0 after:left-0 after:scale-x-0 after:duration-300 relative py-1 px-2 w-fit hover:after:scale-x-100")}
>
	<!-- <TextGradient> -->
		<slot />
	<!-- </TextGradient> -->
</a>
