import getTransform from "@/lib/getTransform";
import HiraganaData from "@/types/HiraganaData";

export default function Character({ charData }: { charData: HiraganaData }) {
	const [, , w, h] = charData.viewBox.split(" ").map(Number); // get viewbox width and height
	const transform = getTransform(charData.scale, w, h); // get appropriate transform (small / normal character)
	return (
		<g>
			{charData.layers.mask.map((stroke, index) => (
				<path
					className="text-black fill-current"
					id={`charStroke${index}`}
					key={stroke.id}
					d={stroke.d}
					vectorEffect="non-scaling-stroke"
					stroke="none"
					strokeLinejoin="miter"
					strokeLinecap="square"
					strokeMiterlimit="3"
					transform={transform}
				></path>
			))}
		</g>
	);
}
