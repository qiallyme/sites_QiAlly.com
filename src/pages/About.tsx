import { useEffect } from 'react';
import { generateMetaTags, generateJSONLD } from '@qially/lib/seo';

const About = () => {
	const seo = generateMetaTags({
		title: 'About Us — QiAlly',
		description: 'Learn the story of QiAlly, our mission to provide clarity through systems thinking, and how our team is committed to delivering fractional C-suite leadership and strategic advisory services.',
		canonical: 'https://qially.com/about',
		site: 'qially.com',
	});

	const schema = generateJSONLD('AboutPage', {
		name: 'About QiAlly',
		description: 'Learn about QiAlly\'s origin story, mission, values, and approach to fractional C-suite leadership',
		url: 'https://qially.com/about',
	});

	useEffect(() => {
		document.title = seo.title;
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) metaDescription.setAttribute('content', seo.description);
		const jsonLd = document.createElement('script');
		jsonLd.type = 'application/ld+json';
		jsonLd.textContent = schema;
		document.head.appendChild(jsonLd);
		return () => {
			const existing = document.querySelector('script[type="application/ld+json"]');
			if (existing) existing.remove();
		};
	}, []);

	return (
		<section className="hero">
			<div className="hero-container">
				<h1 className="hero-title">About</h1>
				<p className="hero-description">Short origin story, ethos, and working style.</p>
			</div>
			<div className="container mt-12">
				<div className="prose prose-lg max-w-3xl mx-auto">
					<p className="text-plasma-700">
						<strong>Qi Ally</strong> delivers fractional C-suite leadership to growth-stage companies that need strategic finance, operations excellence, and AI-powered workflows—without the cost of full-time executives.
					</p>
					<h2 className="text-2xl font-semibold mt-8 mb-4">What We Do</h2>
					<p className="text-plasma-700 mb-4">We partner with founders, CEOs, and boards to:</p>
					<ul className="list-disc list-inside space-y-2 text-plasma-700">
						<li><strong>Stabilize finances</strong> — Cashflow modeling, fundraising support, financial systems</li>
						<li><strong>Scale operations</strong> — Process design, team structure, vendor management</li>
						<li><strong>Embed intelligence</strong> — AI workflow automation, custom integrations, data orchestration</li>
						<li><strong>Navigate pivots</strong> — Strategic planning, M&A readiness, investor relations</li>
					</ul>
					<h2 className="text-2xl font-semibold mt-8 mb-4">Why "Qi Ally"?</h2>
					<p className="text-plasma-700">
						<strong>Qi</strong> (氣) represents vital energy, flow, and alignment. We help organizations find their rhythm—financially, operationally, and strategically. An <strong>ally</strong> walks alongside you, not above you.
					</p>
					<div className="mt-8">
						<a href="/contact" className="btn btn-primary">Schedule a clarity call →</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;

