import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

interface SensorModel3DProps {
  reducedMotion: boolean
  theme: 'light' | 'dark'
}

type HardwareComponentId =
  | 'overview'
  | 'mic'
  | 'esp32'
  | 'lora'
  | 'enclosure'
  | 'led'
  | 'mount'

interface ComponentDetail {
  id: HardwareComponentId
  title: string
  subtitle: string
  description: string
  specs: string[]
  privacyNote?: string
}

const hardwareComponents: ComponentDetail[] = [
  {
    id: 'overview',
    title: 'Sensor Urbano Sonitus Node v1.2',
    subtitle: 'Conceito de Hardware IoT para Cidades Inteligentes',
    description:
      'Dispositivo compacto em formato de luminária ambiental urbana, projetado para fixação em postes de iluminação pública ou fachadas de edifícios cívicos. Opera de forma autônoma sem fiação complexa.',
    specs: [
      'Alimentação: Micro painel solar superior + bateria interna Li-ion 18650 ou rede pública',
      'Grau de Proteção: IP66 resistente a intempéries, radiação UV e maresia',
      'Dimensões aproximadas: 24 cm altura × 11 cm diâmetro',
    ],
  },
  {
    id: 'mic',
    title: 'Microfone Ambiental MEMS (I2S)',
    subtitle: 'Captação Estrita de Pressão Acústica (dB SPL)',
    description:
      'Cápsula microfônica industrial de alta linearidade com saída digital I2S. Calibrada para amostragem contínua da pressão sonora ambiente ponderada em frequência dB(A).',
    specs: [
      'Faixa dinâmica: 30 dB(A) a 125 dB(A)',
      'Amostragem: 48 kHz / 24-bit com conversão digital direta',
      'Câmara de ressonância acústica calibrada com filtro anti-vento mecânico',
    ],
    privacyNote:
      'Privacidade Garantida: O transdutor não alimenta buffer de gravação. O sinal bruto é convertido em valor numérico RMS instantâneo na memória volátil e imediatamente descartado.',
  },
  {
    id: 'esp32',
    title: 'Microcontrolador ESP32-S3 (Edge AI)',
    subtitle: 'Processamento Local em Borda (Edge Computing)',
    description:
      'Processador dual-core de ultrabaixo consumo responsável por executar a transformada de Fourier e o cálculo dos índices LAeq, Lmax e percentis estatísticos diretamente no dispositivo físico.',
    specs: [
      'Clock: 240 MHz com co-processador ULP de economia de energia',
      'Cálculo de métricas estatísticas: LAeq, LA10, LA50, LA90 a cada ciclo',
      'Memória de armazenamento volátil sem gravação em disco ou cartão SD',
    ],
    privacyNote:
      'Zero Armazenamento de Voz: A plataforma Sonitus processa apenas matrizes numéricas de intensidade decibélica. Nenhuma conversa ou som identificável é transmitido.',
  },
  {
    id: 'lora',
    title: 'Módulo de Transmissão (LoRaWAN / NB-IoT)',
    subtitle: 'Conectividade de Longo Alcance e Baixo Consumo',
    description:
      'Antena integrada omnidirecional para envio periódico de pacotes de dados ultraleves (cerca de 8 bytes por telemetria) com alcance de até 15 km em ambiente urbano.',
    specs: [
      'Frequências: 915 MHz (LoRaWAN AU915) e bandas LTE NB-IoT',
      'Consumo médio: < 15 mA em transmissão, 25 uA em repouso',
      'Criptografia ponta a ponta AES-128 nativa no protocolo',
    ],
  },
  {
    id: 'enclosure',
    title: 'Cúpula e Grade Acústica IP66',
    subtitle: 'Enclosure de Polímero Hidrofóbico e Alumínio',
    description:
      'Carcaça exterior moldada em policarbonato industrial com proteção UV e anel metálico em liga de alumínio naval. Abertura perimétrica de 360° para entrada natural de pressão sonora sem distorção direcional.',
    specs: [
      'Membrana hidrofóbica e oleofóbica acústica microporosa',
      'Resistência a temperaturas de -15 °C a +65 °C',
      'Design anti-nidificação para pássaros e insetos urbanos',
    ],
  },
  {
    id: 'led',
    title: 'Anel LED de Diagnóstico & Status',
    subtitle: 'Feedback Visual Não-Invasivo para Manutenção',
    description:
      'Halo circular de iluminação difusa suave localizado na base da cúpula. Permite que equipes de manutenção pública inspecionem visualmente o estado do sensor no poste sem necessidade de escada.',
    specs: [
      'Verde/Turquesa suave: Sensor calibrado e operando normalmente',
      'Âmbar: Calibração pendente ou ruído persistente fora da curva',
      'Pulsos lentos com brilho reduzido à noite para evitar poluição luminosa',
    ],
  },
  {
    id: 'mount',
    title: 'Braço de Fixação Universal & Amortecedor',
    subtitle: 'Instalação Rápida em Infraestrutura Urbana Existente',
    description:
      'Braço articulado com abraçadeira metálica em aço inox projetada para fixação em postes redondos, octogonais ou fachadas. Inclui elastômero amortecedor para desacoplamento de vibração mecânica.',
    specs: [
      'Isolamento mecânico anti-vibração contra trepidação de tráfego pesado',
      'Abraçadeira ajustável para diâmetros de 60 mm a 220 mm',
      'Instalação modular sem necessidade de corte ou furação estrutural',
    ],
  },
]

