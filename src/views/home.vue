<template>
  <div class="home">
    <AppMap
      :stands="standsButtons"
      :markers="markers"
      engine="yandex"
      @changeBounds="onChangeBounds"
    />
  </div>
</template>

<script>
import AppMap from '@/components/AppMap/index.vue'

export default {
  name: 'PageHome',
  components: { AppMap },
  data () {
    return {
      standsButtons: [
        {
          id: 'node',
          title: 'Узел связи'
        },
        {
          id: 'rack',
          title: 'Опора'
        }
      ],
      markers: []
    }
  },
  methods: {
    markerAdapter (data) {
      return data.map((item) => ({
        id: item.id,
        address: item.address,
        coordinates: item.coordinates.map((i) => Number(i)),
        createdAt: item.date_add,
        nodeType: {
          id: item.node_type.id,
          ico: item.node_type.ico
        }
      }))
    },
    async onChangeBounds ({ southWest, northEast, zoom }) {
      if (!southWest) { throw new Error('аргумент southWest не передан.') }
      if (!northEast) { throw new Error('аргумент northEast не передан.') }
      if (!zoom) { throw new Error('аргумент zoom не передан.') }
      if (zoom < 15) { return }

      const result = []
      const body = {
        south_west: southWest,
        north_east: northEast
      }

      const res = await this.$api.objects.stands(body)
      const total = res?.data?.total
      const limit = 500
      const promiseArr = []

      for (let i = 0; i < Math.ceil(total / limit); i++) {
        promiseArr[i] = this.$api.objects.stands({
          ...body,
          limit,
          offset: i * limit
        })
      }

      let allMarkersFromApi
      try {
        this.$store.commit('loading/setLoad', true)
        allMarkersFromApi = await Promise.all(promiseArr)
      } catch (e) {
        console.log(e)
      } finally {
        this.$store.commit('loading/setLoad', false)
      }

      allMarkersFromApi.forEach((i) => {
        const nodes = i.data?.nodes ?? []
        result.push(...nodes)
      })

      this.markers = this.markerAdapter(result)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
}
</style>
