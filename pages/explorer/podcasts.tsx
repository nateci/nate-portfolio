import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';

function Podcasts() {
	return (
		<>
			<Head>
				<title>nateci - Podcasts</title>
				<link
					rel="canonical"
					href="https://www.natecirino.com/explorer/downloads"
				/>

				{/* Description */}
				<meta
					name="description"
					content="I have an obsession to keep this folder empty."
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="nateci - Podcasts" />
				<meta
					property="og:url"
					content="https://www.natecirino.com/explorer/downloads"
				/>
				<meta
					property="og:description"
					content="I have an obsession to keep this folder empty."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					folder="Podcasts"
					topNav={true}
					icon="podcasts"
				/>
				<Icons />
			</div>
		</>
	);
}

export default Podcasts;
