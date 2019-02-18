<template>
  <section class="">
      <div class="hello"><div id="container" @mousemove="onMouseMove" @mousedown="onClick"></div></div>
  </section>
</template>

<script>

export default {
  // middleware: ['auth'],
  layout: 'layout_user',
  components: {
  },
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      myMesh: null,
      count: 0,
      mouse: new THREE.Vector3(),
      line: null,
      positions: null,
      linePositions: null,
      geometry: null,
      lineGeometry: null,
      material: null,
      lineMaterial: null,
      canvas: new THREE.Mesh(),
      raycaster: null,
      start_point: {
        x: null,
        y: null,
      },
      points: [],
      close_it: false,
      dragControls: null
    }
  },
  computed: {},
  mounted() {
    // let self = this
    this.initScene();
    this.animate();
  },
  methods: {
    initScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100);

        this.camera.position.z = 1;

        this.raycaster = new THREE.Raycaster();

        let container = document.getElementById("container");
        // renderer
        // this.renderer = new THREE.WebGLRenderer();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // this.renderer = new THREE.SVGRenderer();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
        this.initCanvas();
    },
    /* Initialize the Canvas so we can raycast the mouse click and mouse move */
    initCanvas() {
        this.geometry = new THREE.PlaneGeometry(7, 7, 1, 0);
        this.material = new THREE.MeshBasicMaterial({
            visible: false
        });

        this.canvas = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.canvas);

        this.addLineAndMesh();
    },
    addLineAndMesh() {

      this.linePositions = new THREE.BufferAttribute(new Float32Array(2500 * 3), 3).setDynamic(true);

      // geometry
      this.lineGeometry = new THREE.BufferGeometry();
      this.lineGeometry.addAttribute('position', this.linePositions);

      // material
      this.lineMaterial = new THREE.LineBasicMaterial({
          color: 0xff0000,
          linewidth: 10
      });

      this.material = new THREE.MeshLambertMaterial({
          color: 0xff0000,
          side: THREE.DoubleSide,
          opacity: 0.6
      });

      this.myMesh = new THREE.Mesh(this.lineGeometry, this.material);
      // this.scene.add(this.myMesh);

      // line
      
      this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);
      this.line.scale.setScalar( 1 )
      this.scene.add(this.line);
    },
    setPositions(pos, isUpdate) {
        const index = isUpdate ? this.count - 1  : this.count;
        this.linePositions.setXYZ(index, pos.x, pos.y, 0);

        this.linePositions.needsUpdate = true;
        this.line.frustumCulled = false;
        // this.myMesh.frustumCulled = !isUpdate;
    },
    getMousePosition(e) {
        // e.preventDefault();
        // let mouse = {};
        this.mouse.x = (e.offsetX / this.renderer.domElement.width) * 2 - 1;
        this.mouse.y = -(e.offsetY / this.renderer.domElement.height) * 2 + 1;
        this.mouse.z = 0;
        // console.log(this.mouse)

        this.raycaster.setFromCamera(this.mouse, this.camera);

        let intersects = this.raycaster.intersectObjects([this.canvas]);

        if (intersects.length > 0 && intersects[0]) {
            this.mouse = intersects[0].point;
        }
        return {x:this.mouse.x,y: this.mouse.y};
    },
    onClick: function(e) {
      let self = this;
      this.dragControls = new THREE.DragControls( this.points, this.camera, this.renderer.domElement );
      if (this.close_it) {      
        this.dragControls.addEventListener( 'dragstart', function (e) {
          console.log(e)
          self.close_it = true
          // controls.enabled = false;
        } );
        this.dragControls.addEventListener( 'dragend', function (e) {
          console.log(e)
          self.close_it = false
          // this.dragControls = null
          // controls.enabled = true;
        } );
        this.close_it = false
        return
      }
        // this.dragControls = null
        this.close_it = false
        let pos = this.getMousePosition(e);
        console.log(pos)
        if (this.count === 0) {
          this.setPositions(pos, false);
          this.start_point.x = pos.x
          this.start_point.y = pos.y
          this.points.map((m)=>{
            this.scene.remove(m);
          })
          this.points = []
          this.count++;
        }

        if (this.count > 3) {
          console.log('strat point :',parseFloat(this.start_point.x).toFixed(4))
          console.log('new pos: ', parseFloat(pos.x).toFixed(4))
          if(
            Math.abs(parseFloat(this.start_point.x).toFixed(4) - parseFloat(pos.x).toFixed(4)) < 0.05 &&
            Math.abs(parseFloat(this.start_point.y).toFixed(4) - parseFloat(pos.y).toFixed(4)) < 0.05
            ) {
            console.log('must close it')
            this.close_it = true
            this.setPositions(this.start_point, true);
            this.count = 0;
            this.dragControls.addEventListener( 'dragstart', function (e) {
              console.log(e)
              this.close_it = true
              // controls.enabled = false;
            } );
            this.dragControls.addEventListener( 'dragend', function (e) {
              console.log(e)
              this.close_it = false
              // controls.enabled = true;
            } );
            return
          }
        }

        this.setPositions(pos, false);
        this.count++;

        this.lineGeometry.setDrawRange(0, this.count);

        let geometry_1 = new THREE.SphereGeometry( 0.02, 0.02, 0 );
        let material_1 = new THREE.MeshBasicMaterial({
          color: 0x00aaff,
          side: THREE.DoubleSide,
          opacity: 0.6
        });

        let mesh_1 = new THREE.Mesh( geometry_1, material_1 );
        // mesh_1.position.set(pos.x, pos.y, 0);
        mesh_1.position.setX(pos.x);  
        mesh_1.position.setY(pos.y);
        this.points.push(mesh_1)
        this.scene.add( this.points[this.points.length - 1] );
      
    },
    onMouseMove(e) {
      const pos = this.getMousePosition(e);
      this.setPositions(pos, true);
    },
    animate() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
#container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>