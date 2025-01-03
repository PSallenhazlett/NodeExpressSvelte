import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Car } from "$lib/models/car.model";

async function getCarsFromServer(): Promise<Car[]> {
  return await fetch(
    "http://localhost:3000/car"
  ).then(resp => resp.json())
}

export const load: PageLoad = async ({ params }) => {
  const cars = await getCarsFromServer();

	return {
    title: 'Hello world! 1 2 3',
    cars: cars
  };
};