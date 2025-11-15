import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
	MouseEvent,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
	useMemo,
} from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {
	VscChromeClose,
	VscChromeMaximize,
	VscChromeMinimize,
} from 'react-icons/vsc';
import { Rnd } from 'react-rnd';
import { Context } from '../../../context/ContextProvider';
import { handleWindowPriority } from '../WindowPriority/WindowPriority';
import styles from './DraggableWindow.module.css';

const handleStyles = {
	bottom: {
		cursor: 'ns-resize',
	},
	bottomLeft: {
		cursor: 'nesw-resize',
	},
	bottomRight: {
		cursor: 'nwse-resize',
	},
	left: {
		cursor: 'ew-resize',
	},
	right: {
		cursor: 'ew-resize',
	},
	top: {
		cursor: 'ns-resize',
	},
	topLeft: {
		cursor: 'nwse-resize',
	},
	topRight: {
		cursor: 'nesw-resize',
	},
};

const variants = {
	maximized: {
		borderRadius: '0px',
		scale: 1,
	},
	minimized: {
		opacity: 1,
		scale: 1,
	},
};

type Props = {
	children: ReactNode;
	windowName: string;
	topTitle: string;
	topIcon?: ReactNode;
	close?: (newMedia: null) => void;
};

function DraggableWindow({
	children,
	windowName,
	topTitle,
	topIcon,
	close,
}: Props) {
	const router = useRouter();
	const nodeRef = useRef(null);

	const [isDragging, setIsDragging] = useState(false);
	const [isResizing, setIsResizing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isClosing, setIsClosing] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const DraggableWindowContext = useContext(Context);

	const [maximized, setMaximized] = DraggableWindowContext.maximizedState;
	const [history, setHistory] = DraggableWindowContext.explorerHistoryState;
	const [position, setPosition] = DraggableWindowContext.positionState;
	const [windowPriority, setWindowPriority] =
		DraggableWindowContext.windowPriorityState;
	const [lastPos, setLastPos] = DraggableWindowContext.lastPosState;

	// Detect mobile/tablet
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 880);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const dimensions = useMemo(() => {
		if (isMobile) {
			const vw = typeof window !== 'undefined' ? window.innerWidth : 880;
			return {
				width: Math.floor(vw * 0.93), // 93vw
				height: typeof window !== 'undefined' ? window.innerHeight - 110 : 550,
				minWidth: Math.floor(vw * 0.93),
				minHeight: 400,
			};
		}
		return {
			width: 880,
			height: 550,
			minWidth: 880,
			minHeight: 550,
		};
	}, [isMobile]);

	const handlePriority = async (e: MouseEvent, window: string) => {
		const newPriority = await handleWindowPriority({
			e,
			windowName: window,
			windowPriority,
		});

		if (newPriority) {
			setWindowPriority(newPriority);
		}
	};

	const handleMaximize = () => {
		setMaximized({ ...maximized, [windowName]: !maximized[windowName] });
	};

	const handleClose = () => {
		setIsClosing(true);
		setMaximized({ ...maximized, [windowName]: null });

		if (windowName === 'fileExplorer') setHistory([]);
		if (windowName === 'mediaPlayer') {
			setTimeout(() => {
				if (close) {
					setTimeout(() => {
						close(null);
					}, 500);
				}
			}, 500);
			const newPriority = Object.fromEntries(
				Object.entries(windowPriority).filter(([key]) => key !== 'mediaPlayer')
			);
			return setWindowPriority(newPriority);
		}

		setTimeout(() => {
			router.push('/');
		}, 500);
	};

	const handleClick = (e: MouseEvent<HTMLDivElement>, window: string) => {
		handlePriority(e, window);
	};

	useEffect(() => {
		(async () => {
			const getCenter = async () => {
				let width = window.innerWidth;
				let height = window.innerHeight;

				let x;
				let y;

				// On mobile, always fullscreen (position at 0,0)
				if (isMobile) {
					x = 0;
					y = 0;
				} else {
					// Center the window based on current dimensions
					x = width / 2 - dimensions.width / 2;
					y = height / 2 - dimensions.height / 2;
				}

				setPosition({
					...position,
					[windowName]: {
						x: x,
						y: y,
						width: dimensions.width,
						height: dimensions.height,
					},
				});
			};

			if (
				position[windowName].x === 0 &&
				position[windowName].y === 0 &&
				maximized[windowName] === null
			) {
				await getCenter();
				setLoading(false);
			} else {
				setLoading(false);
			}
		})();
	}, [
		maximized,
		position,
		setPosition,
		windowName,
		isMobile,
		dimensions.width,
		dimensions.height,
	]);

	useEffect(() => {
		if (loading) return;
		if (maximized[windowName] === true) {
			setLastPos({
				x: position[windowName].x,
				y: position[windowName].y,
				width: position[windowName].width,
				height: position[windowName].height,
			});

			setPosition({
				...position,
				[windowName]: {
					x: 0,
					y: 0,
					width: window.innerWidth,
					height: window.innerHeight - 50,
				},
			});
		} else if (maximized[windowName] === false) {
			setPosition({
				...position,
				[windowName]: {
					x: lastPos.x,
					y: lastPos.y,
					width: lastPos.width,
					height: lastPos.height,
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [maximized[windowName]]);

	return (
		<AnimatePresence>
			{!isClosing && !loading && (
				<Rnd
					dragHandleClassName={isMobile ? '' : 'draggable'}
					cancel={'.not_draggable'}
					disableDragging={isMobile}
					enableResizing={!isMobile}
					onDragStart={() => {
						if (maximized[windowName]) {
							setMaximized({ ...maximized, [windowName]: false });
						}
						setIsDragging(true);
					}}
					onDragStop={(e, d) => {
						setPosition({
							...position,
							[windowName]: {
								...position[windowName],
								x: d.x,
								y: d.y,
							},
						});
						setIsDragging(false);
					}}
					onResize={(e, direction, ref, delta, pos) => {
						if (maximized[windowName]) {
							setMaximized({ ...maximized, [windowName]: false });
						}
						setIsResizing(true);
						setPosition({
							...position,
							[windowName]: {
								x: pos.x,
								y: pos.y,
								width: ref.offsetWidth,
								height: ref.offsetHeight,
							},
						});
					}}
					onResizeStop={() => {
						setIsResizing(false);
					}}
					size={{
						width: position[windowName].width || 880,
						height: position[windowName].height || 550,
					}}
					position={{
						x: isMobile ? 0 : position[windowName].x,
						y: isMobile ? 0 : position[windowName].y,
					}}
					minWidth={880}
					minHeight={550}
					className={`${
						isDragging || isResizing || loading ? '' : styles.animatedWindow
					}`}
					style={
						isDragging || isResizing || loading
							? { zIndex: 997 }
							: {
									zIndex: windowPriority[windowName] || 10,
								}
					}
					resizeHandleStyles={handleStyles}
				>
					<motion.div
						onClick={(e) => handleClick(e, windowName)}
						className={styles.container}
						ref={nodeRef}
						variants={variants}
						animate={maximized[windowName] ? 'maximized' : 'minimized'}
						initial={
							history.length > 1 && windowName === 'fileExplorer'
								? { scale: 1 }
								: { scale: 0 }
						}
						exit={{ scale: 0 }}
						transition={{ duration: 0.15 }}
						style={
							windowName === 'terminal'
								? { backgroundColor: 'transparent' }
								: {}
						}
					>
						<div className={styles.main}>
							<nav>
								<section className={`${styles.top} draggable`}>
									{windowName === 'terminal' ? (
										<>
											<div className={styles.terminalContainer}>
												<div>
													<div>
														{topIcon}
														<p>{topTitle}</p>
													</div>
													<VscChromeClose />
												</div>
												<div className={styles.manageButtons}>
													<AiOutlinePlus />
													<RiArrowDropDownLine />
												</div>
											</div>
										</>
									) : (
										<>
											<div className={styles.topContainer}>
												{topIcon}
												<p>{topTitle}</p>
											</div>
										</>
									)}
									<div className={`${styles.iconContainer} not_draggable`}>
										<div className={styles.icon}>
											<VscChromeMinimize />
										</div>
										<div className={styles.icon} onClick={handleMaximize}>
											<VscChromeMaximize />
										</div>
										<div className={styles.iconClose} onClick={handleClose}>
											<VscChromeClose />
										</div>
									</div>
								</section>
							</nav>
							{children}
						</div>
					</motion.div>
				</Rnd>
			)}
		</AnimatePresence>
	);
}

export default DraggableWindow;
