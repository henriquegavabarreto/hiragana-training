import { options } from "@/data/options";

export default function GenkouGuideLines() {
	const viewBoxSize = options.viewBoxSize;
	return (
		<g id="guideLines">
			<line
				x1={viewBoxSize / 100}
				y1={viewBoxSize / 2}
				x2={viewBoxSize}
				y2={viewBoxSize / 2}
				stroke="black"
				strokeDasharray="1"
				opacity="0.1"
				strokeWidth="0.5"
			/>
			<line
				x1={viewBoxSize / 2}
				y1={viewBoxSize / 100}
				x2={viewBoxSize / 2}
				y2={viewBoxSize}
				stroke="black"
				strokeDasharray="1"
				opacity="0.1"
				strokeWidth="0.5"
			/>
		</g>
	);
}
