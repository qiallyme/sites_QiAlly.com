import { useEffect } from 'react';
import { generateMetaTags } from '@qially/lib/seo';

const Support = () => {
	const seo = generateMetaTags({
		title: 'Support — QiAlly',
		description: 'Need help? Visit QiAlly Support to get answers, submit a ticket, and access our help resources.',
		canonical: 'https://qially.com/support',
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
				<h1 className="hero-title">Support</h1>
				<p className="hero-description">Get help and access resources</p>
			</div>
			<div className="container mt-12">
				<div className="text-center">
					<p className="text-plasma-700 mb-6">Visit our support portal for help, documentation, and ticket submission.</p>
					<a 
						href="https://support.qially.me" 
						target="_blank" 
						rel="noopener noreferrer"
						className="btn btn-primary"
					>
						Go to Support Portal →
					</a>
				</div>
			</div>
		</section>
	);
};

export default Support;

