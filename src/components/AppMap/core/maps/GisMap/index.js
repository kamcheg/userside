/* eslint-disable no-undef */

import Marker from './Marker'
import eventEmitter from '../../EventEmitter'

class GisMap {
  map = null
  marker = null

  constructor (options) {
    this.options = options ?? {}
  }

  async create () {
    this.map = await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://mapgl.2gis.com/api/js/v1')
      document.head.appendChild(script)

      script.onload = () => {
        const { lat, lng } = this.options.center

        const map = new mapgl.Map(this.options.container, {
          key: this.options.apiKey,
          center: [lng, lat],
          zoom: this.options.zoom,
          zoomControl: false
        })

        resolve(map)
      }
    })

    this.afterCreate()
  }

  afterCreate () {
    this.marker = new Marker(this.map)

    this.map.on('idle', e => {
      const b = this.map.getBounds()
      const data = {
        northEast: b.northEast.reverse(),
        southWest: b.southWest.reverse()
      }
      eventEmitter.emit('changeBounds', data)
    })
  }

  destroy () {
    this.map?.destroy()
  }
}

export default GisMap
