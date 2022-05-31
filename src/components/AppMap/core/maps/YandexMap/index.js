/* eslint-disable no-undef */

import Marker from './Marker'
import eventEmitter from '../../EventEmitter'

class YandexMap {
  constructor (options) {
    this.options = options ?? {}
    this.map = null
    this.marker = null
  }

  async create () {
    this.map = await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.setAttribute('src', `https://api-maps.yandex.ru/2.1/?apikey=${this.options.apiKey}&lang=ru_RU`)
      document.head.append(script)

      script.onload = () => {
        ymaps.ready(() => {
          const { lat, lng } = this.options.center

          const map = new ymaps.Map(this.options.container, {
            center: [lat, lng],
            zoom: this.options.zoom,
            controls: []
          })

          resolve(map)
        })
      }
    })

    this.afterCreate()
  }

  afterCreate () {
    this.marker = new Marker(this.map)

    this.map.events.add('actionend', e => {
      const b = this.map.getBounds()
      const data = {
        northEast: b[1],
        southWest: b[0],
        zoom: e.originalEvent.map._zoom
      }
      eventEmitter.emit('changeBounds', data)
    })
  }

  destroy () {
    if (this.map) {
      this.map.destroy()
    }
  }
}

export default YandexMap
