import { useEffect } from 'react';
import { generateMetaTags, generateJSONLD } from '@qially/lib/seo';

const Services = () => {
	const seo = generateMetaTags({
		title: 'Services — QiAlly',
		description: 'Fractional C-suite, AI workflows, finance & ops consulting tailored to growth-stage companies.',
		canonical: 'https://qially.com/services',
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
				<h1 className="hero-title">Services</h1>
				<p className="hero-description">Fractional C-suite leadership and AI-powered operations for companies ready to scale with clarity.</p>
			</div>
			<div className="container mt-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="card">
						<h2 className="card-title">💰 Fractional CFO</h2>
						<p className="card-description">Strategic finance leadership, on demand</p>
						<ul className="list-disc list-inside space-y-2 text-plasma-700 mb-4">
							<li>Cashflow modeling & forecasting</li>
							<li>Fundraising support</li>
							<li>Financial systems setup</li>
							<li>Board-ready reporting</li>
						</ul>
					</div>
					<div className="card">
						<h2 className="card-title">⚙️ Fractional COO</h2>
						<p className="card-description">Operations excellence without full-time overhead</p>
						<ul className="list-disc list-inside space-y-2 text-plasma-700 mb-4">
							<li>Process design & optimization</li>
							<li>Team structure & hiring</li>
							<li>Vendor management</li>
							<li>Operational KPIs</li>
						</ul>
					</div>
					<div className="card">
						<h2 className="card-title">🤖 AI Workflow Automation</h2>
						<p className="card-description">Custom AI integrations that actually work</p>
						<ul className="list-disc list-inside space-y-2 text-plasma-700 mb-4">
							<li>Workflow design & implementation</li>
							<li>API integrations</li>
							<li>Data orchestration</li>
							<li>Performance monitoring</li>
						</ul>
					</div>
					<div className="card">
						<h2 className="card-title">📊 Strategic Advisory</h2>
						<p className="card-description">Board-level strategy and planning</p>
						<ul className="list-disc list-inside space-y-2 text-plasma-700 mb-4">
							<li>Strategic planning</li>
							<li>M&A readiness</li>
							<li>Investor relations</li>
							<li>Pivot navigation</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 text-center">
					<a href="/contact" className="btn btn-primary">Get Started</a>
				</div>
			</div>
		</section>
	);
};

export default Services;

