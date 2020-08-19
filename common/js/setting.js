import * as THREE from '../js/three/build/three.module.js';

import {
	DDSLoader
} from '../js/three/examples/jsm/loaders/DDSLoader.js';
import {
	OBJLoader
} from '../js/three/examples/jsm/loaders/OBJLoader.js';
// import {
// 	MTLLoader
// } from '../js/three/examples/jsm/loaders/MTLLoader.js';

var container;

var camera, renderer, obj;
var scene, // レンダリングするオブジェクトを入れる
	objmodel, // モデルデータを入れる
	obj, // モデルデータの角度などを変更するために重ねる
	camera, // カメラのオブジェクト
	pointLight, // 太陽光のような光源のオブジェクト
	ambientLight, // 自然光のような光源のオブジェクト
	axis, // 補助線のオブジェクト
	renderer; // 画面表示するためのオブジェクト

var mouseX = 0,
	mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// カウント用変数
var frameCount = 0;


var modelArr = [],
	AMOUNT_OF_MODEL = 100,
	WORLD_SIZE = 2000,
	RENDER_INTERVAL = 30,
	TICK_INTERVAL = 500;


window.addEventListener('load', init);
modelSet(animate);
// animate();
// render();


function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);


	container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 20000);
	camera.position.z = 0;

	// scene

	scene = new THREE.Scene();

	ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
	scene.add(ambientLight);

	pointLight = new THREE.PointLight(0xffffff, 0.8);
	camera.add(pointLight);

}

function modelSet(callback) {

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

	new OBJLoader(manager).setPath('./models/').load('model.obj',
		function (object) {

			object.traverse(function (objectWire) {

				if (objectWire instanceof THREE.Mesh) {
					//objectWire.geometry.computeFaceNormals();
					var geometry = objectWire.geometry;
					//console.log(geometry);
					//geometry.dynamic = true;
					var material = objectWire.material;
					var mesh = new THREE.Mesh(geometry, material);

					var useWireFrame = true;
					if (useWireFrame) {
						mesh.traverse(function (objectWire) {
							if (objectWire instanceof THREE.Mesh) {
								objectWire.material.wireframe = true;
								const hexcolor = 0xfcfcfc;
								objectWire.material.color = new THREE.Color(hexcolor);
							}
						});
					}
				}
			});



			objmodel = object.clone();
			var scale = 100;
			objmodel.scale.set(scale, scale, scale); // 縮尺の初期化
			objmodel.rotation.set(0, 0, 0); // 角度の初期化
			objmodel.position.set(0, -1.2, 0); // 位置の初期化

			for (var i = 0; i < AMOUNT_OF_MODEL; i++) {
				modelArr[i] = new THREE.Object3D();
				var objmodel = object.clone();
				var model = modelArr[i];
				model.add(objmodel);

				model.name = "model-" + i;
				model.speed = Math.random() - 0.5;
				model.randSeed = Math.random(); //波形とかずらすやつに使う
				model.position.x = (Math.random() - 0.5) * WORLD_SIZE / 2;
				model.position.y = (Math.random() - 0.5) * WORLD_SIZE / 2;
				model.position.z = (Math.random() - 0.5) * WORLD_SIZE;

				var scaleBase = scale;
				var scale = model.speed + scaleBase + Math.random(-1, 1) * 0.1;
				model.scale.set(scale, scale, scale);
				model.updateMatrix();
				model.rotation.y += 1.0;
				scene.add(model); // sceneに追加
			}

			// load後処理
			callback();

		}, onProgress, onError);

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
	camera.position.x = 50;
	camera.position.y = windowHalfY * 0 + mouseY;
	camera.position.z = mouseX;
	// render();


	var time = Date.now() * 0.0005;
	// modelたちにアニメーションをつける ------------------------------
	for (var i = 0; i < AMOUNT_OF_MODEL; i++) {
		var model = modelArr[i];

		//泳ぐ速度
		model.position.z += 1 + (model.speed);
		//横の揺れ
		model.position.x += Math.sin(time * (0.7 + model.randSeed / 3)) * 0.5;
		model.position.y += (Math.random(0.5, 1));
		//上下回転
		// model.rotation.x = (Math.PI / 100) * Math.sin(time * 6 + model.speed * 100);
		//横回転
		// model.rotation.y = (Math.PI / 20) * Math.sin(time * 20 + model.speed * 100);
		// 一定値超えると、初期に戻る
		if (model.position.z > WORLD_SIZE / 2) {
			model.position.x = (Math.random() - 0.5) * WORLD_SIZE / 2;
			model.position.y = (Math.random() - 0.5) * WORLD_SIZE / 2;
			model.position.z = -1 * WORLD_SIZE / 2;
		}
	}

	// var model = modelArr[i];
	// obj = new THREE.Object3D();
	// model.position.x += 0.01;
	// カメラコントローラーを更新
	renderer.render(scene, camera);
	camera.lookAt(scene.position);
	// 背景色
	scene.background = new THREE.Color(0xffffff);
	frameCount += 1;
	console.log("animate render " + frameCount);
	render();
}

function render() {
	container.appendChild(renderer.domElement);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	window.addEventListener('resize', onWindowResize, false);
}