import { useEffect, useState } from 'react';
import { generateMetaTags } from '@qially/lib/seo';

const skills = [
	{ name: 'HR Operations & Employee Support', level: 95, category: 'Core' },
	{ name: 'HRIS Systems (Workday, SuccessFactors, UKG)', level: 85, category: 'Systems' },
	{ name: 'Onboarding & Offboarding Workflows', level: 95, category: 'Core' },
	{ name: 'Data Accuracy, Audits & Compliance', level: 90, category: 'Core' },
	{ name: 'Employee Changes Management', level: 90, category: 'Core' },
	{ name: 'People Analytics Basics', level: 75, category: 'Analytics' },
	{ name: 'Reporting & Dashboards', level: 85, category: 'Analytics' },
	{ name: 'Process Mapping & SOP Development', level: 95, category: 'Operations' },
	{ name: 'Document Management', level: 90, category: 'Operations' },
	{ name: 'Confidentiality & Data Security', level: 100, category: 'Core' },
	{ name: 'Multitasking & Time Management', level: 95, category: 'Operations' },
	{ name: 'Conflict Resolution', level: 85, category: 'Soft Skills' },
	{ name: 'High EQ & Communication', level: 95, category: 'Soft Skills' },
	{ name: 'Calm Under Pressure', level: 95, category: 'Soft Skills' },
	{ name: 'Google Workspace Tools', level: 90, category: 'Systems' },
	{ name: 'Excel/Sheets (VLOOKUP, Formulas)', level: 85, category: 'Systems' },
];

const accomplishments = [
	{
		title: 'HR Operations Excellence',
		items: [
			'Managed onboarding processes, document collection, and data accuracy across multiple clients',
			'Built HR workflow maps, SOPs, and employee support processes for small businesses',
			'Assisted with employee data updates, payroll coordination, and time-tracking corrections',
		],
	},
	{
		title: 'Systems & Process Innovation',
		items: [
			'Designed organizational workflows for hiring pipelines, client onboarding, and record management',
			'Built HR-style systems inside Notion, Google Workspace, and other tools to support operations',
			'Created dashboards tracking tasks, employee info, work progress, and performance metrics',
		],
	},
	{
		title: 'Data & Compliance',
		items: [
			'Created data-cleaning processes using Sheets/Excel to reduce administrative errors',
			'Maintained documentation libraries, knowledge bases, and internal process guides',
			'Managed sensitive information with strict confidentiality and accuracy',
		],
	},
	{
		title: 'Employee Support & Operations',
		items: [
			'Provided employee support: FAQ handling, troubleshooting, and process guidance',
			'Supported clients with policy development, communication templates, and compliance tasks',
			'Handled scheduling, records, customer service, onboarding tasks, and documentation',
		],
	},
];

const SkillTag = ({ skill, index, onHover }: { skill: typeof skills[0]; index: number; onHover: (skill: typeof skills[0] | null) => void }) => {
	const colors = {
		Core: 'bg-blue-500 text-white',
		Systems: 'bg-purple-500 text-white',
		Analytics: 'bg-teal-500 text-white',
		Operations: 'bg-orange-500 text-white',
		'Soft Skills': 'bg-green-500 text-white',
	};

	return (
		<button
			onMouseEnter={() => onHover(skill)}
			onMouseLeave={() => onHover(null)}
			className={`${colors[skill.category as keyof typeof colors] || 'bg-gray-500'} 
				px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
				hover:scale-110 hover:shadow-lg transform
				relative group`}
			style={{ animationDelay: `${index * 50}ms` }}
		>
			{skill.name}
			<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
		</button>
	);
};

