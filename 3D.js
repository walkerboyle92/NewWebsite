import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRencderer.js';


//setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;

const controls = new OrbitControls( camera, renderer.domElement );

window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}



// Materials
const video = document.getElementById( 'video' );
const TVmat1 = new THREE.TextureLoader().load('img/TV.png');
const TVmat2 = new THREE.TextureLoader().load('img/TV_sides.png');
const vhs1 = new THREE.TextureLoader().load('img/tape1.png');
const vhs2 = new THREE.TextureLoader().load('img/tape2.png');
const vhs3 = new THREE.TextureLoader().load('img/tape3.png');
const vhs4 = new THREE.TextureLoader().load('img/tape4.png');
const vhs5 = new THREE.TextureLoader().load('img/tape5.png');
const vhs6 = new THREE.TextureLoader().load('img/tape6.png');

const mats = [vhs1,vhs2,vhs3,vhs4,vhs5,vhs6, TVmat1, TVmat2];
mats.forEach(changeColorSpace);
function changeColorSpace (mat){
    mat.colorSpace = THREE.SRGBColorSpace;
}

const TVmat = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/TV_sides.png')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/TV_sides.png')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/TV_sides.png')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/TV_sides.png')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/TV.png')}),
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('img/TV_sides.png')}),
];


//VHS sizes
const vhs_size =  new THREE.BoxGeometry(2, 1, .2);

//box1 
const box1 = new THREE.Mesh(vhs_size,  new THREE.MeshBasicMaterial({map: vhs1}));
box1.position.set(-3.5,1,0);
box1.rotation.set(0, (5/180)* Math.PI, (-15/180)* Math.PI);
box1.name = "TriangleLady";

//box2
const box2 = new THREE.Mesh(vhs_size,  new THREE.MeshBasicMaterial({map: vhs2}));
box2.position.set(-3,-1.5,0);
box2.rotation.set(0, (-10/180)* Math.PI, (25/180)* Math.PI);
box2.name = "NbdyCrs";

//box3
const box3 = new THREE.Mesh(vhs_size,  new THREE.MeshBasicMaterial({map: vhs3}));
box3.position.set(3.5,-2,0);
box3.rotation.set(0, (10/180)* Math.PI, (-15/180)* Math.PI);
box3.name = "FullCycle";

//box4
const box4 = new THREE.Mesh(vhs_size,  new THREE.MeshBasicMaterial({map: vhs4}));
box4.position.set(3.5,1,0);
box4.rotation.set(0, (-10/180)* Math.PI, (25/180)* Math.PI);
box4.name = "bumper";

//box5
const box5= new THREE.Mesh(vhs_size,  new THREE.MeshBasicMaterial({map: vhs5}));
box5.position.set(0,2.5,0);
box5.rotation.set(0, (5/180)* Math.PI, (-15/180)* Math.PI);
box5.name = "NewStrat";

//box5
const box6= new THREE.Mesh(vhs_size,  new THREE.MeshBasicMaterial({map: vhs6}));
box6.position.set(0,-3,0);
box6.rotation.set(0, (10/180)* Math.PI, (25/180)* Math.PI);
box6.name = "interview";

//TV
const TVGeometry = new THREE.BoxGeometry(3, 2, 2);
const TV = new THREE.Mesh(TVGeometry,TVmat);
TV.name = "TV";

//rotation & adding to scene
const vhs_tapes = [box1, box2, box3, box4, box5, box6];
scene.add(TV);

//stars
var stars=[]
function addSphere(){

    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
    for ( var z= -1000; z < 1000; z+=20 ) {

        // Make a sphere (exactly the same as before). 
        var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var sphere = new THREE.Mesh(geometry, material)

        // This time we give the sphere random x and y positions between -500 and 500
        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;

        // Then set the z position to where it is in the loop (distance of camera)
        sphere.position.z = z;

        // scale it up a bit
        sphere.scale.x = sphere.scale.y = 2;

        //add the sphere to the scene
        scene.add( sphere );

        //finally push it to the stars array 
        stars.push(sphere); 
    }
}
//animation
function animate() {

vhs_tapes.forEach(tape => {
    tape.rotation.z += 0.01;
    TV.add(tape);
  });

	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


addSphere();

//raycaster
const raycaster = new THREE.Raycaster();

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event){

    const coords = new THREE.Vector2(
        (event.clientX / renderer.domElement.clientWidth) *2-1,
        -((event.clientY / renderer.domElement.clientHeight) *2-1),
    );
raycaster.setFromCamera(coords, camera);


const intersections = raycaster.intersectObjects(scene.children, true);
if(intersections.length > 0){
    const selectedObject = intersections[0].object.name;
    const link='https://walkerboyle.com/Videos/'+ selectedObject;
     window.open(link);
        console.log(selectedObject);
        
}
let INTERSECTED;
document.addEventListener('mousemove', onDocumentMouseMove );
function onDocumentMouseMove( event ) {

    event.preventDefault();
    const mouse = new THREE.Vector2();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  

    raycaster.setFromCamera( mouse, camera );

const intersects = raycaster.intersectObjects( TV.children, false);
const hoverObject = intersects[0].object.name

if ( intersects.length > 0 ) {

    const targetDistance = intersects[ 0 ].distance;
    const objectHovered = intersects[0].object;
   

    if ( INTERSECTED != intersects[0].object ) {

        console.log(objectHovered) 
     hoverAnimation(objectHovered);
        
      }
     else {


        INTERSECTED = null;

    }

}
}
};

function hoverAnimation(name){
    name.rotation.z += 0.05;

}
