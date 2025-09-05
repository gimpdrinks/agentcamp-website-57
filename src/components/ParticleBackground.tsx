
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const config = {
  particleCount: 200,
  particleSpread: 10,
  speed: 0.1,
  particleBaseSize: 100,
  particleColors: ['#ffffff', '#FFBF00'], // White and Gold/Yellow to match theme
  moveParticlesOnHover: false, // Disabled to not interfere with UI interactions
  alphaParticles: false,
  disableRotation: false,
};

// Convert hex to RGB
function hexToRgb(hex: string) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }
  const int = parseInt(hex, 16);
  return [
    ((int >> 16) & 255) / 255,
    ((int >> 8) & 255) / 255,
    (int & 255) / 255
  ];
}

const vertexShader = `
  attribute vec4 random;
  attribute vec3 color;
  
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
      vRandom = random;
      vColor = color;
      
      vec3 pos = position * uSpread;
      pos.z *= 10.0;
      
      vec4 mPos = modelMatrix * vec4(pos, 1.0);
      float t = uTime;
      mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
      mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
      mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
      
      vec4 mvPos = viewMatrix * mPos;
      gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
      vec2 uv = gl_PointCoord.xy;
      float d = length(uv - vec2(0.5));
      
      if(uAlphaParticles < 0.5) {
          if(d > 0.5) {
              discard;
          }
          gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
      } else {
          float circle = smoothstep(0.5, 0.4, d) * 0.8;
          gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
      }
  }
`;

function Particles() {
  const points = useRef<THREE.Points>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);

  const geometry = useMemo(() => {
    const count = config.particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      let x, y, z, len;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        len = x * x + y * y + z * z;
      } while (len > 1 || len === 0);

      const r = Math.cbrt(Math.random());
      positions.set([x * r, y * r, z * r], i * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);

      const col = hexToRgb(config.particleColors[Math.floor(Math.random() * config.particleColors.length)]);
      colors.set(col, i * 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('random', new THREE.BufferAttribute(randoms, 4));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uSpread: { value: config.particleSpread },
    uBaseSize: { value: config.particleBaseSize },
    uSizeRandomness: { value: 1 },
    uAlphaParticles: { value: config.alphaParticles ? 1 : 0 }
  }), []);

  useFrame((state) => {
    const { clock } = state;
    const elapsedTime = clock.getElapsedTime();

    if (material.current) {
      material.current.uniforms.uTime.value = elapsedTime * config.speed;
    }

    if (!config.disableRotation && points.current) {
        points.current.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;
        points.current.rotation.y = Math.cos(elapsedTime * 0.05) * 0.1;
        points.current.rotation.z += 0.0005 * config.speed;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
      />
    </points>
  );
}

const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <Canvas
        camera={{ fov: 15, position: [0, 0, 20] }}
        gl={{ alpha: true, antialias: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
