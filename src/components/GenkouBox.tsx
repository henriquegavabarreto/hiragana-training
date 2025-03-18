export default function GenkouBox() {
    let viewBox = {
        x1: 0,
        y1: 0,
        x2: 50,
        y2: 50
    };

    return (
    <svg
        className="w-full border-5 border-black rounded-xl"
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`${viewBox.x1} ${viewBox.y1} ${viewBox.x2} ${viewBox.y2}`}>
        <g id="genkouBox">
          <line
            x1={viewBox.x1 + viewBox.x2/100}
            y1={viewBox.y2 / 2}
            x2={viewBox.x2}
            y2={viewBox.y2 / 2}
            stroke="black" stroke-dasharray="1" opacity="0.1" stroke-width="0.5"/>
          <line
            x1={viewBox.x2 / 2}
            y1={viewBox.y1 + viewBox.x2/100}
            x2={viewBox.x2 / 2}
            y2={viewBox.y2}
            stroke="black" stroke-dasharray="1" opacity="0.1" stroke-width="0.5"/>
        </g>
        <g id="board"></g> 
      </svg>
    );
}