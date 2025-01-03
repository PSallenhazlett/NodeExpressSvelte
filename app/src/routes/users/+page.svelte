<script lang="ts">
  import type { User } from '$lib/models/user.model';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

  function navigateToUser(user: User) {
    window.location.href = "/users/" + user.id;
  }
</script>

<div class="user-container">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  {#each data.users as user}
    <div class="user-card" onclick={() => navigateToUser(user)}>
      <div class="user-left">
        <div class="user-title">{user.name}</div>
        <div class="user-subtitle">{user.email}</div>
      </div>
    </div>
  {/each}
</div>
