import GenkouBox from "@/components/GenkouBox";
import getHiraganaData from "@/lib/getHiraganaData";
import HiraganaData from "@/types/HiraganaData";
import Link from "next/link";

export default async function TrainingCharacter({
	params,
}: {
	params: Promise<{ char: string }>;
}) {
	const { char } = await params;
	const decodedChar = decodeURIComponent(char);
	const hiragana: HiraganaData | undefined = getHiraganaData(decodedChar);

	if (!hiragana) return <div>Could not find character {decodedChar}</div>;

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="flex flex-col items-center justify-center w-full max-w-1/3">
				<GenkouBox charData={hiragana}></GenkouBox>
				<Link href={"/training/hiragana"} className="m-4">
					Back
				</Link>
			</div>
		</div>
	);
}
