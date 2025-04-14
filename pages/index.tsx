import Head from 'next/head';
import Icons from '../components/modules/Icons/Icons';

export default function Home() {
	return (
		<>
			<Head>
				<title>nateci</title>
				<link rel="canonical" href="https://www.natecirino.com" />

				{/* Description */}
				<meta
					name="description"
					content="nateci's personal website. A place to share my projects and learn about me. I do some coding sometimes."
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="nateci" />
				<meta property="og:url" content="https://www.natecirino.com" />
				<meta
					property="og:description"
					content="nateci's personal website. A place to share my projects and learn about me. I do some coding sometimes."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<Icons />
			</div>
		</>
	);
}
