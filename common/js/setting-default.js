import * as THREE from '../js/three/build/three.module.js';

import {
	DDSLoader
} from '../js/three/examples/jsm/loaders/DDSLoader.js';
import {
	MTLLoader
} from '../js/three/examples/jsm/loaders/MTLLoader.js';
import {
	OBJLoader
} from '../js/three/examples/jsm/loaders/OBJLoader.js';

var container;

var camera, scene, renderer;

var mouseX = 0,
	mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();
// render();



function init() {

	container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 20000);
	camera.position.z = 0;

	// scene

	scene = new THREE.Scene();

	var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
	scene.add(ambientLight);

	var pointLight = new THREE.PointLight(0xffffff, 0.8);
	camera.add(pointLight);
	scene.add(camera);

	// model

	var onProgress = function (xhr) {

		if (xhr.lengthComputable) {

			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log(Math.round(percentComplete, 2) + '% downloaded');

		}

	};

	var onError = function () {};

	var manager = new THREE.LoadingManager();
	manager.addHandler(/\.dds$/i, new DDSLoader());

	// comment in the following line and import TGALoader if your asset uses TGA textures
	// manager.addHandler( /\.tga$/i, new TGALoader() );

	new MTLLoader(manager).setPath('./models/')
		.load('model.mtl',
			function (materials) {
				materials.preload();
				new OBJLoader(manager).setPath('./models/').setMaterials(materials).load('model.obj',
					function (object) {
						objmodel = object.clone();
						obj = new THREE.Object3D();
						obj.add(objmodel);
						obj.position.set(0, -1.2, 0);
						scene.add(obj);
					}, onProgress, onError);

			});
	var obj = new THREE.Mesh();


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	document.addEventListener('mousemove', onDocumentMouseMove, false);

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

	mouseX = (event.clientX - windowHalfX) / 4;
	mouseY = (event.clientY - windowHalfY) / 4;

}

//

function animate() {
	requestAnimationFrame(animate);
	render();
	obj.rotation.y += 0.01;
	renderer.render(scene, camera);
}

function render() {

	// camera.position.x += ( mouseX - camera.position.x ) * .05;
	// camera.position.y += ( - mouseY - camera.position.y ) * .05;

	camera.position.x = 5;
	camera.position.y = 0;
	camera.position.z = 0;


	// console.log('camera.position.x = ' + camera.position.x);
	// console.log('camera.position.y = ' + camera.position.y);

	camera.lookAt(scene.position);

	// 背景色
	scene.background = new THREE.Color(0xffffff);

}