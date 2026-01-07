import { useEffect } from 'react';

const PortalRedirect = () => {
	useEffect(() => {
		window.location.href = 'https://myhub.qially.com';
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<p className="text-plasma-600">Redirecting to client portal...</p>
		</div>
	);
};

export default PortalRedirect;

