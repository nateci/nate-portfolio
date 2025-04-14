import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';

function Pictures() {
	return (
		<>
			<Head>
				<title>nateci - Pictures</title>
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
				<meta property="og:title" content="nateci - Pictures" />
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
					folder="Pictures"
					topNav={true}
					icon="pictures"
				/>
				<Icons />
			</div>
		</>
	);
}

export default Pictures;
