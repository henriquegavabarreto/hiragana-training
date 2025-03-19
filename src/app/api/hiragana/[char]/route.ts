import getHiraganaData from "@/lib/getHiraganaData";
import { NextResponse } from "next/server";

// Returns relevant data about the hiragana character
// when char is a small sized character, return the normal sized character with apropriate ViewBox
export async function GET(request: Request, { params }: { params: { char: string } }) {
  const { char } = await params; // get char value from params

  const data = getHiraganaData(char);

  if (!data) { // return error if there is no data
    return NextResponse.json({ error: `Character ${char} was not found` }, { status: 404 });
  }

  return NextResponse.json(data); // return character's data
}