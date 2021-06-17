#version 300 es
precision mediump float;

uniform float cell_width;
uniform float zoom;
uniform float dx;
uniform float dy;

out vec4 FragColor;

void main(void)
{
    float tmp = zoom;
    float xs = gl_FragCoord.x, ys = gl_FragCoord.y;
    float a1 = xs * tmp * 2.0 / 500.0 - dx, b1 = ys * tmp * 2.0 / 500.0 - 2.0 * tmp + dy, a = a1, b = b1, an = a1, bn = b1;
    float n = 0.0;

    while (n < cell_width && a * a + b * b < 4.0) {
        an = a * a - b * b + a1, bn = 2.0 * a * b + b1;
        a = an, b = bn;
        n += 1.0;
    }
    n /= cell_width;
    FragColor = vec4(n / 3.0 + cell_width / 100.0, n * 2.0, n * 5.0 + cell_width / 50.0, 1.0);
}