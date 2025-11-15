import Head from 'next/head';
import Icons from '../../components/modules/Icons/Icons';
import DraggableWindow from '../../components/utils/DraggableWindow/DraggableWindow';
import { AiOutlineFile } from 'react-icons/ai';
import styles from '../../components/windows/Notepad/Notepad.module.css';

function Resume() {
	return (
		<>
			<Head>
				<title>nateci - Resume</title>
				<link rel="canonical" href="https://www.natecirino.com/resume/resume" />
				<meta
					name="description"
					content="Nate Cirino's resume - Computer Science student at Northeastern University"
				/>
				<meta property="og:title" content="nateci - Resume" />
				<meta
					property="og:url"
					content="https://www.natecirino.com/resume/resume"
				/>
				<meta
					property="og:description"
					content="Nate Cirino's resume - Computer Science student at Northeastern University"
				/>
			</Head>
			<div style={{ height: '100%' }}>
				<DraggableWindow
					windowName={'resume'}
					topTitle="Nate_Cirino_Resume.pdf"
					topIcon={<AiOutlineFile />}
				>
					<div className={styles.pdfContainer}>
						<iframe
							src="/resume/Nate_resume.pdf"
							className={styles.pdfFrame}
							title="Nate Cirino Resume"
						/>
					</div>
				</DraggableWindow>
				<Icons />
			</div>
		</>
	);
}

export default Resume;
