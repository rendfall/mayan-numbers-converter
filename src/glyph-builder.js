const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

export default class GlyphBuilder {

    constructor(width, height) {
        this.fillColor = '#000';
        this.strokeColor = '#fff';
        this.strokeWidth = 1;
        this.dotRadius = height/10|0;
        this.lineHeight = height/6|0;
        this.svgBackground = '#e0e0e0';
        this.svgWidth = width;
        this.svgHeight = height;
    }

    buildGlyph(digit) {
        const svg = this.createSVG();
        const number = Number.parseInt(digit, 20);
        const linesCount = (number/5)|0;
        const dotsCount = number%5;
        const dotsOffset = (dotsCount > 0) ? 1 : 0;
        const glyphSize = linesCount + dotsOffset;
        const widthUnit = this.svgWidth / (dotsCount + 1);
        const heightUnit = this.svgHeight / (glyphSize + 1);

        // dots
        const dots = document.createElementNS(SVG_NAMESPACE_URI, 'g');
        for (let i = 0; i < dotsCount; i++) {
            const dot = this.createDot();
            dot.setAttribute('cx', (i + 1) * widthUnit);
            dot.setAttribute('cy', (1 * heightUnit));
            dots.appendChild(dot);
        }

        svg.appendChild(dots);

        // lines
        for (let i = 0; i < linesCount; i++) {
            const line = this.createLine();
            line.setAttribute('x', 0);
            line.setAttribute('y', ((i + dotsOffset + 1) * heightUnit) - this.lineHeight/2);
            svg.appendChild(line);
        }

        return svg;
    }

    createSVG() {
        const svg = document.createElementNS(SVG_NAMESPACE_URI, 'svg');
        svg.setAttribute('width', this.svgWidth);
        svg.setAttribute('height', this.svgHeight);
        svg.style.backgroundColor = this.svgBackground;
        return svg;
    }

    createDot() {
        const dot = document.createElementNS(SVG_NAMESPACE_URI, 'circle');
        dot.setAttribute('fill', this.fillColor);
        dot.setAttribute('stroke', this.strokeColor);
        dot.setAttribute('stroke-width', this.strokeWidth);
        dot.setAttribute('r', this.dotRadius);
        return dot;
    }

    createLine() {
        const line = document.createElementNS(SVG_NAMESPACE_URI, 'rect');
        line.setAttribute('fill', this.fillColor);
        line.setAttribute('stroke', this.strokeColor);
        line.setAttribute('stroke-width', this.strokeWidth);
        line.setAttribute('width', this.svgWidth);
        line.setAttribute('height', this.lineHeight);
        return line;
    }

}
