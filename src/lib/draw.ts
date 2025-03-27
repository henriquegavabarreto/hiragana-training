import { Path, SVG, Svg } from "@svgdotjs/svg.js";

type DrawSession = {
	svgElement: SVGSVGElement;
	svg: Svg;
	paths: Path[]; // reference to all drawn paths
	currentPath: Path | null;
	isDrawing: boolean;
};

const Draw = {
	// Initializes a draw session
	init(svgElement: SVGSVGElement | null): DrawSession | null {
		if (!svgElement) return null;
		const svg = SVG(svgElement) as Svg;
		return { svgElement, svg, paths: [], currentPath: null, isDrawing: false };
	},
	// start drawing at current cursor point
	start(session: DrawSession, event: PointerEvent) {
		const point = this.getCursorCoordinates(session.svgElement, event);
		if (!point) return;

		session.isDrawing = true;
		const newPath = session.svg
			.path(`M ${point.x},${point.y}`)
			.fill("none")
			.stroke({
				color: "blue",
				width: 1,
				linecap: "round",
				linejoin: "round",
			});

		session.currentPath = newPath;
		session.paths.push(newPath); // Store reference to the new path
	},
	// add current cursor point to path
	continue(session: DrawSession, event: PointerEvent) {
		if (!session.isDrawing || !session.currentPath) return; // must be drawing and have a path to continue the drawing

		const point = this.getCursorCoordinates(session.svgElement, event);
		if (!point) return;

		const pathData = session.currentPath.attr("d") || ""; // Ensure we get the current 'd' attribute
		session.currentPath.plot(`${pathData} L ${point.x},${point.y}`);
	},
	// stop drawing
	stop(session: DrawSession) {
		session.isDrawing = false;
	},
	// clear all paths
	clearAll(session: DrawSession) {
		session.paths.forEach((path) => path.remove());
		session.paths = []; // Reset path storage
	},
	// clear last drawn path
	clearLast(session: DrawSession) {
		if (session.paths.length <= 0) return; // ignore if there are no paths
		session.paths[session.paths.length - 1].remove(); // remove last path
		session.paths.pop(); // remove last path reference from paths
	},
	// get cursor coordinates in svg coordinates
	getCursorCoordinates(
		svgElement: SVGSVGElement,
		e: PointerEvent
	): DOMPoint | null {
		// matrix that transforms the current element's coordinate system to the coordinate system of the SVG viewport
		const gCTM = svgElement.getScreenCTM();
		if (!gCTM) return null; // return null if CTM is null

		// Create a new DOMPoint with event coordinates
		const point = new DOMPoint(e.clientX, e.clientY);

		// Transform the point into the group's coordinate system
		return point.matrixTransform(gCTM.inverse());
	},
};

export default Draw;
export type { DrawSession };
