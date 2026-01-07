import { useEffect } from 'react';
import { generateMetaTags } from '@qially/lib/seo';

const Terms = () => {
	const seo = generateMetaTags({
		title: 'Terms of Service',
		description: 'Terms of service for qially.com and Qi Ally consulting engagements.',
		canonical: 'https://qially.com/terms',
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
				<h1 className="hero-title">Terms of Service</h1>
			</div>
			<div className="container mt-12">
				<div className="prose prose-lg max-w-3xl mx-auto">
					<p className="text-plasma-700">Terms of service content goes here...</p>
				</div>
			</div>
		</section>
	);
};

export default Terms;

