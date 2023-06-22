import {
  WebGLRenderer,
  Color,
  Scene,
  PerspectiveCamera,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  PlaneGeometry,
} from 'three';
import Stats from 'stats.js';
import { Control } from './dat.gui';

export const createRenderer = () => {
  const renderer = new WebGLRenderer();
  renderer.setClearColor(new Color(0xeeeeee));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  return { renderer };
};

interface ResizeArgs {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

export const resizeRenderer = ({ camera, renderer }: ResizeArgs) => {
  const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return { resize };
};

interface RenderArgs {
  stats: Stats;
  renderer: WebGLRenderer;
  scene: Scene;
  camera: PerspectiveCamera;
  controls: Control;
  plane: Mesh<PlaneGeometry, MeshBasicMaterial>;
}

export const renderScene = ({
  renderer,
  camera,
  scene,
  stats,
  controls,
  plane,
}: RenderArgs) => {
  // let step = 0;
  const render = () => {
    stats.update();

    scene.traverse((e) => {
      if (e instanceof Mesh && e !== plane) {
        if (e instanceof Mesh<BoxGeometry, MeshBasicMaterial>) {
          e.rotation.x += controls.rotationSpeed;
          e.rotation.y += controls.rotationSpeed;
          e.rotation.z += controls.rotationSpeed;
        }
      }
    });

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  };

  return {
    render,
  };
};
