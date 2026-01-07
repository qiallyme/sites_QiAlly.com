import { useEffect } from 'react';
import Hero from '@qially/ui-react/Hero/Hero';
import CTA from '@qially/ui-react/CTA';
import { generateMetaTags, generateJSONLD } from '@qially/lib/seo';

const Home = () => {
	const seo = generateMetaTags({
		title: 'QiAlly — Systems of Clarity',
		description: 'Fractional C-suite leadership, AI workflow consulting, and strategic advisory services. Strategy, structure, and soulful execution for solo operators and small teams.',
		canonical: 'https://qially.com',
		ogImage: 'https://qially.com/og-home.png',
		site: 'qially.com',
	});

	const schema = generateJSONLD('WebPage', {
		name: 'QiAlly — Systems of Clarity',
		description: 'Fractional C-suite leadership, AI workflow consulting, and strategic advisory services',
		url: 'https://qially.com',
	});

	useEffect(() => {
		document.title = seo.title;
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) {
			metaDescription.setAttribute('content', seo.description);
		}
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
		<>
			<Hero
				title="Systems that turn chaos into clarity."
				subtitle="Strategy, structure, and soulful execution for solo operators and small teams."
				cta={{ text: "See how we work", href: "/services" }}
				secondaryCta={{ text: "Schedule a Call", href: "/contact" }}
			/>
			
			<section className="container section">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="card">
						<h3 className="card-title">Offer</h3>
						<p className="card-description">QiSuite: ops, brand, and digital stack setup that actually sticks.</p>
						<a href="/services" className="btn btn-primary">Explore services</a>
					</div>
					<div className="card">
						<h3 className="card-title">Proof</h3>
						<p className="card-description">Selected work and outcomes.</p>
						<a href="https://portfolio.qially.com" className="btn btn-primary" target="_blank" rel="noopener">View portfolio</a>
					</div>
					<div className="card">
						<h3 className="card-title">Codex</h3>
						<p className="card-description">Empower Q Now — the inner engine that informs the work.</p>
						<a href="/codex" className="btn btn-primary">Open the Codex</a>
					</div>
					<div className="card">
						<h3 className="card-title">Blog</h3>
						<p className="card-description">Insights, updates, and thoughts on fractional leadership and AI workflows.</p>
						<a href="/blog" className="btn btn-primary">Read the Blog</a>
					</div>
				</div>
			</section>
			
			<CTA
				heading="Ready to scale with clarity?"
				subheading="Let's talk about your next phase."
				buttonText="Schedule a Call"
				buttonHref="/contact"
				variant="primary"
			/>
		</>
	);
};

export default Home;

