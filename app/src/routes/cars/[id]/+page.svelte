<script lang="ts">
  import type { Car } from '$lib/models/car.model';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

  const car = data.car;
</script>

<h2>Car Details</h2>

<div class="car-details">
  <span class="info-label">Make:</span> {car.make}
</div>

<div class="car-details">
  <span class="info-label">Model:</span> {car.model}
</div>

<div class="car-details">
  <span class="info-label">Year:</span> {car.year}
</div>

<div class="car-details">
  <span class="info-label">Color:</span> {car.color}
</div>

{#if car.createdBy}
  <div class="car-details">
    <span class="info-label">Added by:</span> <a href={`/users/${car.createdById}`}>{car.createdBy.name}</a>
  </div>
{/if}