export const SensorModel3D: React.FC<SensorModel3DProps> = ({
  reducedMotion,
  theme,
}) => {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const sensorGroupRef = useRef<THREE.Group | null>(null)
  const animFrameIdRef = useRef<number | null>(null)
  const ledMeshRef = useRef<THREE.Mesh | null>(null)

  const [hasWebGL, setHasWebGL] = useState(() => {
    try {
      const canvas = document.createElement('canvas')
      return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    } catch {
      return false
    }
  })
  const [selectedComp, setSelectedComp] = useState<HardwareComponentId>('overview')
  const [isRotating, setIsRotating] = useState(!reducedMotion)

  // Inicialização do Three.js
  useEffect(() => {
    if (!mountRef.current || !hasWebGL) return

    const container = mountRef.current
    const width = container.clientWidth || 540
    const height = container.clientHeight || 480

    // Criação da Cena
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Câmera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.set(3.2, 2.2, 4.4)
    cameraRef.current = camera

    // Renderizador com Antialias e suporte a alta densidade
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap

      container.replaceChildren(renderer.domElement)
      rendererRef.current = renderer
    } catch (err) {
      console.warn('WebGL falhou ao inicializar renderer:', err)
      queueMicrotask(() => setHasWebGL(false))
      return
    }

    // Controles Orbitais
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2.4
    controls.maxDistance = 7.5
    controls.maxPolarAngle = Math.PI * 0.85
    controls.autoRotate = !reducedMotion
    controls.autoRotateSpeed = 1.0
    controls.target.set(0, 0.2, 0)
    controlsRef.current = controls

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 0.9 : 1.2)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(5, 8, 5)
    keyLight.castShadow = true
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x7eaee4, 1.2)
    fillLight.position.set(-5, -2, -4)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x1c7d62, 1.5)
    rimLight.position.set(0, 5, -6)
    scene.add(rimLight)

    // GRUPO PRINCIPAL DO SENSOR
    const sensorGroup = new THREE.Group()
    sensorGroupRef.current = sensorGroup
    scene.add(sensorGroup)

    // MATERIAIS
    const metalDarkMat = new THREE.MeshStandardMaterial({
      color: 0x222b35,
      metalness: 0.85,
      roughness: 0.25,
    })

    const bodyEnclosureMat = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x2d3a4b : 0xe2e8f0,
      metalness: 0.2,
      roughness: 0.35,
    })

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.95,
      roughness: 0.15,
    })

    const acousticGrilleMat = new THREE.MeshStandardMaterial({
      color: 0x111822,
      metalness: 0.7,
      roughness: 0.6,
      wireframe: false,
    })

    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x26c281,
      emissive: 0x1c7d62,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    })

    const solarMat = new THREE.MeshStandardMaterial({
      color: 0x1a273b,
      metalness: 0.9,
      roughness: 0.1,
    })

    // 1. POSTE URBANO (Segmento de referência)
    const poleGeo = new THREE.CylinderGeometry(0.18, 0.18, 3.8, 24)
    const poleMesh = new THREE.Mesh(poleGeo, metalDarkMat)
    poleMesh.position.set(-1.4, 0, 0)
    sensorGroup.add(poleMesh)

    // Abraçadeiras no poste
    const clampGeo = new THREE.TorusGeometry(0.21, 0.035, 12, 24)
    const clamp1 = new THREE.Mesh(clampGeo, chromeMat)
    clamp1.rotation.x = Math.PI / 2
    clamp1.position.set(-1.4, 0.5, 0)
    sensorGroup.add(clamp1)

    const clamp2 = clamp1.clone()
    clamp2.position.set(-1.4, -0.5, 0)
    sensorGroup.add(clamp2)

    // 2. BRAÇO DE FIXAÇÃO HORIZONTAL ARTICULADO
    const armGeo = new THREE.CylinderGeometry(0.065, 0.065, 1.4, 16)
    const armMesh = new THREE.Mesh(armGeo, metalDarkMat)
    armMesh.rotation.z = Math.PI / 2
    armMesh.position.set(-0.7, 0, 0)
    sensorGroup.add(armMesh)

    // Junta angular / amortecedor antivibração
    const jointGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const jointMesh = new THREE.Mesh(jointGeo, chromeMat)
    jointMesh.position.set(-0.05, 0, 0)
    sensorGroup.add(jointMesh)

    // Conector vertical para a base do sensor
    const baseStemGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.45, 16)
    const baseStemMesh = new THREE.Mesh(baseStemGeo, chromeMat)
    baseStemMesh.position.set(0, -0.22, 0)
    sensorGroup.add(baseStemMesh)

    // 3. BASE INFERIOR DO SENSOR (Cônica chanfrada)
    const baseConeGeo = new THREE.CylinderGeometry(0.55, 0.28, 0.35, 32)
    const baseConeMesh = new THREE.Mesh(baseConeGeo, metalDarkMat)
    baseConeMesh.position.set(0, 0.05, 0)
    sensorGroup.add(baseConeMesh)

    // 4. CORPO INFERIOR (Cilindro principal de eletrônica ESP32)
    const lowerBodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.6, 32)
    const lowerBodyMesh = new THREE.Mesh(lowerBodyGeo, bodyEnclosureMat)
    lowerBodyMesh.position.set(0, 0.5, 0)
    sensorGroup.add(lowerBodyMesh)

    // Anel de friso metálico intermediário
    const ringGeo = new THREE.TorusGeometry(0.56, 0.02, 16, 32)
    const ringMesh = new THREE.Mesh(ringGeo, chromeMat)
    ringMesh.rotation.x = Math.PI / 2
    ringMesh.position.set(0, 0.8, 0)
    sensorGroup.add(ringMesh)

    // 5. GRADE ACÚSTICA PERIMÉTRICA (Câmara do microfone MEMS 360°)
    const grilleOuterGeo = new THREE.CylinderGeometry(0.53, 0.53, 0.32, 32, 1, true)
    const grilleOuterMesh = new THREE.Mesh(grilleOuterGeo, acousticGrilleMat)
    grilleOuterMesh.position.set(0, 0.98, 0)
    sensorGroup.add(grilleOuterMesh)

    // Aletas da grade acústica
    for (let i = 0; i < 16; i++) {
      const slatAngle = (i / 16) * Math.PI * 2
      const slatGeo = new THREE.BoxGeometry(0.02, 0.3, 0.08)
      const slatMesh = new THREE.Mesh(slatGeo, chromeMat)
      slatMesh.position.set(
        Math.cos(slatAngle) * 0.53,
        0.98,
        Math.sin(slatAngle) * 0.53
      )
      slatMesh.rotation.y = -slatAngle
      sensorGroup.add(slatMesh)
    }

    // Núcleo interno do microfone MEMS (Dourado/Bronze no centro da grade)
    const micCoreGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.24, 16)
    const micCoreMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    })
    const micCoreMesh = new THREE.Mesh(micCoreGeo, micCoreMat)
    micCoreMesh.position.set(0, 0.98, 0)
    sensorGroup.add(micCoreMesh)

    // 6. ANEL LED DE DIAGNÓSTICO (Halo circular emissivo)
    const ledRingGeo = new THREE.TorusGeometry(0.55, 0.028, 16, 40)
    const ledMesh = new THREE.Mesh(ledRingGeo, ledMat)
    ledMesh.rotation.x = Math.PI / 2
    ledMesh.position.set(0, 1.16, 0)
    sensorGroup.add(ledMesh)
    ledMeshRef.current = ledMesh

    // 7. CÚPULA SUPERIOR AERODINÂMICA (Hemisfério com acabamento suave)
    const domeGeo = new THREE.SphereGeometry(
      0.55,
      32,
      24,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    )
    const domeMesh = new THREE.Mesh(domeGeo, bodyEnclosureMat)
    domeMesh.position.set(0, 1.16, 0)
    sensorGroup.add(domeMesh)

    // 8. CÉLULA SOLAR CIRCULAR NO TOPO DA CÚPULA
    const solarDiscGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.02, 32)
    const solarDiscMesh = new THREE.Mesh(solarDiscGeo, solarMat)
    solarDiscMesh.position.set(0, 1.71, 0)
    sensorGroup.add(solarDiscMesh)

    const solarRimGeo = new THREE.TorusGeometry(0.325, 0.015, 12, 32)
    const solarRimMesh = new THREE.Mesh(solarRimGeo, chromeMat)
    solarRimMesh.rotation.x = Math.PI / 2
    solarRimMesh.position.set(0, 1.715, 0)
    sensorGroup.add(solarRimMesh)

    // Centralizar grupo levemente
    sensorGroup.position.set(0.6, -0.7, 0)

    // Loop de Animação
    const clock = new THREE.Clock()
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Pulso suave no anel LED
      if (ledMeshRef.current) {
        const pulse = Math.sin(elapsedTime * 2.5) * 0.25 + 1.2
        const mat = ledMeshRef.current.material as THREE.MeshStandardMaterial
        mat.emissiveIntensity = pulse
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Redimensionamento
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      cameraRef.current.aspect = newWidth / newHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
      controls.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [hasWebGL, theme, reducedMotion])

  // Efeito para sincronizar auto-rotação com controle
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isRotating && !reducedMotion
    }
  }, [isRotating, reducedMotion])

  // Atualização dos pontos de visão
  const focusView = (view: 'default' | 'grille' | 'mount' | 'solar') => {
    if (!controlsRef.current || !cameraRef.current) return

    if (view === 'default') {
      cameraRef.current.position.set(3.2, 2.2, 4.4)
      controlsRef.current.target.set(0, 0.2, 0)
      setSelectedComp('overview')
    } else if (view === 'grille') {
      cameraRef.current.position.set(1.4, 0.8, 2.2)
      controlsRef.current.target.set(0.6, 0.3, 0)
      setSelectedComp('mic')
    } else if (view === 'mount') {
      cameraRef.current.position.set(-2.8, 1.2, 1.6)
      controlsRef.current.target.set(-0.2, -0.3, 0)
      setSelectedComp('mount')
    } else if (view === 'solar') {
      cameraRef.current.position.set(0.2, 4.0, 1.2)
      controlsRef.current.target.set(0.6, 0.5, 0)
      setSelectedComp('enclosure')
    }
    controlsRef.current.update()
  }

  const zoom = (delta: number) => {
    if (!cameraRef.current || !controlsRef.current) return
    const camera = cameraRef.current
    const dir = new THREE.Vector3()
    camera.getWorldDirection(dir)
    camera.position.addScaledVector(dir, delta)
    controlsRef.current.update()
  }

  const currentDetail =
    hardwareComponents.find((c) => c.id === selectedComp) ?? hardwareComponents[0]

  return (
    <div className="sensor-3d-wrapper">
      <div className="viewer-and-controls">
        <div className="canvas-container" ref={mountRef} aria-label="Visualizador 3D interativo do sensor de ruído Sonitus">
          {!hasWebGL && (
            <div className="webgl-fallback" role="img" aria-label="Esquema gráfico do sensor de ruído Sonitus">
              <div className="fallback-badge">
                <AlertTriangle size={18} aria-hidden="true" />
                Modo Esquemático (Aceleração 3D WebGL não detectada)
              </div>
              <svg viewBox="0 0 300 400" className="fallback-svg" fill="none" stroke="currentColor">
                <rect x="40" y="40" width="20" height="320" rx="6" fill="var(--color-surface-secondary)" stroke="var(--color-border)" strokeWidth="3" />
                <path d="M60 180 h 80" stroke="var(--color-border)" strokeWidth="6" strokeLinecap="round" />
                <circle cx="140" cy="180" r="10" fill="var(--color-primary)" />
                <rect x="120" y="195" width="40" height="15" rx="3" fill="var(--color-border)" />
                <path d="M110 210 h 60 v 60 h -60 Z" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="3" />
                <rect x="115" y="145" width="50" height="40" rx="4" fill="var(--color-secondary-soft)" stroke="var(--color-secondary)" strokeWidth="2" />
                <line x1="120" y1="155" x2="160" y2="155" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="120" y1="165" x2="160" y2="165" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="120" y1="175" x2="160" y2="175" stroke="var(--color-secondary)" strokeWidth="2" strokeDasharray="3 3" />
                <ellipse cx="140" cy="140" rx="26" ry="6" fill="#1c7d62" />
                <path d="M114 140 A 26 26 0 0 1 166 140 Z" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="3" />
                <ellipse cx="140" cy="115" rx="14" ry="4" fill="var(--color-primary)" />
                <text x="140" y="245" textAnchor="middle" fill="var(--color-text)" fontSize="11" fontWeight="700">ESP32-S3</text>
                <text x="140" y="130" textAnchor="middle" fill="var(--color-calm)" fontSize="9" fontWeight="700">LED STATUS</text>
                <text x="195" y="165" fill="var(--color-text-muted)" fontSize="10">Grade Acústica</text>
                <line x1="168" y1="165" x2="190" y2="165" stroke="var(--color-text-muted)" strokeWidth="1" />
              </svg>
            </div>
          )}

          <div className="canvas-overlay-badges">
            <span className="live-3d-pill">
              <span className="pulse-dot" aria-hidden="true" />
              Modelo 3D Interativo
            </span>
            <span className="interaction-hint">Arraste para rotacionar · Scroll para zoom</span>
          </div>

          <div className="canvas-toolbar" role="toolbar" aria-label="Ferramentas de controle da visualização 3D">
            <button
              type="button"
              className={`tool-icon-btn ${isRotating ? 'active' : ''}`}
              onClick={() => setIsRotating((v) => !v)}
              title={isRotating ? 'Pausar rotação automática' : 'Ativar rotação automática'}
              aria-label={isRotating ? 'Pausar rotação' : 'Rotacionar automaticamente'}
            >
              <RotateCw size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="tool-icon-btn"
              onClick={() => zoom(0.6)}
              title="Aproximar visualização"
              aria-label="Aproximar"
            >
              <ZoomIn size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="tool-icon-btn"
              onClick={() => zoom(-0.6)}
              title="Afastar visualização"
              aria-label="Afastar"
            >
              <ZoomOut size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="tool-icon-btn"
              onClick={() => focusView('default')}
              title="Restaurar ângulo inicial"
              aria-label="Restaurar visualização"
            >
              <Maximize2 size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="camera-presets-bar" role="group" aria-label="Ângulos pré-definidos do sensor">
          <span className="presets-label">Ângulo de inspeção:</span>
          <button
            type="button"
            className={`preset-btn ${selectedComp === 'overview' ? 'active' : ''}`}
            onClick={() => focusView('default')}
          >
            Geral
          </button>
          <button
            type="button"
            className={`preset-btn ${selectedComp === 'mic' ? 'active' : ''}`}
            onClick={() => focusView('grille')}
          >
            Grade Acústica
          </button>
          <button
            type="button"
            className={`preset-btn ${selectedComp === 'mount' ? 'active' : ''}`}
            onClick={() => focusView('mount')}
          >
            Fixação Poste
          </button>
          <button
            type="button"
            className={`preset-btn ${selectedComp === 'enclosure' ? 'active' : ''}`}
            onClick={() => focusView('solar')}
          >
            Cúpula Solar
          </button>
        </div>
      </div>

      <div className="hardware-details-sidebar">
        <div className="component-selector" role="tablist" aria-label="Componentes do hardware">
          {hardwareComponents.map((item) => (
            <button
              key={item.id}
              role="tab"
              type="button"
              id={`comp-tab-${item.id}`}
              aria-selected={selectedComp === item.id}
              className={`comp-chip ${selectedComp === item.id ? 'active' : ''}`}
              onClick={() => setSelectedComp(item.id)}
            >
              {item.id === 'overview' ? 'Visão Geral' : item.title.split(' ')[0] + ' ' + (item.title.split(' ')[1] || '')}
            </button>
          ))}
        </div>

        <article className="selected-component-card" aria-live="polite">
          <header className="comp-header">
            <span className="comp-badge">Componente Conceitual</span>
            <h3 className="comp-title">{currentDetail.title}</h3>
            <p className="comp-subtitle">{currentDetail.subtitle}</p>
          </header>

          <p className="comp-description">{currentDetail.description}</p>

          <div className="comp-specs-block">
            <h4 className="specs-title">
              <CheckCircle2 size={15} aria-hidden="true" />
              Especificações Técnicas Projetadas:
            </h4>
            <ul className="specs-list">
              {currentDetail.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {currentDetail.privacyNote && (
            <div className="privacy-highlight-box" role="note">
              <ShieldCheck size={18} className="privacy-icon" aria-hidden="true" />
              <div>
                <strong>Atenção à Privacidade:</strong>
                <p>{currentDetail.privacyNote}</p>
              </div>
            </div>
          )}
        </article>

        <div className="privacy-banner-card">
          <div className="privacy-banner-header">
            <ShieldCheck size={20} className="privacy-shield" aria-hidden="true" />
            <div>
              <h4 className="banner-title">Diretriz Fundamental de Privacidade</h4>
              <span className="banner-tagline">Conceito de Monitoramento Ambiental Ético</span>
            </div>
          </div>
          <p className="banner-body">
            O conceito do Sonitus prevê estritamente <strong>análise de intensidade sonora (dB SPL / LAeq)</strong> e métricas acústicas agregadas, <strong>nunca armazenamento, transmissão ou reconstrução de conversas e vozes humanas</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
