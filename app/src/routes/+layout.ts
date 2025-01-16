import type { LayoutLoad } from './$types';
import { page } from '$app/state';

export const load: LayoutLoad = () => {
	return {
		sections: [
      { slug: '/', title: 'Home'},
			{ slug: '/cars', title: 'Cars' },
			{ slug: '/users', title: 'Users' }
		]
	};
};