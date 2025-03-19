import getHiraganaData from "@/lib/getHiraganaData";
import getTransform from "@/lib/getTransform";
import HiraganaData from "@/types/HiraganaData";

export default async function GenkouBox() {
  // あかがゃ
  let character: HiraganaData | undefined = getHiraganaData(`ゃ`);
  const showGuideLines = true;

  if(!character) {
    return (<div>No character was found</div>);
  }

  const boxSize = 50;
  const [,,w,h] = character.viewBox.split(" ").map(Number); // get viewbox width and height
  let transform = getTransform(character.scale, w, h, boxSize); // get appropriate transform (small / normal character)

  return (
  <svg
      className="w-full border-5 border-black rounded-xl"
      id="svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${boxSize} ${boxSize}`}>
      {
        showGuideLines && 
        (<g id="guideLines">
          <line
            x1={boxSize/100}
            y1={boxSize/2}
            x2={boxSize}
            y2={boxSize/2}
            stroke="black" strokeDasharray="1" opacity="0.1" strokeWidth="0.5"/>
          <line
            x1={boxSize/2}
            y1={boxSize/100}
            x2={boxSize/2}
            y2={boxSize}
            stroke="black" strokeDasharray="1" opacity="0.1" strokeWidth="0.5"/>
        </g>)
      }
      <g id="show">
        {
          character.layers.mask.map((stroke, index) => 
            (<path
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
              ></path>)
          )
        }
      </g>
      <g id="board"></g> 
    </svg>
  );
}