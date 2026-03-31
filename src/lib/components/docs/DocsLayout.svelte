<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils/helpers';
	import Logo from '../Logo.svelte';
	import SEO from '../SEO.svelte';

	let { children, frontmatter } = $props();

	let sidebarOpen = $state(false);

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	onMount(() => {
		addCopyButtons();
	});

	function addCopyButtons() {
		const codeBlocks = document.querySelectorAll('.prose pre');
		codeBlocks.forEach((pre) => {
			if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

			// Wrap pre in a container
			const wrapper = document.createElement('div');
			wrapper.className = 'code-block-wrapper';
			pre.parentNode?.insertBefore(wrapper, pre);
			wrapper.appendChild(pre);

			// Add button to wrapper (outside of scrolling pre)
			const button = document.createElement('button');
			button.className = 'copy-btn';
			button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
			button.setAttribute('aria-label', 'Copy to clipboard');
			button.onclick = async () => {
				const code = pre.querySelector('code')?.textContent || '';
				try {
					await navigator.clipboard.writeText(code);
					button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
					setTimeout(() => {
						button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
					}, 2000);
				} catch (err) {
					console.error('Failed to copy:', err);
				}
			};
			wrapper.appendChild(button);
		});
	}

	const sidebarItems = [
		{
			title: 'Getting Started',
			items: [
				{ title: 'Introduction', href: resolve('/docs') },
				{ title: 'Installation', href: resolve('/docs/installation') }
			]
		},
		{
			title: 'Tracking',
			items: [
				{ title: 'Events', href: resolve('/docs/tracking/events') },
				{ title: 'Revenue', href: resolve('/docs/tracking/revenue') }
			]
		}
	];

	const prismTheme = `<style>
		code[class*="language-"],
		pre[class*="language-"] {
			color: #e6edf3;
			text-shadow: none;
			font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
			font-size: 0.875rem;
			text-align: left;
			white-space: pre;
			word-spacing: normal;
			word-break: normal;
			line-height: 1.5;
			tab-size: 4;
			hyphens: none;
		}
		pre[class*="language-"] {
			padding: 0;
			margin: 0;
			overflow: auto;
			background: var(--muted);
			border-radius: 0.5rem;
		}
		pre[class*="language-"] code {
			padding: 1rem;
			display: block;
		}
		:not(pre) > code[class*="language-"] {
			padding: 0.2em 0.4em;
			background: #161b22;
			border-radius: 0.25rem;
		}
		.token.comment,
		.token.prolog,
		.token.doctype,
		.token.cdata {
			color: #8b949e;
		}
		.token.punctuation {
			color: #e6edf3;
		}
		.token.property,
		.token.tag,
		.token.boolean,
		.token.number,
		.token.constant,
		.token.symbol,
		.token.deleted {
			color: #79c0ff;
		}
		.token.selector,
		.token.attr-name,
		.token.string,
		.token.char,
		.token.builtin,
		.token.inserted {
			color: #a5d6ff;
		}
		.token.operator,
		.token.entity,
		.token.url,
		.language-css .token.string,
		.style .token.string {
			color: #d2a8ff;
		}
		.token.atrule,
		.token.attr-value,
		.token.keyword {
			color: #ff7b72;
		}
		.token.function,
		.token.class-name {
			color: #d2a8ff;
		}
		.token.regex,
		.token.important,
		.token.variable {
			color: #ffa657;
		}
	</style>`;

	let currentPath = $derived(page.url.pathname);
</script>

<SEO
	title={frontmatter?.title ? `${frontmatter.title} - Documentation` : 'Documentation'}
	description={frontmatter?.description || 'OpenWebTrack documentation - Learn how to install, configure, and use our open-source web analytics platform.'}
	url={`https://openwebtrack.github.io${page?.url?.pathname || '/docs'}`}
/>

<svelte:head>
	{@html prismTheme}
</svelte:head>

