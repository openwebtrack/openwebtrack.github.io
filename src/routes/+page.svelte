<script lang="ts">
	import { resolve } from '$app/paths';
	import Logo from '$lib/components/Logo.svelte';
	import SEO from '$lib/components/SEO.svelte';

	let isFullscreen = $state(false);
	let mockupContainer: HTMLDivElement | undefined = $state(undefined);

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			mockupContainer?.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}

	$effect(() => {
		const handleFullscreenChange = () => {
			isFullscreen = !!document.fullscreenElement;
		};
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
	});

	const features = [
		{
			title: 'Real-time Traffic',
			description: 'Watch your visitors in real-time with live session monitoring.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`
		},
		{
			title: 'Self-Hosted',
			description: 'Own your data. Host on your own infrastructure with full control.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`
		},
		{
			title: 'Lightweight',
			description: 'Tiny script size that wont slow down your website.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
		},
		{
			title: 'Revenue Tracking',
			description: 'Track payments and revenue by country, page, device, and referrer.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
		},
		{
			title: 'Custom Events',
			description: 'Track specific user interactions like clicks, signups, and goals.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
		},
		{
			title: 'Traffic Alerts',
			description: 'Get notified when your website experiences unusual traffic spikes.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`
		},
		{
			title: 'Geolocation',
			description: 'See where your users are coming from with country, region, and city data.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`
		},
		{
			title: 'UTM Tracking',
			description: 'Measure campaign performance with automatic UTM parameter extraction.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`
		},
		{
			title: 'Weekly Reports',
			description: 'Receive automated weekly email reports with key analytics metrics.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`
		},
		{
			title: 'Team Collaboration',
			description: 'Invite team members to view and analyze your website data.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
		},
		{
			title: 'Data Export',
			description: 'Full ownership of your data with easy export and import options.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`
		},
		{
			title: 'Deep Filtering',
			description: 'Filter data by date, device, location, and more for detailed insights.',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`
		}
	];
</script>

<SEO
	title="OpenWebTrack - Open-source Web Analytics"
	description="Simple, self-hosted web analytics for modern websites. Track what matters with full control over your data. Real-time traffic, revenue tracking, custom events, and more."
	url="https://openwebtrack.github.io"
/>

<svelte:head>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "SoftwareApplication",
			"name": "OpenWebTrack",
			"applicationCategory": "AnalyticsApplication",
			"operatingSystem": "Any",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			},
			"description": "Simple, self-hosted web analytics for modern websites. Track what matters with full control over your data.",
			"url": "https://openwebtrack.github.io",
			"codeRepository": "https://github.com/openwebtrack/openwebtrack",
			"license": "https://www.gnu.org/licenses/agpl-3.0.html",
			"featureList": [
				"Real-time traffic monitoring",
				"Self-hosted solution",
				"Lightweight tracking script",
				"Revenue tracking",
				"Custom events",
				"Traffic alerts",
				"Geolocation data",
				"UTM tracking",
				"Weekly reports",
				"Team collaboration"
			]
		}
	</script>
</svelte:head>

<div class="min-h-screen">
	<!-- Navbar -->
	<nav class="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
		<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
			<div class="flex items-center gap-2">
				<Logo class="h-7 w-7" />
				<span class="font-semibold tracking-tight">OpenWebTrack</span>
			</div>
			<div class="flex items-center gap-4">
				<a href={resolve('/docs')} class="text-sm text-white/60 transition-colors hover:text-white">Docs</a>
				<a href={resolve('/docs/installation')} class="rounded-md bg-white/10 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/20"> Get Started </a>
			</div>
		</div>
	</nav>

	<!-- Hero -->
	<section class="relative px-4 pt-32 pb-20 sm:px-6">
		<div class="mx-auto max-w-7xl text-center">
			<div class="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
				<span class="relative flex h-1.5 w-1.5">
					<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
					<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500"></span>
				</span>
				Open Source & Self-Hosted
			</div>
			<h1 class="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
				Open-source analytics
				<br />
				<span class="text-white/40">for modern websites</span>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-white/50">Simple, lightweight, and self-hosted web analytics. Track what matters with full control over your data.</p>
			<div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
				<a href={resolve('/docs/installation')} class="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90"> Start Tracking Free </a>
				<a
					class="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
					href="https://github.com/openwebtrack/openwebtrack"
					target="_blank"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
						><path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/></svg
					>
					Star on GitHub
				</a>
			</div>
		</div>

		<!-- Dashboard Preview -->
		<div class="mx-auto mt-16 max-w-[1400px] px-4 sm:px-6">
			<div
				bind:this={mockupContainer}
				class="relative flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#1a1a1a] shadow-2xl shadow-black/50 sm:rounded-xl {isFullscreen ? 'h-screen w-screen' : ''}"
			>
				<!-- Browser Chrome - Mobile Style (hidden on sm+) -->
				<div class="flex items-center justify-between border-b border-white/10 bg-[#1a1a1a] px-3 py-2 sm:hidden">
					<div class="flex items-center gap-2 text-white/60">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg
						>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M9 18l6-6-6-6" /></svg
						>
					</div>
					<div class="mx-3 flex-1">
						<div class="flex items-center justify-center gap-1.5 rounded-full bg-[#252525] px-3 py-1.5 text-[10px] text-white/50">
							<svg
								class="h-3 w-3"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg
							>
							<span class="truncate">openwebtrack.yourcom...</span>
						</div>
					</div>
					<button onclick={toggleFullscreen} class="flex h-6 w-6 items-center justify-center text-white/40" aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
						{#if isFullscreen}
							<svg
								class="h-3.5 w-3.5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg
							>
						{:else}
							<svg
								class="h-3.5 w-3.5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg
							>
						{/if}
					</button>
				</div>

				<!-- Browser Chrome - Desktop Style (hidden on mobile) -->
				<div class="hidden items-center gap-2 border-b border-white/10 bg-[#252525] px-4 py-3 sm:flex">
					<!-- Window Controls -->
					<div class="flex items-center gap-2">
						<div class="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
						<div class="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
						<div class="h-3 w-3 rounded-full bg-[#27c93f]"></div>
					</div>
					<!-- Address Bar -->
					<div class="ml-4 min-w-0 flex-1">
						<div class="flex items-center gap-2 rounded-md bg-[#1a1a1a] px-3 py-1.5 text-xs text-white/40">
							<svg
								class="h-3 w-3 flex-shrink-0"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg
							>
							<span class="truncate">openwebtrack.yourcompany.com</span>
						</div>
					</div>
					<!-- Fullscreen Button -->
					<button
						onclick={toggleFullscreen}
						class="ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/10 hover:text-white"
						aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
					>
						{#if isFullscreen}
							<svg
								class="h-3.5 w-3.5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg
							>
						{:else}
							<svg
								class="h-3.5 w-3.5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								><path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" /></svg
							>
						{/if}
					</button>
				</div>
				<!-- iframe Container with aspect ratio -->
				<div class="relative w-full {isFullscreen ? 'flex-1' : 'aspect-[9/16] sm:aspect-[16/10]'}">
					<iframe class="h-full w-full border-0" title="OpenWebTrack Dashboard Preview" src="https://owt-ge0rg3e.vercel.app/demo" loading="lazy"></iframe>
				</div>
			</div>
			<p class="mt-4 text-center text-xs text-white/40 sm:text-sm">Live dashboard preview with real-time analytics</p>
		</div>
	</section>

	<!-- Features -->
	<section class="border-t border-white/5 px-4 py-20 sm:px-6">
		<div class="mx-auto max-w-7xl">
			<div class="mb-12 text-center">
				<h2 class="mb-3 text-2xl font-semibold tracking-tight">Everything you need</h2>
				<p class="text-white/50">Visitor tracking, session analytics, and real-time dashboards</p>
			</div>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each features as feature}
					<div class="group rounded-xl border border-white/5 bg-white/2 p-6 transition-all hover:border-white/10 hover:bg-white/4">
						<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
							{@html feature.icon}
						</div>
						<h3 class="mb-2 font-medium">{feature.title}</h3>
						<p class="text-sm text-white/50">{feature.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-white/5 px-4 py-8 sm:px-6">
		<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
			<div class="flex items-center gap-2">
				<Logo class="h-6 w-6" />
				<span class="text-sm font-medium">OpenWebTrack</span>
			</div>
			<div class="text-sm text-white/40">© {new Date().getFullYear()} OpenWebTrack. Open source under AGPL-3.0.</div>
		</div>
	</footer>
</div>
