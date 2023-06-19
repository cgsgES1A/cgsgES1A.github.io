#version 300 es
in vec3 aVertexPosition;
in vec3 aVertexNormal;
in vec4 aVertexColor;
in vec2 aVertexTexCoord;
             
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

out vec4 Color;
out vec3 Normal;
out vec2 TexCoord;

void main(void)
{
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  Color = aVertexColor;
  Normal = aVertexNormal;
  TexCoord = aVertexTexCoord;
}