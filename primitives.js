function createCube() {
  const positions = new Float32Array([
   // Front face (Z = +0.5)
  -0.5, 0.0,  0.5,
   0.5, 0.0,  0.5,
   0.5, 1.0,  0.5,
  -0.5, 1.0,  0.5,

  // Back face (Z = -0.5)
  -0.5, 0.0, -0.5,
  -0.5, 1.0, -0.5,
   0.5, 1.0, -0.5,
   0.5, 0.0, -0.5,

  // Top face (Y = 1.0)
  -0.5, 1.0, -0.5,
  -0.5, 1.0,  0.5,
   0.5, 1.0,  0.5,
   0.5, 1.0, -0.5,

  // Bottom face (Y = 0.0)
  -0.5, 0.0, -0.5,
   0.5, 0.0, -0.5,
   0.5, 0.0,  0.5,
  -0.5, 0.0,  0.5,

  // Right face (X = +0.5)
   0.5, 0.0, -0.5,
   0.5, 1.0, -0.5,
   0.5, 1.0,  0.5,
   0.5, 0.0,  0.5,

  // Left face (X = -0.5)
  -0.5, 0.0, -0.5,
  -0.5, 0.0,  0.5,
  -0.5, 1.0,  0.5,
  -0.5, 1.0, -0.5
  ]);
  const faceNormals = [[0, 0, 1], [0, 0, -1], [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0]];
  const normals = new Float32Array(faceNormals.flatMap(n => [...n, ...n, ...n, ...n]));

  const indices = new Uint16Array([
     0,  1,  2,   0,  2,  3,   // front
     4,  5,  6,   4,  6,  7,   // back
     8,  9, 10,   8, 10, 11,   // top
    12, 13, 14,  12, 14, 15,   // bottom
    16, 17, 18,  16, 18, 19,   // right
    20, 21, 22,  20, 22, 23    // left
  ]);
  return { positions, normals, indices };
}

function createCylinder(segments) {
  const pos = [], nrm = [], idx = [];

  // Side
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2, x = Math.cos(a), z = Math.sin(a);
    pos.push(x, -1, z, x, 1, z);
    nrm.push(x, 0, z, x, 0, z);
  }
  for (let i = 0; i < segments; i++) {
    const b = i * 2;
    idx.push(b, b + 1, b + 3, b, b + 3, b + 2);
  }

  // Caps
  for (const y of [-1, 1]) {
    const center = pos.length / 3;
    pos.push(0, y, 0);
    nrm.push(0, y, 0);
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pos.push(Math.cos(a), y, Math.sin(a));
      nrm.push(0, y, 0);
    }
    for (let i = 1; i <= segments; i++) {
      if (y > 0) idx.push(center, center + i + 1, center + i);
      else idx.push(center, center + i, center + i + 1);
    }
  }

  return { positions: new Float32Array(pos), normals: new Float32Array(nrm), indices: new Uint16Array(idx) };
}
