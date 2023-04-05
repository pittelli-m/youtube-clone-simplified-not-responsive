export const load = async () => {
	// TODO sveltekit tutorial load function

	const allPosts = await (await fetch('https://dummyjson.com/posts?limit=30&skip=30')).json();

	const getPosts = async () => {
		const posts = await Promise.all(allPosts.posts.map((el) => getAuthor(el)));
		return posts;
	};

	const getAuthor = async (el) => {
		let user = await (await fetch(`https://dummyjson.com/users/${el.id}`)).json();
		const author = user.username;
		return {
			post: el.body,
			authorID: el.userId,
			author
		};
	};

	const posts = await getPosts();

	console.log(posts);

	return { posts };
};
