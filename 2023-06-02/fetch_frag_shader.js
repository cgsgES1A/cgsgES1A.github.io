#version 300 es
precision mediump float;

uniform float cell_width;
uniform float zoom;
uniform float dx;
uniform float dy;

uniform sampler2D uSampler;

in vec3 Normal;
in vec4 Color;
in vec2 TexCoord;

out vec4 FragColor;

void main(void)
{
   float tmp = zoom;
   float xs = gl_FragCoord.x, ys = gl_FragCoord.y;
   float a1 = xs * tmp * 2.0 / 500.0 - dx, b1 = ys * tmp * 2.0 / 500.0 - 2.0 * tmp + dy, a = a1, b = b1, an = a1, bn = b1, ann = a1, bnn = b1, olda = a1, oldb = b1;
   float n = 0.0;

   while (n < cell_width && a * a + b * b < 4.0) {
     olda = a, oldb = b;
     an = a * a - b * b, bn = 2.0 * a * b;
     a = an, b = bn;
     an = a * a - b * b, bn = 2.0 * a * b;
     a = an - 1.0, b = bn;
     an = 3.0 * (a * a - b * b), bn = 3.0 * (2.0 * a * b);
     ann = (a * an + b * bn) / (an * an + bn * bn), bnn = (b * an - a * bn) / (an * an + bn * bn);
     a = olda - ann, b = oldb - bnn;
     n += 1.0;
   }
   n /= cell_width;
   FragColor = texture(uSampler, TexCoord);//vec4(Normal, 1);//vec4(n / 3.0 + cell_width / 100.0, n * 2.0, n * 5.0 + cell_width / 50.0, 1.0);
}