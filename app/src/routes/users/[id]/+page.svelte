<script lang="ts">
  import type { Car } from '$lib/models/car.model';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

  const user = data.user;
  
  function navigateToCar(car: Car) {
    window.location.href = "/cars/" + car.id;
  }
</script>

<h2>User Details</h2>

<div class="user-details">
  <span class="info-label">Name:</span> {user.name}.
</div>

<div class="user-details">
  <span class="info-label">Email:</span> {user.email}.
</div>

<h2>Cars</h2>

<div class="car-container">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_interactive_supports_focus -->
  {#each data.cars as car}
    <div class="car-card" onclick={() => navigateToCar(car)}>
      <div class="car-left">
        <div class="car-title">{car.year} {car.make} {car.model}</div>
        <div class="car-subtitle">{car.color}</div>
      </div>

      <div class="car-right">
        {#if car.createdBy}
          <div class="car-created">
            Added by {car.createdBy.name}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>
