import { HomePage } from '@/pages/home/HomePage'

export const CONFIG = {
	HOME: {
		LINK: '/',
		PAGE: <HomePage />,
	}
};

export const CONFIG_PAGES = [
	{
		link: CONFIG.HOME.LINK,
		page: CONFIG.HOME.PAGE,
	}
]