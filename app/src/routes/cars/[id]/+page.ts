import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Car } from "$lib/models/car.model";

async function getCarFromServer(id: string): Promise<Car> {
  return await fetch(
    `http://localhost:3000/car/${id}`
  ).then(resp => resp.json())
}

export const load: PageLoad = async ({ params }) => {
  const car = await getCarFromServer(params.id);

	return {
    car: car
  };
};