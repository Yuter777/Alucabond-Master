<template>
  <div ref="containerRef" class="canvas-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'

const containerRef = ref(null)

let renderer, scene, camera, animId
let buildingGroup, sweepLight, ambientGlow
let time = 0
let mouseX = 0, mouseY = 0
let targetMouseX = 0, targetMouseY = 0

// Clean metallic shader for ACP panels
const acpVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`

const acpFragmentShader = `
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform float uMetalness;
  uniform int uPanelCols;
  uniform int uPanelRows;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPos);

    // Panel grid seams
    float cols = float(uPanelCols);
    float rows = float(uPanelRows);
    float seamX = smoothstep(0.97, 1.0, fract(vUv.x * cols));
    seamX += smoothstep(0.0, 0.03, fract(vUv.x * cols));
    float seamY = smoothstep(0.97, 1.0, fract(vUv.y * rows));
    seamY += smoothstep(0.0, 0.03, fract(vUv.y * rows));
    float seam = clamp(seamX + seamY, 0.0, 1.0);

    // Base metallic color
    vec3 color = uBaseColor;

    // Fresnel rim
    float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 2.5);

    // Subtle brushed metal highlight - horizontal bands
    float brush = fract(vUv.y * 80.0 + uTime * 0.05);
    brush = pow(max(0.0, sin(brush * 3.14159)), 12.0) * 0.12;

    // Slow light sweep across surface
    float sweep = sin(vUv.x * 2.0 + uTime * 0.25) * 0.5 + 0.5;
    sweep = pow(sweep, 4.0) * 0.2;

    // Combine — warm gold tints
    color += brush * vec3(0.85, 0.72, 0.35);
    color += sweep * vec3(0.65, 0.55, 0.25);
    color += fresnel * 0.3 * vec3(0.78, 0.65, 0.3);

    // Apply seam darkening
    color = mix(color, vec3(0.04, 0.04, 0.04), seam * 0.9);

    gl_FragColor = vec4(color, 1.0);
  }
`

// Simple clean glass shader
const glassFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 normal = normalize(vNormal);
    float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 2.0);

    // Window pane grid
    float cols = 6.0; float rows = 8.0;
    float gx = fract(vUv.x * cols);
    float gy = fract(vUv.y * rows);
    float frame = 1.0 - step(0.05, gx) * step(0.05, gy) * (1.0 - step(0.95, gx)) * (1.0 - step(0.95, gy));

    // Interior darkness
    vec3 interior = vec3(0.02, 0.025, 0.03);
    vec3 glassColor = mix(vec3(0.08, 0.10, 0.13), vec3(0.25, 0.30, 0.35), fresnel);

    float light = sin(uTime * 0.3 + vUv.y * 2.0) * 0.5 + 0.5;
    glassColor += light * 0.04 * vec3(0.6, 0.7, 1.0);

    vec3 color = mix(interior, glassColor, fresnel * 0.7 + 0.1);
    color = mix(color, vec3(0.15, 0.18, 0.22), frame);

    gl_FragColor = vec4(color, 0.9);
  }
`

function init() {
  const W = containerRef.value.clientWidth
  const H = containerRef.value.clientHeight

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  containerRef.value.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x000000, 18, 40)

  camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100)
  camera.position.set(4, 1.5, 10)
  camera.lookAt(0, 0, 0)

  setupLighting()

  buildingGroup = new THREE.Group()
  scene.add(buildingGroup)

  buildFacade()
  buildGround()

  introAnimation()
}

function setupLighting() {
  const ambient = new THREE.AmbientLight(0x0c0800, 8)
  scene.add(ambient)

  // Key light — top right, warm gold-white
  const keyLight = new THREE.DirectionalLight(0xd4bf8a, 2.5)
  keyLight.position.set(6, 12, 8)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(2048, 2048)
  keyLight.shadow.camera.near = 1
  keyLight.shadow.camera.far = 40
  keyLight.shadow.camera.left = -10
  keyLight.shadow.camera.right = 10
  keyLight.shadow.camera.top = 12
  keyLight.shadow.camera.bottom = -5
  scene.add(keyLight)

  // Fill — opposite side, dark warm
  const fillLight = new THREE.DirectionalLight(0x1a1000, 1.5)
  fillLight.position.set(-8, 4, -4)
  scene.add(fillLight)

  // Ground bounce — warm amber from below
  const groundLight = new THREE.HemisphereLight(0x0a0800, 0x050400, 1.2)
  scene.add(groundLight)

  // Animated sweep spotlight — gold
  sweepLight = new THREE.SpotLight(0xc9a84c, 4, 25, Math.PI / 8, 0.4, 1)
  sweepLight.position.set(-3, 10, 6)
  scene.add(sweepLight)
}

