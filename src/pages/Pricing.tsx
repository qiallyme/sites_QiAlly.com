import { useEffect } from 'react';
import PricingTable from '@qially/ui-react/PricingTable';
import { generateMetaTags } from '@qially/lib/seo';

const Pricing = () => {
	const seo = generateMetaTags({
		title: 'Pricing — QiAlly',
		description: 'Flexible pricing for fractional C-suite services. Clarity Call, Sprint, and Retainer options.',
		canonical: 'https://qially.com/pricing',
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
				<h1 className="hero-title">Pricing</h1>
				<p className="hero-description">Flexible engagement models to fit your needs</p>
			</div>
			<div className="container mt-12">
				<PricingTable tiers={[]} />
			</div>
		</section>
	);
};

export default Pricing;

