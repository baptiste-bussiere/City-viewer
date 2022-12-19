import './style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import * as dat from 'lil-gui'
import { floorPowerOfTwo } from 'three/src/math/MathUtils'


/**  ANIMATION JAVASCRIPT HTML **/



/**          DEBUG            **/
const gui = new dat.GUI()





/**          CANVAS           **/
const canvas = document.querySelector('canvas.webgl')


/**          SCENE            **/
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xA3CBF0)


/**          MODELS           **/

const gltfLoader = new GLTFLoader()

/**          FOG           **/


// scene.fog = new THREE.Fog(0xA3CBF0, 1, 25)

let city;
let mixer = null;
// gltfLoader.load('/models/house.glb', function(gltf) {
//     city = gltf.scene;
//     scene.add(city)

//     const mixer = new THREE.AnimationMixer(city)
//     const action = mixer.clipAction(gltf.animations[0])
//     console.log(action)
//         // action.play()

//     city.scale.set(0.02, 0.02, 0.02)
//     city.position.set(0, 0, 0)

// });

gltfLoader.load(
    '/models/race.glb',
    (gltf) => {
        city = gltf.scene;
        city.scale.set(0.025, 0.025, 0.025)
        scene.add(city)

        // Animation
        mixer = new THREE.AnimationMixer(city)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
        console.log(gltf.scene)

    }

)

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


scene.add(camera)

/**         CONTROLS           **/


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minDistance = 5
controls.maxDistance = 25

// window.addEventListener('')
// controls.mouseButtons = {
//         MIDDLE: THREE.MOUSE.PAN,
//         RIGHT: THREE.MOUSE.PAN,
//         LEFT: THREE.MOUSE.PAN,

//     }
// controls.addEventListener('change', function() {
//     this.target.x = 0;
//     this.target.y = 0;
//     this.target.z = 0;

// })


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
const previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime

    if (city) {

    }
    if (mixer !== null) {
        mixer.update(0.025)
    }


    // flow.style.width = elapsedTime * elapsedTime + 'em'
    const tempV = new THREE.Vector3();
    tempV.project(camera)

    const x = (tempV.x * .5 + .5) * canvas.clientWidth;
    const y = (tempV.y * -.5 + .5) * canvas.clientHeight;

    flow.style.transform = `translate(-25%, -25%) translate(${x}px,${y}px)`

    renderer.render(scene, camera)
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    controls.update()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    window.requestAnimationFrame(tick)
}

tick()