import adapter_static from '@sveltejs/adapter-static';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { mdsvex } from 'mdsvex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.mdx'],
	preprocess: [
		mdsvex({
			extensions: ['.md', '.mdx'],
			layout: {
				_: resolve(__dirname, './src/lib/components/docs/DocsLayout.svelte')
			}
		})
	],
	kit: {
		adapter: adapter_static({
			fallback: '404.html'
		}),
		paths: {
			base: ''
		},
		prerender: {
			handleHttpError: ({ path, message }) => {
				if (path.startsWith('/docs')) return;
				throw new Error(message);
			}
		},
		alias: {
			'@/*': './src/lib/*'
		}
	}
};

export default config;
