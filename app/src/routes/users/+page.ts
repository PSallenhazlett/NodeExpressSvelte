import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { User } from '$lib/models/user.model';

async function getUsersFromServer(): Promise<User[]> {
  return await fetch(
    "http://localhost:3000/user"
  ).then(resp => resp.json())
}

export const load: PageLoad = async ({ params }) => {
  const users = await getUsersFromServer();

  return {
    users: users
  };
};