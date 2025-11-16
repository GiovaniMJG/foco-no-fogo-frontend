// frontend/src/components/MapaDenuncias.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl:
 "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
 iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
 shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
const CENTRO = [-22.7391, -47.3311];
export default function MapaDenuncias({ denuncias }) {
 const validas = denuncias
 .map((d) => ({
 ...d,
 latitude:
 typeof d.latitude === "number"
 ? d.latitude
 : parseFloat(d.latitude),
 longitude:
 typeof d.longitude === "number"
 ? d.longitude
 : parseFloat(d.longitude),
 }))
 .filter(
 (d) =>
 !isNaN(d.latitude) &&
 !isNaN(d.longitude)
 );
 return (
 <MapContainer
 center={CENTRO}
 zoom={13}
 scrollWheelZoom={false}
 style={{ width: "100%", height: "100%" }}
 >
 <TileLayer
 attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>'
 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
 />
 {validas.map((d) => (
 <Marker key={d.id} position={[d.latitude, d.longitude]}>
 <Popup>
 <strong>{d.tipo}</strong>
 <br />
 {d.localizacao}
 <br />
 {d.data
 ? new Date(d.data).toLocaleDateString("pt-BR")
 : "Sem data"}
 </Popup>
 </Marker>
 ))}
 </MapContainer>
 );
}
