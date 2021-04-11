import L from 'leaflet'
import GeolocationPin from '../../../img/pin/geolocation.svg'

const GeolocationIcon = L.icon({
  iconUrl: GeolocationPin,
  iconRetinaUrl: GeolocationPin,
  iconAnchor: null,
  popupAnchor: [0,0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: 38,
});

export default GeolocationIcon