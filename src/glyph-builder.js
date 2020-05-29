const SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';

export default class GlyphBuilder {

    constructor(width, height) {
        this.fillColor = '#000';
        this.strokeColor = '#fff';
        this.strokeWidth = 1;
        this.dotRadius = height/10|0;
        this.barHeight = height/6|0;
        this.svgBackground = '#e0e0e0';
        this.svgWidth = width;
        this.svgHeight = height;
    }

    buildGlyph(digit) {
        const number = Number.parseInt(digit, 20);
        const barsCount = (number/5)|0;
        const dotsCount = number%5;
        const dotsOffset = (dotsCount > 0) ? 1 : 0;
        const glyphSize = barsCount + dotsOffset;
        const widthUnit = this.svgWidth / (dotsCount + 1);
        const heightUnit = this.svgHeight / (glyphSize + 1);

        // zero (shell)
        if (dotsCount === 0 && barsCount === 0) {
            return this.createZeroSVG();
        }

        const svg = this.createSVG();

        // dots
        if (dotsCount > 0) {
            const dots = document.createElementNS(SVG_NAMESPACE_URI, 'g');

            for (let i = 0; i < dotsCount; i++) {
                const dot = this.createDot();
                dot.setAttribute('cx', (i + 1) * widthUnit);
                dot.setAttribute('cy', (1 * heightUnit));
                dots.appendChild(dot);
            }

            svg.appendChild(dots);
        }

        // bars
        for (let i = 0; i < barsCount; i++) {
            const bar = this.createBar();
            bar.setAttribute('x', 0);
            bar.setAttribute('y', ((i + dotsOffset + 1) * heightUnit) - this.barHeight/2);
            svg.appendChild(bar);
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

    createZeroSVG() {
        const zero = this.createSVG();
        zero.setAttribute('viewBox', '0 0 350 350');

        const ellipse = document.createElementNS(SVG_NAMESPACE_URI, 'path');
        ellipse.setAttribute('d', 'm 289.72098,75.015976 a 139.53172,65.447918 0 0 1 -279.063442,0 139.53172,65.447918 0 1 1 279.063442,0 z');
        ellipse.setAttribute('fill', 'none');
        ellipse.setAttribute('stroke', this.fillColor);
        ellipse.setAttribute('stroke-width', this.strokeWidth * 10);

        const stripes = document.createElementNS(SVG_NAMESPACE_URI, 'g');
        stripes.setAttribute('fill', 'none');
        stripes.setAttribute('stroke', this.fillColor);
        stripes.setAttribute('stroke-width', this.strokeWidth * 10);

        const stripe1 = document.createElementNS(SVG_NAMESPACE_URI, 'path');
        stripe1.setAttribute('d', 'M 11.196878,68.096269 C 60.374624,88.060496 156.28989,124.05705 289.3454,63.814492');
        const stripe2 = document.createElementNS(SVG_NAMESPACE_URI, 'path');
        stripe2.setAttribute('d', 'm 86.163145,90.237367 c 0,0 -17.710268,-43.667586 3.377957,-73.934325');
        const stripe3 = document.createElementNS(SVG_NAMESPACE_URI, 'path');
        stripe3.setAttribute('d', 'm 144.80597,96.15149 c 0,0 -25.37475,-49.235828 7.21178,-86.5027273');
        const stripe4 = document.createElementNS(SVG_NAMESPACE_URI, 'path');
        stripe4.setAttribute('d', 'm 207.97792,89.239399 c 0,0 -21.6811,-40.95318 4.01501,-73.073321');

        stripes.appendChild(stripe1);
        stripes.appendChild(stripe2);
        stripes.appendChild(stripe3);
        stripes.appendChild(stripe4);

        zero.appendChild(ellipse);
        zero.appendChild(stripes);

        ellipse.setAttribute('transform', 'translate(25, 100)');
        stripes.setAttribute('transform', 'translate(25, 100)');

        return zero;
    }

    createDot() {
        const dot = document.createElementNS(SVG_NAMESPACE_URI, 'circle');
        dot.setAttribute('fill', this.fillColor);
        dot.setAttribute('stroke', this.strokeColor);
        dot.setAttribute('stroke-width', this.strokeWidth);
        dot.setAttribute('r', this.dotRadius);
        return dot;
    }

    createBar() {
        const bar = document.createElementNS(SVG_NAMESPACE_URI, 'rect');
        bar.setAttribute('fill', this.fillColor);
        bar.setAttribute('stroke', this.strokeColor);
        bar.setAttribute('stroke-width', this.strokeWidth);
        bar.setAttribute('width', this.svgWidth);
        bar.setAttribute('height', this.barHeight);
        return bar;
    }

}
