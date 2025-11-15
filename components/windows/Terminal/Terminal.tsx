import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HistoryType } from '../../../typings';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import styles from './Terminal.module.css';
import { desktopFiles } from '../../../data/fileIndex';
interface HistoryTypeExtended extends HistoryType {
	isLoading?: boolean;
	isAI?: boolean;
}

function Terminal() {
	const [history, setHistory] = useState<HistoryTypeExtended[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);
	const terminalRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// Auto-scroll to bottom whenever history changes
	useEffect(() => {
		if (terminalRef.current) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
		}
		// Also focus the input
		if (inputRef.current && !isProcessing) {
			inputRef.current.focus();
		}
	}, [history, isProcessing]);

	const askAI = async (query: string): Promise<string> => {
		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query }),
			});

			if (!response.ok) {
				throw new Error('API request failed');
			}

			const data = await response.json();
			return data.response;
		} catch (error) {
			console.error('AI Error:', error);
			return 'Sorry, the AI assistant is temporarily unavailable. Try other commands like "about", "experience", or "skills".';
		}
	};

	const executeCommand = useCallback(
		async (input: string) => {
			const parts = input.trim().split(' ');
			const command = parts[0].toLowerCase();
			const args = parts.slice(1);

			// prevent multiple commands while "thinking"
			if (isProcessing) return;

			switch (command) {
				case 'help':
					setHistory([
						...history,
						{
							input: input,
							response: `Available commands:<br/>
help           - display this help message<br/>
clear          - clear the terminal screen<br/>
ls             - list files in the current directory<br/>
echo [text]    - display in text/string<br/>
whoami         - display the current user<br/>
about          - about Nate<br/>
experience     - work experience summary<br/>
skills         - technical skills<br/>
projects       - view projects<br/>
contact        - contact information<br/>
ai [question] - ask me anything via AI<br/>
<br/>
Examples:<br/>
ai what are nate's strongest skills?<br/>
ai what is nate avaliability?`,
						},
					]);
					break;

				case 'clear':
					setHistory([]);
					break;

				case 'whoami':
					setHistory([
						...history,
						{
							input: input,
							response: `nateci`,
						},
					]);
					break;

				case 'about':
					setHistory([
						...history,
						{
							input: input,
							response: `Nate Cirino - Software Engineer<br/>
Northeastern University CS Student (Class of 2027)<br/>
Currently @ Wolters Kluwer building AI-powered healthcare features<br/>
<br/>
💡 Type 'ai "tell me more about nate"' for details!`,
						},
					]);
					break;

				case 'experience':
					setHistory([
						...history,
						{
							input: input,
							response: `Work Experience:<br/>
- Wolters Kluwer (July 2025 - Present) - Software Engineer<br/>
- SculptAI (Jan 2025 - June 2025) - Software Engineer<br/>
- Chevron New Energies (May 2024 - Aug 2024) - SWE Intern<br/>
- Legacy Community Health (May 2023 - Aug 2023) - SWE Intern<br/>
<br/>
💡 Type 'ai "tell me about nate's work at [company]"' for details!`,
						},
					]);
					break;

				case 'skills':
					setHistory([
						...history,
						{
							input: input,
							response: `Technical Skills:<br/>
Languages: TypeScript, Python, Java, C++, C, Kotlin<br/>
Frontend: React, Vue, Tailwind CSS<br/>
Backend: Node.js, Django, Java Spring<br/>
ML/AI: PyTorch, TensorFlow, LLM Integration<br/>
Cloud: AWS, Azure, Kubernetes, Docker<br/>
<br/>
💡 Type 'ai "what is nate's strongest tech stack?"' for more!`,
						},
					]);
					break;

				case 'projects':
					setHistory([
						...history,
						{
							input: input,
							response: `Featured Projects:<br/>
- NateOS (this portfolio!) - Interactive desktop in React<br/>
- FinishLine - Project management for NEU Racing (Tech Lead)<br/>
- Queen's Blood - Java card game with MVC & AI opponents<br/>
- NUFS - File system in C with FUSE<br/>
<br/>
💡 Type 'ai "tell me about [project name]"' for details!`,
						},
					]);
					break;

				case 'contact':
					setHistory([
						...history,
						{
							input: input,
							response: `Contact Nate:<br/>
Email: cirino.na@northeastern.edu<br/>
LinkedIn: linkedin.com/in/nate-cirino<br/>
GitHub: github.com/nateci<br/>
Portfolio: natecirino.com (you're here!)<br/>
<br/>
Available: July - December 2026 for co-op`,
						},
					]);
					break;

				case 'ls':
					const fileList = desktopFiles
						.map((file) => {
							if (file.type === 'folder') return `${file.name}/`;
							return file.name;
						})
						.join('  ');

					setHistory([
						...history,
						{
							input: input,
							response: fileList,
						},
					]);
					break;

				case 'echo':
					setHistory([
						...history,
						{
							input: input,
							response: args.join(' '),
						},
					]);
					break;

				case 'ai':
					if (args.length === 0) {
						setHistory([
							...history,
							{
								input: input,
								response: `Usage: ai [your question]<br/>
Example: ai what did nate build at wolters kluwer?<br/>
Example: ai what are nate's technical skills?`,
							},
						]);
					} else {
						// Add loading state
						setHistory([
							...history,
							{
								input: input,
								response: null,
								isLoading: true,
							},
						]);
						setIsProcessing(true);

						// Make AI request
						const query = args.join(' ');
						const aiResponse = await askAI(query);

						// Update with actual response
						setHistory((prev) => [
							...prev.slice(0, -1), // Remove loading state
							{
								input: input,
								response: aiResponse,
								isAI: true,
							},
						]);
						setIsProcessing(false);
					}
					break;

				case '':
					setHistory([
						...history,
						{
							input: input,
							response: null,
						},
					]);
					break;

				default:
					setHistory([
						...history,
						{
							input: input,
							response: `bash: ${input}: command not found<br/>Type 'help' for available commands.`,
						},
					]);
					break;
			}
		},
		[history, isProcessing]
	);

	useEffect(() => {
		const handleKeyUp = async (e: KeyboardEvent) => {
			if (e.key === 'Enter' && !isProcessing) {
				const target = e.target as HTMLInputElement;
				if (target.classList.contains('prompt')) {
					const input = target.value;
					if (input.trim()) {
						await executeCommand(input);
						target.value = '';
					}
				}
			}
		};

		const handleClick = () => {
			if (!isProcessing && inputRef.current) {
				inputRef.current.focus();
			}
		};

		document.addEventListener('keyup', handleKeyUp);
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('keyup', handleKeyUp);
			document.removeEventListener('click', handleClick);
		};
	}, [executeCommand, isProcessing]);

	return (
		<DraggableWindow
			windowName={'terminal'}
			topTitle={'MINGW64:/c/Users/nateci'}
			topIcon={
				<Image
					src="/icons/terminal/terminal.png"
					alt="ico"
					width={20}
					height={20}
				/>
			}
		>
			<div className={styles.terminalWrapper}>
				<div ref={terminalRef} className={`${styles.main} terminal`}>
					{history.map((item, index) => (
						<div key={`${item.input}${index}`} className={styles.historyItem}>
							<p className={styles.terminalTitle}>
								nateci@Nate <span>MINGW64</span> <span>~</span>
							</p>
							<p>$ {item.input}</p>
							{item.isLoading ? (
								<p className={styles.aiResponse}>
									🤖 <span className={styles.thinking}>Thinking...</span>
								</p>
							) : item.isAI ? (
								<div className={styles.aiResponse}>
									<p>🤖 {item.response}</p>
								</div>
							) : (
								item.response
									?.split('<br/>')
									.map((text, idx) => <p key={idx}>{text}</p>)
							)}
						</div>
					))}
					<div className={styles.historyItem}>
						<p className={styles.terminalTitle}>
							nateci@Nate <span>MINGW64</span> <span>~</span>
						</p>
						<div className={styles.promt}>
							<p>$</p>
							<input
								ref={inputRef}
								type="text"
								className="prompt"
								disabled={isProcessing}
							/>
						</div>
					</div>
				</div>
				<div className={styles.background} />
			</div>
		</DraggableWindow>
	);
}

export default Terminal;