const Portfolio = () => {
	const [hoveredSkill, setHoveredSkill] = useState<typeof skills[0] | null>(null);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const seo = generateMetaTags({
		title: 'Portfolio — QiAlly',
		description: 'Selected work and outcomes from QiAlly engagements.',
		canonical: 'https://qially.com/portfolio',
		site: 'qially.com',
	});

	useEffect(() => {
		document.title = seo.title;
		const metaDescription = document.querySelector('meta[name="description"]');
		if (metaDescription) metaDescription.setAttribute('content', seo.description);
	}, []);

	const categories = Array.from(new Set(skills.map(s => s.category)));
	const filteredSkills = selectedCategory 
		? skills.filter(s => s.category === selectedCategory)
		: skills;

	return (
		<div className="min-h-screen bg-gradient-to-b from-plasma-50 to-white">
			<section className="hero">
				<div className="hero-container">
					<h1 className="hero-title">Portfolio & Skills</h1>
					<p className="hero-description">HR Operations • Systems • People Analytics</p>
				</div>
			</section>

			{/* Accomplishments Summary */}
			<section className="section bg-white">
				<div className="container">
					<h2 className="text-3xl font-bold text-plasma-900 mb-8 text-center">Key Accomplishments</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{accomplishments.map((acc, idx) => (
							<div key={idx} className="card hover:shadow-lg transition-shadow">
								<h3 className="card-title">{acc.title}</h3>
								<ul className="space-y-2">
									{acc.items.map((item, i) => (
										<li key={i} className="text-plasma-600 flex items-start gap-2">
											<span className="text-primary-600 mt-1">✓</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Interactive Skills Chart */}
			<section className="section bg-gradient-to-b from-plasma-50 to-white">
				<div className="container">
					<h2 className="text-3xl font-bold text-plasma-900 mb-4 text-center">Skills & Expertise</h2>
					<p className="text-plasma-600 text-center mb-8 max-w-2xl mx-auto">
						Hover over skills to see proficiency levels. Filter by category to focus on specific areas.
					</p>

					{/* Category Filters */}
					<div className="flex flex-wrap justify-center gap-3 mb-8">
						<button
							onClick={() => setSelectedCategory(null)}
							className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
								selectedCategory === null
									? 'bg-primary-600 text-white shadow-lg'
									: 'bg-white text-plasma-700 border border-plasma-200 hover:border-primary-300'
							}`}
						>
							All Skills
						</button>
						{categories.map(cat => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
									selectedCategory === cat
										? 'bg-primary-600 text-white shadow-lg'
										: 'bg-white text-plasma-700 border border-plasma-200 hover:border-primary-300'
								}`}
							>
								{cat}
							</button>
						))}
					</div>

					{/* Skills Cloud */}
					<div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
						<div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
							{filteredSkills.map((skill, idx) => (
								<SkillTag key={idx} skill={skill} index={idx} onHover={setHoveredSkill} />
							))}
						</div>
					</div>

					{/* Skill Detail Card */}
					{hoveredSkill && (
						<div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 border-2 border-primary-200 animate-in fade-in duration-300">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-bold text-plasma-900">{hoveredSkill.name}</h3>
								<span className="text-xs font-semibold text-plasma-500 bg-plasma-100 px-3 py-1 rounded-full">
									{hoveredSkill.category}
								</span>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-plasma-600">Proficiency</span>
									<span className="font-bold text-plasma-900">{hoveredSkill.level}%</span>
								</div>
								<div className="w-full bg-plasma-100 rounded-full h-3 overflow-hidden">
									<div
										className="bg-gradient-to-r from-primary-500 to-primary-600 h-full rounded-full transition-all duration-500"
										style={{ width: `${hoveredSkill.level}%` }}
									></div>
								</div>
							</div>
						</div>
					)}
				</div>
			</section>

			{/* Skills Grid Visualization */}
			<section className="section bg-white">
				<div className="container">
					<h2 className="text-3xl font-bold text-plasma-900 mb-8 text-center">Skills by Category</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{categories.map(category => {
							const categorySkills = skills.filter(s => s.category === category);
							const avgLevel = Math.round(categorySkills.reduce((sum, s) => sum + s.level, 0) / categorySkills.length);
							
							return (
								<div key={category} className="card hover:shadow-xl transition-all">
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-bold text-plasma-900">{category}</h3>
										<span className="text-2xl font-bold text-primary-600">{avgLevel}%</span>
									</div>
									<div className="space-y-3">
										{categorySkills.map((skill, idx) => (
											<div key={idx}>
												<div className="flex items-center justify-between text-sm mb-1">
													<span className="text-plasma-700 truncate flex-1">{skill.name}</span>
													<span className="text-plasma-500 font-semibold ml-2">{skill.level}%</span>
												</div>
												<div className="w-full bg-plasma-100 rounded-full h-2">
													<div
														className="bg-primary-500 h-2 rounded-full transition-all duration-700"
														style={{ width: `${skill.level}%` }}
													></div>
												</div>
											</div>
										))}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section bg-gradient-to-r from-primary-600 to-primary-700 text-white">
				<div className="container text-center">
					<h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
					<p className="text-primary-100 mb-8 max-w-2xl mx-auto">
						Available to start immediately. Let's discuss how I can support your HR operations.
					</p>
					<a href="/contact" className="btn bg-white text-primary-600 hover:bg-primary-50 font-bold px-8 py-3 text-lg">
						Get In Touch
					</a>
				</div>
			</section>
		</div>
	);
};

export default Portfolio;

