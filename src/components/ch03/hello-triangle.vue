<template>
  <div class="hello-triangle">
    <canvas width="400" height="400" id="webgl33"></canvas>
  </div>
</template>

<script>
import { initShaders, getWebGLContext } from '@/assets/webgllib/cuon-utils';

export default {
  name: 'hello-triangle',

  mounted() {
    const VSHADER_SOURCE = `attribute vec4 a_Position;
    void main() {
      gl_Position = a_Position;
    }\n`;
    const FSHADER_SOURCE = `void main() {
       gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }\n`;

    let canvas = document.getElementById('webgl33');
    let gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }

    let n = this.initVertexBuffers(gl);
    gl.clearColor(1, 1, 1, 1);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
  },

  methods: {
    initVertexBuffers(gl) {
      let vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
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
