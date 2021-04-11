import L from 'leaflet'
import FlagPin from '../../../img/pin/flag.svg'

const SelectedIcon = L.icon({
  iconUrl: FlagPin,
  iconRetinaUrl: FlagPin,
  iconAnchor: null,
  popupAnchor: [0,-15],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: 30,
});

export default SelectedIcon