var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

chunks = getChunks(5, 5);

chunks.forEach(e => {
	blocks = e.getLocalBlocks();
	blocks.forEach(b => {
		scene.add(b.getMesh());
	});
});


var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add( spotLight );

camera.position.set( 70, 50, 70 );
camera.lookAt( 0, 0, 0 );


let floatX = 70;
let floatZ = 70;
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	camera.position.set( floatX, 50, floatZ );
	floatX -= 1;
	floatZ -= 1;
}
animate();