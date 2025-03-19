export default interface HiraganaData {
    viewBox: string,
    scale: number,
    layers: {
        interactiveStrokes: InteractiveStrokeInfo[],
        mask: MaskStrokeInfo[]
    }
}

interface MaskStrokeInfo {
    id: string,
    d: string
}

interface InteractiveStrokeInfo {
    id: string,
    d: string,
    strokeWidth: string,
    totalLength: number,
    startPoint: Point,
    endPoint: Point
}

interface Point {
    x: number,
    y: number
}