function makeMaterial(baseColor, cols = 4, rows = 8) {
  return new THREE.ShaderMaterial({
    vertexShader: acpVertexShader,
    fragmentShader: acpFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uBaseColor: { value: new THREE.Color(baseColor) },
      uMetalness: { value: 0.92 },
      uPanelCols: { value: cols },
      uPanelRows: { value: rows },
    }
  })
}

function buildFacade() {
  // MAIN FACADE — front face
  const frontW = 8, frontH = 7
  const frontGeo = new THREE.BoxGeometry(frontW, frontH, 0.15, 1, 1, 1)
  const frontMat = makeMaterial(0x0e0f10, 6, 10)
  const front = new THREE.Mesh(frontGeo, frontMat)
  front.position.set(0, frontH / 2, 0)
  front.castShadow = true
  front.receiveShadow = true
  buildingGroup.add(front)

  // SIDE FACE — wraps around corner
  const sideW = 3, sideH = 7
  const sideGeo = new THREE.BoxGeometry(sideW, sideH, 0.15)
  const sideMat = makeMaterial(0x0c0d0e, 3, 10)
  const side = new THREE.Mesh(sideGeo, sideMat)
  side.position.set(frontW / 2 + sideW / 2, sideH / 2, 0)
  side.rotation.y = Math.PI / 2
  side.castShadow = true
  buildingGroup.add(side)

  // GLASS WINDOWS PANEL — inset into front facade
  const winGeo = new THREE.PlaneGeometry(6.4, 5.8, 1, 1)
  const winMat = new THREE.ShaderMaterial({
    vertexShader: acpVertexShader,
    fragmentShader: glassFragmentShader,
    uniforms: { uTime: { value: 0 } },
    transparent: true,
  })
  const windows = new THREE.Mesh(winGeo, winMat)
  windows.position.set(0, frontH / 2, 0.09)
  buildingGroup.add(windows)

  // STRUCTURAL COLUMNS — vertical ACP columns
  const colMat = makeMaterial(0x171818, 1, 12)
  const colPositions = [-frontW / 2 + 0.3, -frontW / 6, frontW / 6, frontW / 2 - 0.3]
  colPositions.forEach(x => {
    const colGeo = new THREE.BoxGeometry(0.3, frontH + 0.1, 0.22)
    const col = new THREE.Mesh(colGeo, colMat)
    col.position.set(x, frontH / 2, 0.04)
    col.castShadow = true
    buildingGroup.add(col)
  })

  // HORIZONTAL BANDS — structural bands
  const bandMat = makeMaterial(0x141515, 8, 1)
  const bandPositions = [0.8, 2.4, 4.0, 5.6]
  bandPositions.forEach(y => {
    const bandGeo = new THREE.BoxGeometry(frontW + 0.05, 0.18, 0.22)
    const band = new THREE.Mesh(bandGeo, bandMat)
    band.position.set(0, y, 0.04)
    buildingGroup.add(band)
  })

  // TOP CAP — parapet
  const capGeo = new THREE.BoxGeometry(frontW + 0.2, 0.4, 0.5)
  const capMat = makeMaterial(0x111213, 1, 1)
  const cap = new THREE.Mesh(capGeo, capMat)
  cap.position.set(0, frontH + 0.2, 0.1)
  cap.castShadow = true
  buildingGroup.add(cap)

  // SIDE CAP
  const sideCap = new THREE.Mesh(
    new THREE.BoxGeometry(sideW + 0.2, 0.4, 0.5),
    capMat
  )
  sideCap.rotation.y = Math.PI / 2
  sideCap.position.set(frontW / 2 + sideW / 2, frontH + 0.2, 0.1)
  buildingGroup.add(sideCap)

  // CORNER DETAIL — vertical chrome strip at corner
  const cornerGeo = new THREE.BoxGeometry(0.08, frontH + 0.5, 0.08)
  const cornerMat = new THREE.MeshStandardMaterial({
    color: 0xb8860b, metalness: 1.0, roughness: 0.08
  })
  const corner = new THREE.Mesh(cornerGeo, cornerMat)
  corner.position.set(frontW / 2, frontH / 2, 0.1)
  corner.castShadow = true
  buildingGroup.add(corner)

  // GROUND FLOOR — darker recessed base
  const baseGeo = new THREE.BoxGeometry(frontW + 0.1, 1.2, 0.3)
  const baseMat = makeMaterial(0x080909, 4, 1)
  const base = new THREE.Mesh(baseGeo, baseMat)
  base.position.set(0, 0.6, 0.05)
  base.castShadow = true
  buildingGroup.add(base)

  // ENTRANCE — recessed dark void
  const entranceGeo = new THREE.BoxGeometry(1.6, 2.4, 0.25)
  const entranceMat = new THREE.MeshStandardMaterial({ color: 0x020202, metalness: 0, roughness: 1 })
  const entrance = new THREE.Mesh(entranceGeo, entranceMat)
  entrance.position.set(0, 1.2, 0.12)
  buildingGroup.add(entrance)

  // LOGO PLACEHOLDER on facade
  buildGroup_plaque()
}

