import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../../components/modules/Icons/Icons';
import FileExplorer from '../../components/windows/FileExplorer/FileExplorer';
import styles from '../../styles/utils/List.module.css';

function Links() {
	const content = () => {
		return (
			<>
				<div className={styles.listItemContainer}>
					<Link href={'https://linkedin.com/in/nate-cirino/'} passHref>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/linkedin.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>Linkedin</p>
								</div>
								<p className={styles.listItemDateModified}>
									04/08/2025 02:02
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link href={'https://github.com/nateci/'} passHref>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/github.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>Github</p>
								</div>
								<p className={styles.listItemDateModified}>
									04/08/2025 08:00
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={
							'https://open.spotify.com/user/neatix'
						}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/spotify.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>Spotify</p>
								</div>
								<p className={styles.listItemDateModified}>
									10/04/2025 04:20
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={
							'https://brokenplanet.com'
						}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/brokenplanet.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>Brokenplanet</p>
								</div>
								<p className={styles.listItemDateModified}>
									10/04/2025 04:20
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={
							'https://dailypaperclothing.com'
						}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/dailypaper.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>Dailypaper</p>
								</div>
								<p className={styles.listItemDateModified}>
									10/04/2025 04:20
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={
							'https://plum-julienne-9.tiiny.site'
						}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/resume.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>Resume</p>
								</div>
								<p className={styles.listItemDateModified}>
									10/04/2025 04:20
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={
							'https://nateci.github.io/caloriecounter/'
						}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/calorie.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>Caloriecounter</p>
								</div>
								<p className={styles.listItemDateModified}>
									10/04/2025 04:20
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
					<Link
						href={
							'https://cnphouston.com'
						}
						passHref
					>
						<a target="_blank">
							<div className={styles.listItem}>
								<div className={styles.listItemName}>
									<Image
										src="/svg/momwebsite.svg"
										alt="icon"
										width={18}
										height={18}
									></Image>
									<p>CNPHouston</p>
								</div>
								<p className={styles.listItemDateModified}>
									10/04/2025 04:20
								</p>
								<p className={styles.listItemType}>Shortcut</p>
								<p className={styles.listItemSize}>2kt</p>
							</div>
						</a>
					</Link>
				</div>
			</>
		);
	};
	return (
		<>
			<Head>
				<title>nateci - Links</title>
				<link
					rel="canonical"
					href="https://www.natecirino.com/explorer/links"
				/>

				{/* Description */}
				<meta
					name="description"
					content="All my social media links combined in one place. How cool is that? "
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="nateci - Links" />
				<meta
					property="og:url"
					content="https://www.natecirino.com/explorer/links"
				/>
				<meta
					property="og:description"
					content="All my social media links combined in one place. How cool is that?"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<FileExplorer
					icon="folder"
					folder="Links"
					topNav={true}
					component={content()}
				/>
				<Icons />
			</div>
		</>
	);
}

export default Links;
