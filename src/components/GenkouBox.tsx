"use client";

import HiraganaData from "@/types/HiraganaData";
import { options } from "@/data/options";
import GenkouGuideLines from "./GenkouGuideLines";
import Character from "./Character";
import { useEffect, useRef, useState } from "react";
import Draw, { DrawSession } from "@/lib/draw";

export default function GenkouBox({ charData }: { charData: HiraganaData }) {
	const [boxSize, setBoxSize] = useState<Number>(0);
	const svgElement = useRef<SVGSVGElement | null>(null);
	const drawSession = useRef<DrawSession | null>(null); // Use ref instead of state

	// Initialize SVG drawing session
	useEffect(() => {
		setBoxSize(options.viewBoxSize);
		if (svgElement.current) {
			drawSession.current = Draw.init(svgElement.current);
		}
	}, []);

	// Event handlers for drawing
	function handlePointerDown(e: React.PointerEvent<SVGSVGElement>) {
		if (drawSession.current) Draw.start(drawSession.current, e.nativeEvent);
	}

	function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
		if (drawSession.current) Draw.continue(drawSession.current, e.nativeEvent);
	}

	function handlePointerUp() {
		if (drawSession.current) Draw.stop(drawSession.current);
	}

	// Clear drawing
	function clearDrawing() {
		if (drawSession.current) {
			Draw.clearAll(drawSession.current);
		}
	}

	function clearLastStroke() {
		if (drawSession.current) Draw.clearLast(drawSession.current);
	}

	return (
		<>
			<svg
				className="w-full border-5 border-black rounded-2xl bg-white fill-current"
				id="svg"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				preserveAspectRatio="xMidYMid meet"
				ref={svgElement}
				viewBox={`0 0 ${boxSize} ${boxSize}`}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={handlePointerUp}
			>
				<GenkouGuideLines />
				<Character charData={charData} />
			</svg>
			<button
				onClick={clearDrawing}
				className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg"
			>
				Clear
			</button>
			<button
				onClick={clearLastStroke}
				className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg"
			>
				Clear Last
			</button>
		</>
	);
}