function buildGroup_plaque() {
  const geo = new THREE.BoxGeometry(1.8, 0.25, 0.04)
  const mat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.1 })
  const plaque = new THREE.Mesh(geo, mat)
  plaque.position.set(0, 3.2, 0.165)
  buildingGroup.add(plaque)
}

function buildGround() {
  // Reflective ground plane
  const groundGeo = new THREE.PlaneGeometry(40, 40)
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x030303,
    metalness: 0.0,
    roughness: 0.85,
  })
  const ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  // Ground grid lines
  const gridHelper = new THREE.GridHelper(20, 20, 0x1a1400, 0x0d0a00)
  gridHelper.position.y = 0.002
  scene.add(gridHelper)
}

function introAnimation() {
  buildingGroup.position.y = -3
  buildingGroup.scale.set(0.95, 0.95, 0.95)

  gsap.to(buildingGroup.position, {
    y: 0,
    duration: 2.0,
    delay: 0.5,
    ease: 'power4.out'
  })
  gsap.to(buildingGroup.scale, {
    x: 1, y: 1, z: 1,
    duration: 2.0,
    delay: 0.5,
    ease: 'power3.out'
  })
  gsap.from(camera.position, {
    z: 14,
    duration: 3.5,
    delay: 0.3,
    ease: 'power2.inOut'
  })
}

function updateShaders(t) {
  buildingGroup.children.forEach(child => {
    if (child.material?.uniforms?.uTime) {
      child.material.uniforms.uTime.value = t
    }
  })
}

function animate() {
  animId = requestAnimationFrame(animate)
  time += 0.006

  // Smooth mouse follow
  mouseX += (targetMouseX - mouseX) * 0.03
  mouseY += (targetMouseY - mouseY) * 0.03

  // Very subtle camera drift — architectural, not chaotic
  camera.position.x = 4 + mouseX * 0.6 + Math.sin(time * 0.15) * 0.15
  camera.position.y = 1.5 + mouseY * 0.3 + Math.cos(time * 0.12) * 0.1
  camera.lookAt(0, 3.2, 0)

  // Sweep light arc
  sweepLight.position.x = Math.sin(time * 0.2) * 4
  sweepLight.position.z = Math.cos(time * 0.15) * 3 + 5

  updateShaders(time)
  renderer.render(scene, camera)
}

function onMouseMove(e) {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
  targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2
}

function onResize() {
  if (!containerRef.value) return
  const W = containerRef.value.clientWidth
  const H = containerRef.value.clientHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  renderer?.dispose()
})
</script>
