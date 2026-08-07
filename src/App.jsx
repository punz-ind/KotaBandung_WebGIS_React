import { MapContainer, TileLayer } from "react-leaflet";

const app = () => {
  return (
    <div>
      <div>
        <MapContainer
          center={[-6.916050781414965, 107.6281649298608]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-[990px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default app;
