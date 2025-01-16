<script lang="ts">
  import { page } from '$app/state';
  import '../app.css'
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: LayoutData, children: Snippet } = $props();
</script>

<div class="body">
  <div class="body-header">
    <h1>Node JS TypeScript Test</h1>

    <nav class="header-nav">
      <ul class="header-nav-list">
        {#each data.sections as section}
          <li class="header-nav-item" class:active={(section.title === 'Home' && page.route.id == '/') || (section.title !== 'Home' && page.route.id?.startsWith(section.slug))}>
            <a href={section.slug}>{section.title}</a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>

  <div class="body-content">
    {@render children?.()}
  </div>
</div>