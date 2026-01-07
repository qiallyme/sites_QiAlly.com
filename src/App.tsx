import { Routes, Route } from 'react-router-dom';
import Layout from '@qially/ui-react/Layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import SubmitTicket from './pages/SubmitTicket';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Blog from './pages/Blog';
import Post from './pages/Post';
import PortalRedirect from './pages/PortalRedirect';

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/services" element={<Services />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/portfolio" element={<Portfolio />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/support" element={<Support />} />
				<Route path="/submit-ticket" element={<SubmitTicket />} />
				<Route path="/privacy" element={<Privacy />} />
				<Route path="/terms" element={<Terms />} />
				<Route path="/blog" element={<Blog />} />
				<Route path="/blog/:slug" element={<Post />} />
				<Route path="/portal" element={<PortalRedirect />} />
				<Route path="/portal/myhub" element={<PortalRedirect />} />
				{/* 404 fallback */}
				<Route path="*" element={<Home />} />
			</Routes>
		</Layout>
	);
}

export default App;

