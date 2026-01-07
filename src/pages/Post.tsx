import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { generateMetaTags } from '@qially/lib/seo';
import { posts } from '../content/blog';
import { WithMDX } from '../mdx/Provider';

const Post = () => {
	const { slug = '' } = useParams<{ slug: string }>();
	const post = posts.find((p) => p.slug === slug);

	useEffect(() => {
		if (post) {
			const seo = generateMetaTags({
				title: `${post.title} — QiAlly Blog`,
				description: post.description || 'Read more on the QiAlly blog.',
				canonical: `https://qially.com/blog/${slug}`,
				site: 'qially.com',
			});
			document.title = seo.title;
			const metaDescription = document.querySelector('meta[name="description"]');
			if (metaDescription) metaDescription.setAttribute('content', seo.description);
		}
	}, [post, slug]);

	if (!post) {
		return (
			<div className="container mx-auto px-4 py-20 text-center">
				<h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
				<Link to="/blog" className="text-primary-600 hover:text-primary-800 underline">
					← Back to Blog
				</Link>
			</div>
		);
	}

	const C = post.Component;

	return (
		<article className="container mx-auto px-4 py-12 max-w-4xl">
			<header className="mb-8">
				<Link to="/blog" className="text-plasma-600 hover:text-plasma-800 text-sm mb-4 inline-block">
					← Back to Blog
				</Link>
				<h1 className="text-4xl md:text-5xl font-bold text-plasma-900 mb-4">
					{post.title}
				</h1>
				{post.date && (
					<p className="text-plasma-500 text-sm">
						{new Date(post.date).toLocaleDateString('en-US', { 
							year: 'numeric', 
							month: 'long', 
							day: 'numeric' 
						})}
					</p>
				)}
			</header>
			<div className="prose prose-lg max-w-none dark:prose-invert">
				<WithMDX>
					<C />
				</WithMDX>
			</div>
		</article>
	);
};

export default Post;

