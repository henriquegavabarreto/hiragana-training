"use client";
import { SVG, Svg } from "@svgdotjs/svg.js";
import { useEffect } from "react";
export default function Board() {
	useEffect(() => {
		// Select the board group
		const board = SVG("#board") as unknown as Svg;

		if (board) {
			// Draw
			// board.rect(10, 10).move(0, 0).fill("pink");
		}
	}, []);

	return <g id="board"></g>;
}
