import { options } from "@/data/options";

// returns appropriate transform for hiragana character based on:
// scale: character scale (small characters have smaller scale - .5)
// width: character's viewbox width
// height: character's viewbox height
export default function getTransform(
	scale: number,
	w: number,
	h: number
): string {
	const boxSize = options.viewBoxSize;
	if (scale === 1) {
		return `translate(${(boxSize - w * scale) / 2} ${
			(boxSize - h * scale) / 2
		})`;
	} else {
		// For characters with scale !== 1, adjust scaling and translation
		const scaledW = w * scale;
		const scaledH = h * scale;

		// Ensure the scaled character fits inside the lower right quadrant
		const maxWidth = boxSize / 2;
		const maxHeight = boxSize / 2;

		// Calculate the translate to the lower-right quadrant
		const translateX = boxSize / 2 + (maxWidth - scaledW) / 2;
		const translateY = boxSize / 2 + (maxHeight - scaledH) / 2;

		// Apply transform with scale
		return `translate(${translateX}, ${translateY}) scale(${scale})`;
	}
}
