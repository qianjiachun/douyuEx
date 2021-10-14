class PanoramaVideo {
	constructor(domContainer, domVideo) {
		this.domContainer = domContainer;
		this.domVideo = domVideo;
		this.camera = null;
		this.scene = null;
		this.renderer = null;

		this.isUserInteracting = false;
		this.lon = 0;
		this.lat = 0;
		this.phi = 0;
		this.theta = 0;
		this.distance = 50;
		this.onPointerDownPointerX = 0;
		this.onPointerDownPointerY = 0;
		this.onPointerDownLon = 0;
		this.onPointerDownLat = 0;
		this.onDocumentMouseDown = this.onDocumentMouseDown.bind(this);
		this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
		this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
		this.onDocumentMouseWheel = this.onDocumentMouseWheel.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.init();
	}

	init() {
		var container, mesh

		container = this.domContainer;

		this.camera = new THREE.PerspectiveCamera(
			75,
			this.domVideo.videoWidth / this.domVideo.videoHeight,
			1,
			1100
		)
		this.camera.target = new THREE.Vector3(0, 0, 0)

		this.scene = new THREE.Scene()

		var geometry = new THREE.SphereBufferGeometry(500, 60, 40)
		// invert the geometry on the x-axis so that all of the faces point inward
		geometry.scale(-1, 1, 1)


		var texture = new THREE.VideoTexture(
			this.domVideo
		)
		texture.minFilter = THREE.LinearFilter;
		var material = new THREE.MeshBasicMaterial({
			map: texture
		})

		mesh = new THREE.Mesh(geometry, material)

		this.scene.add(mesh)

		this.renderer = new THREE.WebGLRenderer()
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.domVideo.clientWidth, this.domVideo.clientHeight)
		container.appendChild(this.renderer.domElement)


		container.addEventListener(
			'mousedown',
			this.onDocumentMouseDown,
			false
		)
		container.addEventListener(
			'mousemove',
			this.onDocumentMouseMove,
			false
		)
		container.addEventListener('mouseup', this.onDocumentMouseUp, false)
		container.addEventListener('wheel', this.onDocumentMouseWheel, false)


		window.addEventListener('resize', this.onWindowResize, false)
	}

	onWindowResize() {
		this.camera.aspect = this.domVideo.videoWidth / this.domVideo.videoHeight
		this.camera.updateProjectionMatrix()

		this.renderer.setSize(this.domVideo.clientWidth, this.domVideo.clientHeight)
	}

	onDocumentMouseDown(event) {
		// event.preventDefault()
		this.isUserInteracting = true

		this.onPointerDownPointerX = event.clientX
		this.onPointerDownPointerY = event.clientY
		
		this.onPointerDownLon = this.lon
		this.onPointerDownLat = this.lat
		
	}

	onDocumentMouseMove(event) {
		if (this.isUserInteracting === true) {
			
			this.lon =
				(this.onPointerDownPointerX - event.clientX) * 0.1 +
				this.onPointerDownLon
			this.lat =
				(event.clientY - this.onPointerDownPointerY) * 0.1 +
				this.onPointerDownLat
		}
	}

	onDocumentMouseUp() {
		this.isUserInteracting = false
	}

	onDocumentMouseWheel(event) {
		this.distance += event.deltaY * 0.05

		this.distance = THREE.Math.clamp(this.distance, 1, 50)
	}

	// animate() {
	// 	requestAnimationFrame(this.animate)
	// 	this.update()
	// }

	update() {
		this.lat = Math.max(-85, Math.min(85, this.lat))
		this.phi = THREE.Math.degToRad(90 - this.lat)
		this.theta = THREE.Math.degToRad(this.lon)

		this.camera.position.x = this.distance * Math.sin(this.phi) * Math.cos(this.theta)
		this.camera.position.y = this.distance * Math.cos(this.phi)
		this.camera.position.z = this.distance * Math.sin(this.phi) * Math.sin(this.theta)

		this.camera.lookAt(this.camera.target)
		this.renderer.render(this.scene, this.camera)
	}
}