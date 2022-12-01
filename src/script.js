import './style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'


/**  ANIMATION JAVASCRIPT HTML **/



/**          DEBUG            **/
// const gui = new dat.GUI()





/**          CANVAS           **/
const canvas = document.querySelector('canvas.webgl')


/**          SCENE            **/
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xA3CBF0)


/**          MODELS           **/

const gltfLoader = new GLTFLoader()

/**          FOG           **/


scene.fog = new THREE.Fog(0xA3CBF0, 1, 55)

let city;
gltfLoader.load('/models/city.glb', function(gltf) {

    city = gltf.scene;
    city.position.set(0, 0, 0)
    city.scale.set(0.002, 0.002, 0.002)
    scene.add(city)

});


/**          CURSOR            **/

const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5,
        cursor.y = event.clientY / sizes.height - 0.5
})



/**          LIGHTS            **/

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7
directionalLight.position.set(-5, 5, 0)
scene.add(directionalLight)



/**           SIZES            **/

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**         CAMERA           **/

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 300)
camera.position.set(-3.1344434287761174, 35.61318630220131, -17.164244115216007)
camera.rotation.set(-1.5707637386522009, 0.006314101144838717, 1.565635169388754)

fuel.addEventListener('click', (event) => {
    gsap.to(camera.position, {
        x: -10.60576727274495,
        y: 3.1500936330358433,
        z: -2.418615355162772,

        duration: 2,
        ease: "ease.out"
    })
    gsap.to(camera.rotation, {
        x: -0.12229966674702857,
        y: -0.008075243019697208,
        z: -0.0009925419663029135,

        duration: 2,
        ease: "ease.out"
    })
})


mairie.addEventListener('click', (event) => {
    gsap.to(camera.position, {
        x: 1.7879509192452288,
        y: 1.637495616942835,
        z: -5.363401171464483,

        duration: 2,
        ease: "ease.out"
    })
    gsap.to(camera.rotation, {
        x: -2.7855957544329244,
        y: 0.6050937607641439,
        z: 2.9331481207075396,

        duration: 2,
        ease: "ease.out"
    })
})

café.addEventListener('click', (event) => {
    gsap.to(camera.position, {
        x: 3.9718524336087224,
        y: 1.2287404597161091,
        z: -12.640244432403364,

        duration: 2,
        ease: "ease.out"
    })
    gsap.to(camera.rotation, {
        x: -2.8970181740996277,
        y: 0.5251691674504091,
        z: 3.01711501630454,

        duration: 2,
        ease: "ease.out"
    })
})
tower.addEventListener('click', (event) => {
    gsap.to(camera.position, {
        x: -9.599353747091273,
        y: 10.029345816230858,
        z: -22.40341490807383,

        duration: 2,
        ease: "ease.out"
    })
    gsap.to(camera.rotation, {
        x: -2.7511303922391805,
        y: -0.9903221192317821,
        z: -2.810114604285475,

        duration: 2,
        ease: "ease.out"
    })
})



gsap.to(camera.position, {
    x: 7.79687319869411,
    y: 6.743318843667277,
    z: 6.816896596854721,
    delay: 2,
    duration: 2,
    ease: "ease.out"
})
gsap.to(camera.rotation, {
    x: -0.8412666094474257,
    y: 0.7301410072952138,
    z: 0.6409345831603537,
    delay: 2,
    duration: 2,
    ease: "ease.out"
})

scene.add(camera)

/**         CONTROLS           **/


const controls = new OrbitControls(camera, canvas)
    // controls.minDistance = 5
    // controls.maxDistance = 50

// controls.mouseButtons = {
//     MIDDLE: THREE.MOUSE.PAN,
//     RIGHT: THREE.MOUSE.PAN,
//     LEFT: THREE.MOUSE.PAN,

// }
// controls.addEventListener('change', function() {
//         //...
//         this.target.x = 0;
//         this.target.y = 0;
//         camera.position.x = 8.36349557081933;
//         camera.position.y = 8.888496437822567;
//         controls.minDistance = 0
//         controls.maxDistance = 20


//     })
//     // console.log(controls)

/**
 
Parking
2.945902790204737 
3.9630560597746265
-5.426542401135024

Coffee
3.8386888200956095
3.976644801814266
-13.745782488006322

Parc
-13.887493184195705
2.8765530981423977
-2.5429518630095647


fuel
-11.633360813687354
5.524411115810286
-2.900834488995944

Building 
-9.121905378595544
9.07944765305346
-22.307811087868842


batiment
-5.66157072086008
4.301987690067882
-35.33656624580196


foret
6.539492795534702
1.9331334100635145
9.462600229923043

**/

/**        RENDERER         **/

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**        RESIZE         **/

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**        ANIMATE          **/

const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    if (city) {


    }

    console.log(camera.position);
    console.log(camera.rotation)
    renderer.render(scene, camera)
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    window.requestAnimationFrame(tick)
}

tick()