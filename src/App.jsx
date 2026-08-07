import { LayersControl, MapContainer, TileLayer } from "react-leaflet";

const app = () => {
  return (
    <div>
      <div>
        <MapContainer
          center={[-6.916050781414965, 107.6281649298608]}
          zoom={13}
          // scrollWheelZoom={false}
          className="w-full h-[990px]"
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Satellite">
              <TileLayer
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
                url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};

export default app;
