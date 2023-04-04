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
	// TODO Fetch users and assign to channels before return
	const channels = users.users.map((el) => {
		return {
			id: el.id,
			username: el.username,
			image: el.image,
			videos: allVideos.slice(el.id * 3 - 1, el.id * 3 - 1 + 3)
		};
	});
	const aVideos = [...channels.map((el) => [...el.videos])].flat();
	const videos = aVideos.map((el) => {
		let channel = channels.find((channel) => channel.videos.includes(el));
		return { ...el, channel };
	});
	console.log(videos);
	return { videos, channels };
};
