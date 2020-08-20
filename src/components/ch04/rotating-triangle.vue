<template>
  <div class="rotating-triangle">
    <canvas width="600" height="600" id="webgl43"></canvas>
  </div>
</template>

<script>
import { initShaders, getWebGLContext } from '@/assets/webgllib/cuon-utils';

export default {
  name: 'rotating-triangle',

  data: () => ({
    angle: 0,
    ANGLE_STEP: 45.0,
    g_last: Date.now(),
    now: Date.now(),
    transMatrix: [],
    gl: null
  }),

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

    let canvas = document.getElementById('webgl43');
    this.gl = getWebGLContext(canvas);

    if (!initShaders(this.gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }

    this.initVertexBuffers(this.gl);
    this.gl.clearColor(0, 0, 0, 1);

    this.animate();
  },

  methods: {
    animate() {
      this.now = Date.now();
      let elapsed = this.now - this.g_last;
      this.g_last = Date.now();
      this.angle = this.angle + (this.ANGLE_STEP * elapsed) / 1000;
      this.transMatrix = this.TransformationMatrix(this.angle, 0, 0, 0);
      let u_xformMatrix = this.gl.getUniformLocation(this.gl.program, 'u_xformMatrix');
      this.gl.uniformMatrix4fv(u_xformMatrix, false, this.transMatrix);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
      requestAnimationFrame(this.animate);
    },

    TransformationMatrix(angle, Tx, Ty, Tz) {
      let cosB = Math.cos((Math.PI * angle) / 180);
      let sinB = Math.sin((Math.PI * angle) / 180);
      return new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        Tx, Ty, Tz, 1.0]);
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
