import getTransform from "@/lib/getTransform";
import HiraganaData from "@/types/HiraganaData";
import { options } from "@/data/options";
import GenkouGuideLines from "./GenkouGuideLines";

export default async function GenkouBox({
	charData,
}: {
	charData: HiraganaData;
}) {
	const viewBoxSize = options.viewBoxSize;
	const [, , w, h] = charData.viewBox.split(" ").map(Number); // get viewbox width and height
	let transform = getTransform(charData.scale, w, h); // get appropriate transform (small / normal character)

	return (
		<svg
			className="w-full border-5 border-black rounded-xl"
			id="svg"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			preserveAspectRatio="xMidYMid meet"
			viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
		>
			<GenkouGuideLines />
			<g id="show">
				{charData.layers.mask.map((stroke, index) => (
					<path
						id={`${index}bg`}
						key={stroke.id}
						d={stroke.d}
						vectorEffect="non-scaling-stroke"
						stroke="none"
						fill="black"
						strokeLinejoin="miter"
						strokeLinecap="square"
						strokeMiterlimit="3"
						transform={transform}
					></path>
				))}
			</g>
			<g id="board"></g>
		</svg>
	);
}
