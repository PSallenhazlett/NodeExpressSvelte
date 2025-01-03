import type { PageLoad } from './$types';
import type { User } from "$lib/models/user.model";
import type { Car } from '$lib/models/car.model';

async function getUserFromServer(id: string): Promise<User> {
  return await fetch(
    `http://localhost:3000/user/${id}`
  ).then(resp => resp.json())
}

async function getCarsForUser(id: string): Promise<Car[]> {
  return await fetch(
    `http://localhost:3000/user/${id}/cars`
  ).then(resp => resp.json())
}

export const load: PageLoad = async ({ params }) => {
  const user = await getUserFromServer(params.id);
  const userCars = await getCarsForUser(params.id);

  return {
    title: user.name,
    user: user,
    cars: userCars
  };
};