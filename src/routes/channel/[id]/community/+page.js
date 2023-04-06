export const load = async ({ params }) => {
	const allPosts = await (await fetch(`https://dummyjson.com/posts/user/${params.id}`)).json();
	const posts = allPosts.posts;

	return { posts };
};
