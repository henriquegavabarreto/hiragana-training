import HiraganaData from "@/types/HiraganaData";
import { options } from "@/data/options";
import GenkouGuideLines from "./GenkouGuideLines";
import Character from "./Character";
import Board from "./Board";

export default async function GenkouBox({
	charData,
}: {
	charData: HiraganaData;
}) {
	const viewBoxSize = options.viewBoxSize;

	return (
		<svg
			className="w-full border-5 border-black rounded-2xl bg-white fill-current"
			id="svg"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			preserveAspectRatio="xMidYMid meet"
			viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
		>
			<GenkouGuideLines />
			<Character charData={charData} />
			<Board />
		</svg>
	);
}
