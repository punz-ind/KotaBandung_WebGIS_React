import L from "leaflet";
import {
  LayersControl,
  MapContainer,
  TileLayer,
  GeoJSON,
  LayerGroup,
} from "react-leaflet";
import dataKotaBandung from "../../assets/data/Adm_Kota_Bandung.json";
import dataSekolahDasar from "../../assets/data/point/SD_KotaBandung.json";
import dataSekolahMenengahPertama from "../../assets/data/point/SMP_KotaBandung.json";
// import { useState } from "react";

const acuanDensitas = (densitas) => {
  return densitas <= 8118
    ? "#4ade80"
    : densitas > 8118 && densitas <= 13501
      ? "#facc15"
      : densitas > 13501 && densitas <= 20960
        ? "#f97316"
        : densitas > 20960
          ? "#dc2626"
          : "#000";
};

const MapComponent = () => {
  // const [OpenSidebar, setOpenSidebar] = useState(false);

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
    const luasWilayah = feature.properties.LuasKm2;
    const densitas = feature.properties.Densitas;
    const populasi = feature.properties.Populasi;
    const keterangan = feature.properties.Keterangan;
    layer.bindPopup(
      `<strong>Kecamatan:</strong> ${kecamatan}<br/>
      <strong>Luas Wilayah:</strong> ${luasWilayah.toLocaleString("id-ID")} km²<br/>
      <strong>Densitas:</strong> ${densitas.toLocaleString("id-ID")} jiwa/km²<br/>
      <strong>Populasi:</strong> ${populasi.toLocaleString("id-ID")} jiwa<br/>
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

  const customIconSD = L.icon({
    iconUrl:
      "https://www.flaticon.com/free-icon/map-marker_4890457?term=school+marker&page=1&position=10&origin=search&related_id=4890457",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -34],
  });

  const customIconSMP = L.icon({
    iconUrl:
      "https://www.flaticon.com/free-icon/education_8996828?term=school+marker&page=1&position=24&origin=search&related_id=8996828",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -34],
  });

  const onEachSD = (feature, layer) => {
    const npsn = feature.properties.npsn;
    const namaSekolah = feature.properties.nama_sekol;
    const statusSekolah = feature.properties.status_sek;
    const alamat = feature.properties.alamat;
    const telepon = feature.properties.no_telepon;
    layer.bindPopup(
      `<strong>NPSN:</strong> ${npsn}<br/>
      <strong>Nama Sekolah:</strong> ${namaSekolah}<br/>
      <strong>Status Sekolah:</strong> ${statusSekolah}<br/>
      <strong>Alamat:</strong> ${alamat}<br/>
      <strong>Telepon:</strong> ${telepon}`,
    );
  };
  const onEachSMP = (feature, layer) => {
    const npsn = feature.properties.npsn;
    const namaSekolah = feature.properties.nama_sekol;
    const statusSekolah = feature.properties.status_sek;
    const alamat = feature.properties.alamat;
    const telepon = feature.properties.no_telepon;
    layer.bindPopup(
      `<strong>NPSN:</strong> ${npsn}<br/>
      <strong>Nama Sekolah:</strong> ${namaSekolah}<br/>
      <strong>Status Sekolah:</strong> ${statusSekolah}<br/>
      <strong>Alamat:</strong> ${alamat}<br/>
      <strong>Telepon:</strong> ${telepon}`,
    );
  };

  return (
    <div>
      <div>
        <MapContainer
          center={[-6.9047876606406975, 107.63103959941472]}
          zoom={13}
          // scrollWheelZoom={false}
          className="w-full h-[960px] border border-gray-500 rounded-lg"
        >
          <LayersControl position="topright">
            <LayerGroup>
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
            </LayerGroup>
            <LayerGroup>
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
              <LayersControl.Overlay name="Sekolah Dasar (SD)">
                <GeoJSON
                  icon={customIconSD}
                  data={dataSekolahDasar}
                  onEachFeature={onEachSD}
                />
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Sekolah Menengah Pertama (SMP)">
                <GeoJSON
                  icon={customIconSMP}
                  data={dataSekolahMenengahPertama}
                  onEachFeature={onEachSMP}
                />
              </LayersControl.Overlay>
            </LayerGroup>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
