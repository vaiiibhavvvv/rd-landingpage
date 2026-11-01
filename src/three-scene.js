import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;
    float pointerWave = 0.18 / (distance(uv, uPointer) * 9.0 + 0.55);
    float wave = sin((p.x * 0.7) + uTime * 0.75) * 0.12;
    wave += cos((p.y * 0.9) - uTime * 0.5) * 0.09;
    wave += pointerWave;
    p.z += wave;
    vWave = wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vec3 navy = vec3(0.025, 0.075, 0.14);
    vec3 blue = vec3(0.08, 0.34, 0.58);
    vec3 brass = vec3(0.76, 0.57, 0.26);
    float lineX = smoothstep(0.97, 1.0, abs(sin(vUv.x * 52.0)));
    float lineY = smoothstep(0.97, 1.0, abs(sin(vUv.y * 38.0)));
    float glow = smoothstep(-0.12, 0.34, vWave);
    vec3 color = mix(navy, blue, glow * 0.52);
    color = mix(color, brass, (lineX + lineY) * 0.10);
    float alpha = 0.38 + glow * 0.14;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function initThreeBackground() {
  const canvas = document.querySelector('[data-three-canvas]');
  if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 0.4, 9.2);

  const uniforms = {
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(0.5, 0.5) },
  };

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 12, 72, 56),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  plane.rotation.x = -0.12;
  plane.position.set(2.4, 0, -1.7);
  scene.add(plane);

  const building = new THREE.Group();
  const blocks = [
    [-2.5, -1.2, 0, 2.3, 2.4, 1.4],
    [-0.2, -0.7, -0.3, 1.9, 3.4, 1.5],
    [1.7, -1.0, -0.7, 1.5, 2.8, 1.2],
    [-1.35, 1.2, -0.45, 1.2, 1.1, 1.0],
    [0.45, 1.55, -0.8, 0.95, 1.2, 0.8],
  ];

  blocks.forEach(([x, y, z, w, h, d]) => {
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
    const lines = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x6aa6c9, transparent: true, opacity: 0.22 }),
    );
    lines.position.set(x, y, z);
    building.add(lines);
  });
  building.position.set(2.1, -0.2, 0);
  scene.add(building);

  const particleCount = 120;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({ color: 0xd8ad62, size: 0.025, transparent: true, opacity: 0.62 }),
  );
  scene.add(particles);

  const pointer = new THREE.Vector2(0.5, 0.5);
  const targetPointer = new THREE.Vector2(0.5, 0.5);
  const onPointerMove = (event) => {
    targetPointer.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(rect.height, 1);
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const clock = new THREE.Clock();
  let frame;
  const animate = () => {
    frame = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    pointer.lerp(targetPointer, 0.045);
    uniforms.uTime.value = elapsed;
    uniforms.uPointer.value.copy(pointer);
    building.rotation.y = (pointer.x - 0.5) * 0.14;
    building.rotation.x = (pointer.y - 0.5) * 0.06;
    particles.rotation.z = elapsed * 0.008;
    renderer.render(scene, camera);
  };
  animate();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('resize', resize);
    renderer.dispose();
  };
}
