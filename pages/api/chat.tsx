import Anthropic from '@anthropic-ai/sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY!,
});

const RESUME_DATA = `
NATE CIRINO - SOFTWARE ENGINEER
Contact: cirino.na@northeastern.edu | GitHub: github.com/nateci | Portfolio: natecirino.com
Location: Boston, MA | Available: July 2026 – Dec 2026 for co-op

EDUCATION:
Northeastern University, B.S. Computer Science (May 2027) | GPA: 3.7/4.0
Systems Concentration

WORK EXPERIENCE:
Wolters Kluwer (July 2025 – Present) - Software Engineer
- Developed features for UpToDate platform used by 2M+ physicians globally
- Built "Expert Clinician AI" features using Vue and Java Spring, integrating LLM services for 100K+ customers
- Implemented secure mobile tokenization API using Java Spring for PCI-compliant payment processing
- Shipped 12+ production releases using Vue, Tailwind CSS, and Vite, increasing user engagement by 28%

SculptAI (Jan 2025 – June 2025) - Software Engineer (Remote)
- Built full-stack features for AI-powered fitness app using React, TypeScript, Tailwind CSS, and Django
- Developed UI and PostgreSQL database for workout tracking, analytics, and personalized plans serving 2K+ users
- Integrated AI capabilities for rep counting and automated workout generation, contributing to $1M funding

Chevron New Energies (May 2024 – Aug 2024) - Software Engineer Intern
- Integrated PyTorch models with AWS Neuron SDK for scalable ML inference, supporting 3M+ consumers globally
- Built RESTful APIs and data pipelines using Azure Data Factory, improving product efficiency by 40%
- Implemented CI/CD workflows using Azure DevOps and Kubernetes, cutting deployment times by 30%

Legacy Community Health (May 2023 – Aug 2023) - Software Engineer Intern
- Conducted peer code reviews and enforced coding standards for healthcare applications serving 100K+ patients
- Debugged and resolved software defects in production Epic modules, ensuring 99.9% application uptime

PROJECTS:
- NateOS Portfolio: Interactive desktop OS built entirely in React with functional file system, window management, and working bash terminal
- FinishLine: Full-stack project management app for Northeastern Electric Racing with RESTful API and financial tracking (Tech Lead)
- Queen's Blood: Java card game with MVC architecture, Observer pattern, and 100% JUnit test coverage
- NUFS File System: User-space file system using FUSE with inode-based storage following POSIX standards

TECHNICAL SKILLS:
Languages: JavaScript, TypeScript, Python, Java, C++, Kotlin, Bash, SQL
Frontend: React, Vue, Vite, Tailwind CSS
Backend: Node.js, Express, Django, Java Spring, Flask
Databases: PostgreSQL, OracleSQL
ML/AI: PyTorch, TensorFlow, Pandas, Seaborn
Cloud/DevOps: AWS, Azure, Docker, Kubernetes, Jenkins, GitHub Actions

LEADERSHIP:
- Tech Lead at Northeastern Electronic Racing
- Dean's List (All Semesters)
`;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	try {
		const { query } = req.body;

		if (!query || typeof query !== 'string') {
			return res.status(400).json({ error: 'Query is required' });
		}

		const message = await anthropic.messages.create({
			model: 'claude-sonnet-4-20250514',
			max_tokens: 500,
			messages: [
				{
					role: 'user',
					content: `You are a helpful assistant embedded in Nate Cirino's portfolio terminal. 
Answer questions about Nate based on the following information. 
Keep responses concise (2-4 sentences) and professional.
If asked about something not in the data, politely say you don't have that information.
Use a conversational, friendly tone. Thanks!

NATE'S INFORMATION:
${RESUME_DATA}

USER QUESTION: ${query}`,
				},
			],
		});

		const response =
			message.content[0].type === 'text'
				? message.content[0].text
				: 'Unable to process response';

		return res.status(200).json({ response });
	} catch (error) {
		console.error('API Error:', error);
		return res.status(500).json({ error: 'Failed to get AI response' });
	}
}
