import HiraganaData from "@/types/HiraganaData";
import hiraganaData from "@/data/hiragana.json"

// returns hiragana data, plus scale to indicate normal sized character (scale: 1) or small size (scale: 0.5)
export default function getHiraganaData(char: string): HiraganaData | undefined {
    const normalSize = ['あ', 'い', 'う', 'え', 'お', 'や', 'ゆ', 'よ', 'つ', 'わ'];
    const smallSize = ['ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ゃ', 'ゅ', 'ょ', 'っ', 'ゎ'];

    let index = smallSize.indexOf(char.normalize("NFC")); // check if char is in the small size array

    let data: HiraganaData;

    if(index !== -1) { // if it is a small character
        data = {
            ...hiraganaData[normalSize[index].normalize("NFC") as keyof typeof hiraganaData], // get normal sized character data
            scale: 0.5 // adjust character's scale so we know it is supposed to be shown as small
        }
    } else if (Object.keys(hiraganaData).includes(char)) { // returns normal sized character info
        data = {
            ...hiraganaData[char.normalize("NFC") as keyof typeof hiraganaData],
            scale: 1
        };
    } else { // character was not found
        return undefined;
    }

    return data;
}