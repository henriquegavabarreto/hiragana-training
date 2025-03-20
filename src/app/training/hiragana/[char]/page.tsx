import GenkouBox from "@/components/GenkouBox";
import getHiraganaData from "@/lib/getHiraganaData";
import HiraganaData from "@/types/HiraganaData";

export default async function TrainingCharacter({
	params,
}: {
	params: { char: string };
}) {
	const { char } = await params;
	const decodedChar = decodeURIComponent(char);
	let hiragana: HiraganaData | undefined = getHiraganaData(decodedChar);

	if (!hiragana) return <div>Could not find character {decodedChar}</div>;

	return (
		<div>
			<GenkouBox charData={hiragana}></GenkouBox>
		</div>
	);
}
