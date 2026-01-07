import { useEffect } from 'react';
import { generateMetaTags } from '@qially/lib/seo';

const Contact = () => {
	const seo = generateMetaTags({
		title: 'Contact Us — QiAlly',
		description: 'Get in touch with QiAlly. Fill in the form or use our contact details to connect with our team.',
		canonical: 'https://qially.com/contact',
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
				<h1 className="hero-title">Let's Talk</h1>
				<p className="hero-description">Whether you need fractional leadership, AI workflow support, or strategic clarity, we're here to help.</p>
			</div>
			<div className="container mt-12">
				<div className="max-w-2xl mx-auto">
					<div className="card mb-6">
						<h2 className="card-title">📅 Schedule a Clarity Call</h2>
						<p className="card-description">Free 30-minute discovery conversation</p>
						<p className="text-plasma-700 mb-4">Understand your context, explore if we're a fit, and design a custom proposal if it makes sense.</p>
						<a href="#" className="btn btn-primary">Book a call via Calendly</a>
					</div>
					<div className="card">
						<h2 className="card-title">✉️ Email Us</h2>
						<p className="text-plasma-700 mb-2"><strong>General inquiries:</strong> hello@qially.com</p>
						<p className="text-plasma-700 mb-2"><strong>Existing clients:</strong> portal@qially.com</p>
						<p className="text-plasma-700"><strong>Partnerships:</strong> partners@qially.com</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;

