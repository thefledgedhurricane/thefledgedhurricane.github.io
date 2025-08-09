'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

type Props = {
  wallColor?: string;
  lightColor?: string;
  ambientIntensity?: number;
  dirIntensity?: number;
};

export default function ShowcaseScene({ wallColor = '#e5e7eb', lightColor = '#ffffff', ambientIntensity = 0.6, dirIntensity = 1.2 }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

  // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(3, 2, 4);

    // Lights
  const lightCol = new THREE.Color(lightColor);
  scene.add(new THREE.AmbientLight(lightCol, ambientIntensity));
  const dir1 = new THREE.DirectionalLight(lightCol, dirIntensity);
    dir1.position.set(5, 5, 5);
    scene.add(dir1);
  const dir2 = new THREE.DirectionalLight(lightCol, 0.3);
    dir2.position.set(-3, -2, -4);
    scene.add(dir2);

  // Classroom environment
  const wallCol = new THREE.Color(wallColor);

  // Room dimensions
  const roomW = 10; // width (x)
  const roomD = 12; // depth (z)
  const roomH = 4; // height (y)

  // Materials
  const wallMat = new THREE.MeshStandardMaterial({ color: wallCol, roughness: 0.9, metalness: 0.0 });
  const floorMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#9ca3af'), roughness: 0.8 }); // gray-400
  const ceilMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#f3f4f6'), roughness: 0.95 }); // gray-100
  const boardMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#0b3d0b'), roughness: 0.7 }); // dark green board
  const woodMat = new THREE.MeshStandardMaterial({ color: new THREE.Color('#925f3e'), roughness: 0.6 }); // desk wood

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomD), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomD), ceilMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = roomH;
  scene.add(ceiling);

  // Walls (four planes)
  const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomH), wallMat);
  wallBack.position.set(0, roomH / 2, -roomD / 2);
  // face inward
  // no rotation needed, default faces forward (positive z), we need it to face into room from back, rotate pi
  wallBack.rotation.y = Math.PI;
  scene.add(wallBack);

  const wallFront = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomH), wallMat);
  wallFront.position.set(0, roomH / 2, roomD / 2);
  // faces inward by default
  scene.add(wallFront);

  const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(roomD, roomH), wallMat);
  wallLeft.position.set(-roomW / 2, roomH / 2, 0);
  wallLeft.rotation.y = Math.PI / 2;
  scene.add(wallLeft);

  const wallRight = new THREE.Mesh(new THREE.PlaneGeometry(roomD, roomH), wallMat);
  wallRight.position.set(roomW / 2, roomH / 2, 0);
  wallRight.rotation.y = -Math.PI / 2;
  scene.add(wallRight);

  // Blackboard on front wall
  const board = new THREE.Mesh(new THREE.PlaneGeometry(4, 1.5), boardMat);
  board.position.set(0, 2, roomD / 2 - 0.01);
  scene.add(board);

  // Teacher desk (simple box) near front
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1), woodMat);
  desk.position.set(0, 0.5, roomD / 2 - 2);
  scene.add(desk);

  // Demo object: spinning torus above desk
  const geometry = new THREE.TorusKnotGeometry(0.6, 0.2, 200, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x60a5fa, metalness: 0.6, roughness: 0.35 });
  const torus = new THREE.Mesh(geometry, material);
  torus.position.set(0, 1.8, roomD / 2 - 2);
  scene.add(torus);

    // Floor (subtle)
  // subtle contact shadow fallback (optional)
  // intentionally omitted to keep scene simple and performant

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let raf = 0;
    const tick = () => {
    torus.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      controls.dispose();
    geometry.dispose();
    material.dispose();
    floor.geometry.dispose();
    (floor.material as THREE.Material).dispose();
    ceiling.geometry.dispose();
    (ceiling.material as THREE.Material).dispose();
    wallBack.geometry.dispose();
    (wallBack.material as THREE.Material).dispose();
    wallFront.geometry.dispose();
    (wallFront.material as THREE.Material).dispose();
    wallLeft.geometry.dispose();
    (wallLeft.material as THREE.Material).dispose();
    wallRight.geometry.dispose();
    (wallRight.material as THREE.Material).dispose();
    board.geometry.dispose();
    (board.material as THREE.Material).dispose();
    desk.geometry.dispose();
    (desk.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [wallColor, lightColor, ambientIntensity, dirIntensity]);

  return (
    <div ref={containerRef} className="w-full h-[70vh] bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" />
  );
}
