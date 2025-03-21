import { hiraganaGroups } from "@/data/hiraganaGroups";
import Link from "next/link";
export default function HiraganaMain() {
	// Split string groups and convert full-width space to a non-breaking space
	const groups = hiraganaGroups.map((group) =>
		group.split("").map((char) => (char === "　" ? "\u00A0" : char))
	);

	return (
		<div>
			{groups.map((group, i) => (
				<div key={i} className="grid grid-cols-5 m-4">
					{group.map((character, j) =>
						character === "\u00A0" ? (
							<span key={`${character}${j}`}>{character}</span>
						) : (
							<Link
								href={`/training/hiragana/${character}`}
								key={`${character}${j}`}
							>
								{character}
							</Link>
						)
					)}
				</div>
			))}
		</div>
	);
}
