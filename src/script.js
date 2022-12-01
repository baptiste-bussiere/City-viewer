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
camera.position.set(8.363739556300711, 8.888755738980052, 15.84417501945494)

gsap.to(camera.position, {
    x: 8.36349557081933,
    y: 8.888496437822567,
    z: 4.175258497858339,
    delay: 2,
    duration: 2,
    ease: "ease.out"
})

scene.add(camera)

/**         CONTROLS           **/


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.minDistance = 5
controls.maxDistance = 50

controls.mouseButtons = {
    MIDDLE: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.PAN,
    LEFT: THREE.MOUSE.PAN,

}
controls.addEventListener('change', function() {
        //...
        this.target.x = 0;
        this.target.y = 0;
        camera.position.x = 8.36349557081933;
        camera.position.y = 8.888496437822567;
        controls.minDistance = 0
        controls.maxDistance = 20


    })
    // console.log(controls)
controls.update();



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
    controls.update()

    renderer.render(scene, camera)
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    window.requestAnimationFrame(tick)
}

tick()