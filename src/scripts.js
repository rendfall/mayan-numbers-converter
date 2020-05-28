import GlyphBuilder from './glyph-builder.js';

document.addEventListener('DOMContentLoaded', () => {
    const $input = document.getElementById('input');
    const $result = document.getElementById('result');
    const glyphBuilder = new GlyphBuilder(160, 155);

    $input.addEventListener('input', (event) => {
        $result.innerHTML = '';
        const value = Number(event.target.value);

        if (Number.isNaN(value) || value < 0) {
            event.target.value = '';
            return;
        }

        value.toString(20).split('')
            .forEach((digit) => {
                const glyph = glyphBuilder.buildGlyph(digit);
                $result.appendChild(glyph);
            });
    });
});
