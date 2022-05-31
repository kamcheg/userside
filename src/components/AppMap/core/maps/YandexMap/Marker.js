/* eslint-disable no-undef */

class Marker {
  constructor (map) {
    this.map = map
    this.items = {}
    this.clusterer = new ymaps.Clusterer()
    this.map.geoObjects.add(this.clusterer)
  }

  draw (markersData) {
    this.removeUnnecessary(markersData)
    markersData.forEach(markerData => {
      const id = markerData.id

      if (!this.items[id]) {
        const coords = markerData.coordinates
        const image = markerData.nodeType.ico

        const marker = this.createMarker(coords, image)

        // this.map.geoObjects.add(marker)
        this.items[id] = marker
        this.clusterer.add(marker)
      }
    })

    // this.clusterer.add(Object.values(this.items))
  }

  createMarker (coords, image) {
    const size = 14

    return new ymaps.Placemark(coords, {}, {
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: image,
      iconImageSize: [size, size],
      iconImageOffset: [-size / 2, -size / 2]
    })
  }

  removeUnnecessary (newMarkerData) {
    for (const key in this.items) {
      const marker = this.items[key]

      const exists = !!newMarkerData.find(item => item.id === key)
      if (!exists) {
        this.clusterer.remove(marker)
        delete this.items[key]
      }
    }
  }

  removeAll () {
    for (const key in this.items) {
      const marker = this.items[key]
      this.clusterer.remove(marker)
      delete this.items[key]
    }
  }
}

export default Marker
