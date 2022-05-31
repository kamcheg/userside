import YandexMap from './maps/YandexMap/index'
import GisMap from './maps/GisMap/index'

export const mapsInfo = [
  {
    id: 'yandex',
    title: 'Яндекс',
    apiKey: process.env.VUE_APP_YANDEX_API_KEY,
    constructor: YandexMap
  },
  {
    id: 'gis',
    title: '2Gis',
    apiKey: process.env.VUE_APP_DBGIS_API_KEY,
    constructor: GisMap
  }
]
