<template>
  <div
    class="root"
  >
    <ElDropdown
      trigger="click"
      class="maps-dropdown"
    >
      <ElButton type="primary">
        Dropdown List<ElIcon class="el-icon--right"><ArrowDown /></ElIcon>
      </ElButton>
      <template #dropdown>
        <ElDropdownItem
          v-for="item of mapsInfo"
          :key="item.id"
          @click="localEngine = item.id"
        >
          {{ item.title }}
        </ElDropdownItem>
      </template>
    </ElDropdown>

    <div
      class="map"
      ref="map"
    />
  </div>
</template>

<script>
import { mapsInfo } from './core/constants'
import eventEmitter from './core/EventEmitter'
/* COMPONENTS */
import { ArrowDown } from '@element-plus/icons-vue'

let MAP = null

export default {
  name: 'AppMap',
  components: {
    ArrowDown
  },
  props: {
    // stands: {
    //   type: Array,
    //   default: () => []
    // },
    /* Тип карты */
    engine: {
      type: String,
      default: 'yandex'
    },
    /* Zoom карты */
    zoom: {
      type: Number,
      default: 15
    },
    /* Center coords */
    center: {
      type: Object,
      default: () => ({ lat: 42.98333628823631, lng: 47.47039355820175 })
    },
    /* Метки на карте */
    markers: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      mapsInfo,
      localEngine: this.engine
    }
  },
  computed: {
    /* MetaData о текущей выбранной карте */
    currentMapMetaData () {
      const current = mapsInfo.find(item => item.id === this.localEngine)
      return current ?? null
    },
    /* Аргумент конструктора класса карты */
    mapClassAgs () {
      return {
        apiKey: this.currentMapMetaData?.apiKey,
        center: this.center,
        zoom: this.zoom,
        container: this.$refs.map
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const MapClass = this?.currentMapMetaData?.constructor
      if (!MapClass) { return }

      MAP = new MapClass(this.mapClassAgs) // создал инстанс карты
      await MAP?.create() // создал карту
      this.initMarkers() // отрисовываю маркера
      this.initEventEmitter()
    },
    initMarkers () {
      MAP?.marker?.draw(this.markers)
    },
    initEventEmitter () {
      eventEmitter.on('changeBounds', event => {
        this.$emit('changeBounds', event)
      })
    }
  },
  watch: {
    /**
     * Срабатывает при смене карты
     * */
    localEngine () {
      MAP?.destroy() // Удаляю старую карту
      this.init() // Создаю новую
    },
    markers: 'initMarkers'
  }
}
</script>

<style lang="scss" scoped>
.root {
  position: relative;
  width: 100%;
  height: 100%;

  .panel {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
  }

  .map {
    width: 100%;
    height: 100%;
  }

  .maps-dropdown {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
  }
}
</style>
