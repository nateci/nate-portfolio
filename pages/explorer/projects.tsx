import Head from 'next/head';
import Image from 'next/image';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import styles from '../../styles/utils/List.module.css';
import { ProjectType } from '../../typings';

function Projects({ data }: { data: ProjectType[] }) {
	const content = () => {
		const getDate = (date: string) => {
			const dateString = new Date(date).toLocaleDateString('en-GB', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			});
			return dateString.replace(',', '');
		};

		const formatSize = (size: number) => {
			if (size > 1024) {
				return `${(size / 1024).toFixed(2)} MB`;
			}
			return `${size} KB`;
		};

		return (
			<>
				<div className={styles.listItemContainer}>
					{data.map((project) => (
						<div
							className={styles.listItem}
							key={project.id}
							onClick={() =>
								window.open(
									project.html_url,
									'_blank',
									'noopener,noreferrer'
								)
							}
						>
							<div className={styles.listItemName}>
								<Image
									src="/svg/github.svg"
									alt="icon"
									width={16}
									height={16}
								></Image>
								<p>{project.name}</p>
							</div>
							<p className={styles.listItemDateModified}>
								{getDate(project.updated_at)}
							</p>
							<p className={styles.listItemType}>Shortcut</p>
							<p className={styles.listItemSize}>
								{formatSize(project.size)}
							</p>
						</div>
					))}
				</div>
			</>
		);
	};
	return (
		<>
			<Head>
				<title>nateci - Projects</title>
				<link
					rel="canonical"
					href="https://www.natecirino.com/explorer/projects"
				/>

				{/* Description */}
				<meta
					name="description"
					content="heres da projects!"
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="nateci - Quick access" />
				<meta
					property="og:url"
					content="https://www.natecirino.com/explorer/projects"
				/>
				<meta
					property="og:description"
					content="heres da projects!"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Projects"
					component={content()}
					topNav={true}
				/>
				<Icons />
			</div>
		</>
	);
}

export async function getStaticProps() {
	const userReposRes = await fetch(`https://api.github.com/users/nateci/repos`);
	const userRepos = await userReposRes.json();

	const extraRepos = await Promise.all([
		fetch('https://api.github.com/repos/Northeastern-Electric-Racing/FinishLine').then((r) => r.json()),
		fetch('https://api.github.com/repos/andrewnjoo/foodframe').then((r) => r.json()),
	]);

	const combined = [
		...userRepos.filter(
			(repo: ProjectType) =>
				!repo.fork && repo.full_name !== 'nateci/nateci'
		),
		...extraRepos,
	];

	return {
		props: { data: combined },
		revalidate: 10,
	};
}

export default Projects;
