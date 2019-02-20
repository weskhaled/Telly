<template>
  <section class="">  
    <div class="hello">
      <!-- Use the svg -->
      <svg width="100vw" height="calc(100vh - 50px)" @mousedown="onClick">
        <g>
          <polyline :points="points" stroke="orange" fill="transparent" :stroke-width="swidth"></polyline>
          <circle class="point" v-for="(point, index) in stats" :key="index" :cx="point.x" :cy="point.y" @mousedown="startMove($event,index)" @touchstart.prevent="startMove($event,index)" r="5" stroke="transparent" fill="red" stroke-width="0"/>
        </g>
      </svg>
      <!-- controls -->
      <form id="newstart">
        <input name="thickness" v-model="swidth">
        <button @click="start" :disabled="!closed">Start</button>
      </form>
    </div>
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
      swidth: "2",
      stats: [],
      closed: false
    }
  },
  computed: {
    // a computed property for the polygon's points
    points: function () {
      return this.stats.map(function (stat, i) {
        return stat.x + ' ' + stat.y
      }).join(' ')
    }
  },
  methods: {
    start(e) {
      e.preventDefault()
      this.closed = false
      this.stats = []
    },
    onClick(e) {
      if(!this.closed) {
        if (this.stats.length > 3) {
          if(
            Math.abs(this.stats[0].x - e.clientX) < 5 &&
            Math.abs(this.stats[0].y - e.clientY) < 5
          ) {
            console.log('close this ...')
            this.closed = true
            this.stats.push({ x: this.stats[0].x, y: this.stats[0].y })
          } else {
            this.stats.push({ x: e.clientX, y: e.clientY })
          }
        } else {
          this.stats.push({ x: e.clientX, y: e.clientY })
        }
      }
    },
    startMove: function startMove(evt,index) {
      let self = this
      let touch = evt.type === "touchstart";
			if (!touch && evt.button !== 0) return;
			let events = touch ? {
				move: "touchmove",
        stop: "touchend" 
      } :
			{
				move: "mousemove",
        stop: "mouseup" 
      };

      let elem = evt.currentTarget.closest("svg");
      let moveFn = function moveFn(evt) {
        self.stats[index].x = evt.clientX
        self.stats[index].y = evt.clientY
        // test if last or the first
        if(index === 0 || index === self.stats.length-1) {
          self.stats[0].x = evt.clientX
          self.stats[0].y = evt.clientY
          self.stats[self.stats.length-1].x = evt.clientX
          self.stats[self.stats.length-1].y = evt.clientY
        }
      };
			let stopFn = function stopFn(evt) {
				elem.removeEventListener(events.move, moveFn);
				elem.removeEventListener(events.stop, stopFn);
			};
			elem.addEventListener(events.move, moveFn);
			elem.addEventListener(events.stop, stopFn);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
  background: white;
}
polygon {
    fill: transparent;
    opacity: .75;
		stroke: #00aaff;
		stroke-width: 4px;
}
.point:hover {
  cursor: pointer;
}
input,button {
  color: black
}
form {
  text-align: center;
}
</style>