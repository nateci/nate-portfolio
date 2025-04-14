import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import Notepad from '../../components/windows/Notepad/Notepad';
function About() {
	const getAge = () => {
		const dateString = '2004-12-24';
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};
	const textContent = () => {
		return `Hello, my name is Nate! 👋\n\nI am a ${getAge()}-year-old Computer Science student from Houston, TX. I am interested in all kinds of tech related topics!  Open the Links folder to view some sites i've worked on, my social media, and my resume! 🤠\n\nAlso this website is built with Next.js and React and is an attempt at recreating my windows desktop :)\n
		`;
	};

	return (
		<>
			<Head>
				<title>nateci - About me</title>
				<link
					rel="canonical"
					href="https://www.natecirino.com/notepad/about"
				/>

				{/* Description */}
				<meta
					name="description"
					content="Who am I? I guess you will find out after reading this."
				/>

				{/* OpenGraph */}
				<meta property="og:title" content="nateci - About me" />
				<meta
					property="og:url"
					content="https://www.natecirino.com/notepad/about"
				/>
				<meta
					property="og:description"
					content="Who am I? I guess you will find out after reading this."
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<Notepad initialText={textContent()} />
				<Icons />
			</div>
		</>
	);
}

export default About;
