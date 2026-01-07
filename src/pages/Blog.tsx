import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateMetaTags } from '@qially/lib/seo';
import { posts } from '../content/blog';

const Blog = () => {
	const seo = generateMetaTags({
		title: 'Blog — QiAlly',
		description: 'Insights, updates, and thoughts on fractional C-suite leadership, AI workflows, and strategic consulting.',
		canonical: 'https://qially.com/blog',
		site: 'qially.com',
	});

	useEffect(() => {
		document.title = seo.title;
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) metaDescription.setAttribute('content', seo.description);
	}, []);

	return (
		<section className="hero">
			<div className="hero-container">
				<h1 className="hero-title">Blog</h1>
				<p className="hero-description">Insights, updates, and thoughts on fractional C-suite leadership, AI workflows, and strategic consulting.</p>
			</div>
			<div className="container mt-12">
				<div className="max-w-3xl mx-auto">
					{posts.length === 0 ? (
						<p className="text-plasma-600 text-center">No posts yet. Check back soon!</p>
					) : (
						<ul className="space-y-8">
							{posts.map((post) => (
								<li key={post.slug} className="card">
									<Link to={`/blog/${post.slug}`} className="block">
										<h2 className="card-title hover:text-primary-600 transition-colors">
											{post.title}
										</h2>
										{post.description && (
											<p className="card-description mt-2">{post.description}</p>
										)}
										{post.date && (
											<p className="text-sm text-plasma-500 mt-4">
												{new Date(post.date).toLocaleDateString('en-US', { 
													year: 'numeric', 
													month: 'long', 
													day: 'numeric' 
												})}
											</p>
										)}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</section>
	);
};

export default Blog;

