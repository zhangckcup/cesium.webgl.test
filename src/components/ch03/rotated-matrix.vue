<template>
  <div class="rotated-matrix">
    <canvas width="400" height="400" id="webgl36"></canvas>
  </div>
</template>

<script>
import { initShaders, getWebGLContext } from '@/assets/webgllib/cuon-utils';

export default {
  name: 'rotated-matrix',

  mounted() {
    const VSHADER_SOURCE = `
      attribute vec4 a_Position;
      uniform mat4 u_xformMatrix;
      void main() {
        gl_Position = u_xformMatrix * a_Position;
      }
    `;
    const FSHADER_SOURCE = `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;

    let canvas = document.getElementById('webgl36');
    let gl = getWebGLContext(canvas);

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }

    let n = this.initVertexBuffers(gl);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    let xformMatrix = this.TransformationMatrix(0, 0, 0, 0, 2, 2, 1);
    let u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
    gl.drawArrays(gl.TRIANGLES, 0, n);
  },

  methods: {
    TransformationMatrix(angle, Tx, Ty, Tz, Sx, Sy, Sz) {
      let cosB = Math.cos(Math.PI * angle / 180);
      let sinB = Math.sin(Math.PI * angle / 180);
      return new Float32Array([
        Sx * cosB,Sx *  sinB, 0.0, 0.0,
        Sy*-sinB,Sy*cosB, 0.0, 0.0,
        0.0,  0.0,  Sz, 0.0,
        Tx,   Ty,   Tz,   1.0
      ]);
    },

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
