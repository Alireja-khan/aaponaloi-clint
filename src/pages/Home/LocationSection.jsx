// LocationSection.jsx
import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { FaMapMarkerAlt, FaRoute, FaBus, FaTrain, FaCar } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import linePerson from '../../assets/line-art/line-person.png'

const customIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const EnableScrollZoom = () => {
  const map = useMap();

  useEffect(() => {
    const enableZoom = () => map.scrollWheelZoom.enable();
    map.on('click', enableZoom);
    return () => map.off('click', enableZoom);
  }, [map]);

  return null;
};

const LocationSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const position = [24.8977, 91.8712]; // Sylhet city center

  return (
    <section
      id='location'
      className="py-20 px-6 md:px-20 ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Info */}
        <div data-aos="fade-right">
          <h2 className="text-4xl flex md:text-5xl font-bold text-gray-800 mb-6">
            <span>🗺️</span> <div><span>How to Reach</span> <span className="text-primary">Aaponaloi</span></div>
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Aaponaloi is located in Sylhet city, offering quick access to markets, transport hubs, and city landmarks.
          </p>
          <ul className="space-y-3 text-gray-700 mt-6">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-red-500" />
              Ambarkhana Point, Sylhet, Bangladesh
            </li>
            <li className="flex items-center gap-3">
              <FaCar className="text-green-600" />
              12 min from Osmani International Airport
            </li>
            <li className="flex items-center gap-3">
              <FaBus className="text-blue-600" />
              All major bus stops within 1.5km
            </li>
            <li className="flex items-center gap-3">
              <FaTrain className="text-purple-600" />
              15 min from Sylhet Railway Station
            </li>
            <li className="flex items-center gap-3">
              <FaRoute className="text-orange-500" />
              Ride-sharing apps (Uber, Pathao) fully accessible
            </li>
          </ul>
        </div>


        {/* Right Map */}

        <div className="relative w-full h-80" data-aos="fade-left">
          {/* Map */}
          <div className="w-4/5 h-full rounded-2xl overflow-hidden shadow-lg border">
            <MapContainer
              center={position}
              zoom={14}
              scrollWheelZoom={false}
              className="h-full w-full z-10"
            >
              <EnableScrollZoom />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  Aaponaloi Apartment<br /> Ambarkhana, Sylhet.
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Line Person leaning on map */}
          <img
            src={linePerson}
            alt="Leaning Person"
            className="absolute -right-48 top-32 -translate-y-1/2 h-150 z-20 object-contain pointer-events-none"
          />
        </div>



      </div>
    </section>
  );
};

export default LocationSection;
