<template>
  <div class="hello-triangle">
    <canvas width="400" height="400" id="webgl33"></canvas>
  </div>
</template>

<script>
import { initShaders, getWebGLContext } from '@/assets/webgllib/cuon-utils';
import * as math from 'mathjs';

export default {
  name: 'hello-triangle',

  mounted() {
    // 平移三角形
    // const VSHADER_SOURCE = `
    //   attribute vec4 a_Position;
    //   uniform vec4 u_Translation;
    //   void main() {
    //     gl_Position = a_Position + u_Translation;
    //   }\n`;

    // 旋转三角形
    const VSHADER_SOURCE = `
      attribute vec4 a_Position;
      uniform float u_CosB, u_SinB;
      void main() {
        gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
        gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
        gl_Position.z = a_Position.z;
        gl_Position.w = 1.0;
      }\n`;

    const FSHADER_SOURCE = `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }\n`;

    let canvas = document.getElementById('webgl33');
    let gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }

    let n = this.initVertexBuffers(gl);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 绘制基本图形 TRIANGLES / TRIANGLE_STRIP / POINTS / LINES / LINE_STRIP / LINE_LOOP
    // gl.drawArrays(gl.TRIANGLES, 0, n);

    // 平移三角形
    // let Tx = 0.5,
    //   Ty = 0.5,
    //   Tz = 0.5;
    // let u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
    // gl.uniform4f(u_Translation, Tx, Ty, Tz, 0.0);
    // gl.drawArrays(gl.TRIANGLES, 0, n);

    // 旋转三角形
    const ANGLE = 90.0;
    let cosB = math.cos(math.unit(ANGLE, 'deg'));
    let sinB = math.sin(math.unit(ANGLE, 'deg'));

    let u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
    let u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');

    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);
    gl.drawArrays(gl.TRIANGLES, 0, n);
  },

  methods: {
    initVertexBuffers(gl) {
      let vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
      // let vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]); // used to draw Quad
      let n = 3; // The number of vertices

      // Create a buffer object
      let vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      // Bind the buffer object to target
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      // Write date into the buffer object
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
      if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
      }
      // Assign the buffer object to a_Position variable
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

      // Enable the assignment to a_Position variable
      gl.enableVertexAttribArray(a_Position);

      return n;
    }
  }
};
</script>

<style lang="less" scoped></style>
