import L from 'leaflet'
import LocationPin from '../../../img/pin/location.svg'

const DefaultIcon = L.icon({
  iconUrl: LocationPin,
  iconRetinaUrl: LocationPin,
  iconAnchor: null,
  popupAnchor: [0,0],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: 38,
});

export default DefaultIcon