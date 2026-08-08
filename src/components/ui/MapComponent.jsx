import { LayersControl, MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import dataKotaBandung from "../../assets/data/Adm_Kota_Bandung.json";

const acuanDensitas = (densitas) => {
  return densitas <= 11908
    ? "#4ade80"
    : densitas > 11908 && densitas <= 18830
      ? "#facc15"
      : densitas > 18830 && densitas <= 25751
        ? "#f97316"
        : densitas > 25751
          ? "#dc2626"
          : "#000";
};

const MapComponent = () => {
  const styleKecamatan = {
    fillColor: "#2196F3",
    weight: 1,
    color: "white",
    fillOpacity: 0.5,
  };

  const styleDensitas = (feature) => {
    const densitas = feature.properties.Densitas;
    return {
      fillColor: acuanDensitas(densitas),
      weight: 1,
      color: "white",
      fillOpacity: 0.5,
    };
  };

  const onEachKecamatan = (feature, layer) => {
    const kecamatan = feature.properties.WADMKC;
    const luasWilayah = feature.properties.LuasKm2;
    layer.bindPopup(`<strong>Kecamatan:</strong> ${kecamatan}<br/>
      <strong>Luas Wilayah:</strong> ${luasWilayah.toLocaleString("id-ID")} km²`);
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          fillColor: "#0D47A1",
          fillOpacity: 0.7,
        });
      },
      mouseout: (e) => {
        e.target.setStyle(styleKecamatan);
      },
    });
  };

  const onEachDensitas = (feature, layer) => {
    const kecamatan = feature.properties.WADMKC;
    const densitas = feature.properties.Densitas;
    const keterangan = feature.properties.Keterangan;
    layer.bindPopup(
      `<strong>Kecamatan:</strong> ${kecamatan}<br/>
      <strong>Densitas:</strong> ${densitas.toLocaleString("id-ID")} jiwa/km²<br/>
      <strong>Keterangan:</strong> ${keterangan}`,
    );
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          fillOpacity: 0.7,
        });
      },
      mouseout: (e) => {
        e.target.setStyle(styleDensitas(feature));
      },
    });
  };

  return (
    <div>
      <div>
        <MapContainer
          center={[-6.9047876606406975, 107.63103959941472]}
          zoom={13}
          // scrollWheelZoom={false}
          className="w-full h-[790px] border border-gray-500 rounded-lg"
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
            <LayersControl.Overlay
              name="Wilayah Administrasi Kota Bandung"
              checked
            >
              <GeoJSON
                data={dataKotaBandung}
                onEachFeature={onEachKecamatan}
                style={styleKecamatan}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Densitas Penduduk">
              <GeoJSON
                data={dataKotaBandung}
                onEachFeature={onEachDensitas}
                style={styleDensitas}
              />
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
