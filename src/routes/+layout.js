import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyChwC5GMVqTugVEX3GZov3WoK50ZJ8IKkw',
	authDomain: 'ytclone-ef.firebaseapp.com',
	projectId: 'ytclone-ef',
	storageBucket: 'ytclone-ef.appspot.com',
	messagingSenderId: '978819122748',
	appId: '1:978819122748:web:d5c17cdb82ec93b540a539'
};

const app = initializeApp(firebaseConfig);

export const load = async () => {
	const allVideos = await (await import('../lib/videos.json')).default;
	const users = await (await fetch('https://dummyjson.com/users?limit=5')).json();

	const channels = users.users.map((el) => {
		return {
			id: el.id,
			username: el.username,
			image: el.image,
			subscribers: Math.round(Math.random() * 999999),
			videos: allVideos.slice(el.id * 3 - 1, el.id * 3 - 1 + 3),
			birthDate: el.birthDate,
			university: el.university,
			city: el.address.city,
			name: `${el.firstName} ${el.lastName}`
		};
	});
	const aVideos = [...channels.map((el) => [...el.videos])].flat();
	const videos = aVideos.map((el) => {
		let channel = channels.find((channel) => channel.videos.includes(el));
		let likes = Math.round(el.views * 0.3);
		return { ...el, channel, likes };
	});
	return { videos, channels };
};
