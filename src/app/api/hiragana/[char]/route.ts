import hiraganaData from "@/data/hiragana.json"
import HiraganaData from "@/types/HiraganaData";
import { NextResponse } from "next/server";

// Returns relevant data about the hiragana character
// when char is a small sized character, return the normal sized character with apropriate ViewBox
export async function GET(request: Request, { params }: { params: { char: string } }) {
  const normalSize = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ', 'つ', 'わ'];
  const smallSize = ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ', 'っ', 'ゎ'];

  const { char } = await params; // get char value from params

  let index = smallSize.indexOf(char.normalize("NFC")); // check if char is in the small size array

  let data: HiraganaData;

  if(index !== -1) { // if it is a small character
    const baseData = hiraganaData[normalSize[index].normalize("NFC") as keyof typeof hiraganaData]; // get normal sized character data
    data = { ...baseData, // copy baseData
      viewBox: adjustViewBox(baseData.viewBox) // adjust character's viewbox to compensate
    }
  } else { // returns normal sized character info
    data = { ...hiraganaData[char.normalize("NFC") as keyof typeof hiraganaData] };
  }

  if (!data) { // return error if there is no data
    return NextResponse.json({ error: `Character ${char} was not found` }, { status: 404 });
  }

  return NextResponse.json(data); // return character's data
}

// this function doubles the width and height of the viewbox,
// and changes the origin to -width and -height
// This way the character is drawn on the bottom right - as a small character
function adjustViewBox(viewBox: string): string {
  const [ minX, minY, width, height] = viewBox.split(" ").map(n => parseInt(n));
  return `${-width} ${-height} ${width * 2} ${height * 2}`;
}