<div class="min-h-screen bg-background">
	<header class="sticky top-0 z-999 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
		<div class="container mx-auto flex h-16 items-center px-4 md:px-0">
			<div class="flex items-center gap-2">
				<Button variant="ghost" size="icon" class="lg:hidden" onclick={toggleSidebar} aria-label="Toggle menu">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="4" x2="20" y1="12" y2="12" />
						<line x1="4" x2="20" y1="6" y2="6" />
						<line x1="4" x2="20" y1="18" y2="18" />
					</svg>
				</Button>
				<a href={resolve('/')} class="flex items-center gap-2 font-semibold">
					<Logo class="h-6 w-6" />
					<span>OpenWebTrack</span>
				</a>
			</div>
			<div class="ml-auto flex items-center gap-2">
				<a href="https://github.com/openwebtrack/openwebtrack" target="_blank">
					<Button variant="ghost" size="sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="mr-2"
						>
							<path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
							/>
						</svg>
						GitHub
					</Button>
				</a>
			</div>
		</div>
	</header>

	<!-- Mobile sidebar backdrop -->
	{#if sidebarOpen}
		<button class="fixed inset-0 z-40 bg-black/50 lg:hidden" onclick={closeSidebar} aria-label="Close sidebar"></button>
	{/if}

	<div class="container mx-auto flex">
		<!-- Mobile sidebar overlay -->
		<aside
			class={cn(
				'fixed top-16 left-0 z-50 w-64 shrink-0 border-r border-border bg-background transition-transform duration-200 ease-in-out lg:static lg:block lg:border-0 lg:bg-transparent lg:transition-none',
				sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
			)}
		>
			<ScrollArea class="h-[calc(100vh-4rem)] py-6 pr-4 pl-4 lg:pl-0">
				<div class="flex flex-col gap-6">
					{#each sidebarItems as section}
						<div class="flex flex-col gap-2">
							<h4 class="text-sm font-semibold text-foreground">{section.title}</h4>
							<div class="flex flex-col gap-1">
								{#each section.items as item}
									<a
										href={item.href}
										onclick={closeSidebar}
										class={cn(
											'rounded-md px-3 py-1.5 text-sm transition-colors',
											currentPath === item.href ? 'bg-primary/10 font-medium text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
										)}
									>
										{item.title}
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</ScrollArea>
		</aside>

		<main class="flex-1 px-6 py-6 pr-6 sm:px-8 sm:pr-8 lg:px-8">
			<div class="mx-auto max-w-3xl">
				<div class="mb-8">
					<h1 class="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{frontmatter?.title || 'Documentation'}</h1>
					{#if frontmatter?.description}
						<p class="mt-2 text-muted-foreground">{frontmatter.description}</p>
					{/if}
				</div>
				<Separator class="mb-8" />
				<article class="prose prose-neutral dark:prose-invert max-w-none">
					{@render children()}
				</article>
			</div>
		</main>
	</div>
</div>

<style>
	:global(.prose) {
		--tw-prose-body: var(--foreground);
		--tw-prose-headings: var(--foreground);
		--tw-prose-lead: var(--muted-foreground);
		--tw-prose-links: var(--primary);
		--tw-prose-bold: var(--foreground);
		--tw-prose-counters: var(--muted-foreground);
		--tw-prose-bullets: var(--muted-foreground);
		--tw-prose-hr: var(--border);
		--tw-prose-quotes: var(--foreground);
		--tw-prose-quote-borders: var(--primary);
		--tw-prose-captions: var(--muted-foreground);
		--tw-prose-code: var(--foreground);
		--tw-prose-pre-code: var(--foreground);
		--tw-prose-pre-bg: var(--muted);
		--tw-prose-th-borders: var(--border);
		--tw-prose-td-borders: var(--border);
		overflow-wrap: break-word;
		word-wrap: break-word;
		word-break: break-word;
	}

	:global(.prose h1) {
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 1rem;
		line-height: 1.2;
	}
	@media (min-width: 640px) {
		:global(.prose h1) {
			font-size: 2rem;
		}
	}

	:global(.prose h2) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		line-height: 1.3;
	}
	@media (min-width: 640px) {
		:global(.prose h2) {
			font-size: 1.5rem;
			margin-top: 2rem;
		}
	}

	:global(.prose h3) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}
	@media (min-width: 640px) {
		:global(.prose h3) {
			font-size: 1.25rem;
			margin-top: 1.5rem;
		}
	}

	:global(.prose p) {
		font-size: 0.9375rem;
		margin-bottom: 1rem;
		line-height: 1.75;
	}
	@media (min-width: 640px) {
		:global(.prose p) {
			font-size: 1rem;
		}
	}

	:global(.prose a) {
		color: var(--primary);
		text-decoration: underline;
		text-underline-offset: 2px;
		transition: opacity 0.2s;
	}

	:global(.prose a:hover) {
		opacity: 0.8;
	}

	:global(.prose code) {
		background: var(--muted);
		padding: 0.2em 0.4em;
		border-radius: 4px;
		font-size: 0.875em;
		font-family: var(--font-mono);
	}

	:global(.prose pre) {
		background: var(--muted);
		padding: 0;
		border-radius: 0.5rem;
		overflow-x: auto;
		margin-bottom: 1rem;
		position: relative;
	}

	:global(.prose pre code) {
		background: transparent !important;
		padding: 1rem !important;
		font-size: 0.875rem;
		display: block;
	}

	:global(.prose ul, .prose ol) {
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin-bottom: 0.5rem;
	}

	:global(.prose blockquote) {
		border-left: 3px solid var(--primary);
		padding-left: 1rem;
		margin-left: 0;
		margin-bottom: 1rem;
		font-style: italic;
		color: var(--muted-foreground);
	}

	:global(.prose hr) {
		border: none;
		border-top: 1px solid var(--border);
		margin: 2rem 0;
	}

	:global(.prose table) {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;
	}

	:global(.prose th, .prose td) {
		border: 1px solid var(--border);
		padding: 0.75rem;
		text-align: left;
	}

	:global(.prose th) {
		background: var(--muted);
		font-weight: 600;
	}

	:global(.code-block-wrapper) {
		position: relative;
		display: block;
		margin-bottom: 1rem;
	}

	:global(.code-block-wrapper .copy-btn) {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		width: 32px;
		height: 32px;
		padding: 0;
		background: var(--popover);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
		opacity: 0.7;
		transition:
			background 0.2s,
			opacity 0.2s,
			border-color 0.2s,
			transform 0.1s;
	}

	:global(.code-block-wrapper .copy-btn:hover) {
		opacity: 1;
		transform: scale(1.05);
	}
</style>
