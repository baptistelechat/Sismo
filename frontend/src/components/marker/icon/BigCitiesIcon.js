import L from 'leaflet'
import DefaultPin from '../../../img/pin/pinDefault.svg'

const BigCitiesIcon = L.icon({
  iconUrl: DefaultPin,
  iconRetinaUrl: DefaultPin,
  iconAnchor: null,
  popupAnchor: [0,-15],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: 30,
});

export default BigCitiesIcon