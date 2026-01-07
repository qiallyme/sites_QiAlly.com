import { useEffect } from 'react';
import { generateMetaTags } from '@qially/lib/seo';

const Privacy = () => {
	const seo = generateMetaTags({
		title: 'Privacy Policy',
		description: 'Privacy policy for qially.com and Qi Ally services. Learn how we collect, use, and protect your personal information.',
		canonical: 'https://qially.com/privacy',
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
				<h1 className="hero-title">Privacy Policy</h1>
			</div>
			<div className="container mt-12">
				<div className="prose prose-lg max-w-3xl mx-auto">
					<p className="text-plasma-700">Privacy policy content goes here...</p>
				</div>
			</div>
		</section>
	);
};

export default Privacy;

