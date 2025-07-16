// LocationSection.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import {
  FaMapMarkerAlt,
  FaRoute,
  FaBus,
  FaTrain,
  FaCar,
} from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import linePerson from '../../assets/images/leaning.png';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const customIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const EnableScrollZoom = () => {
  const map = useMap();

  React.useEffect(() => {
    const enableZoom = () => map.scrollWheelZoom.enable();
    map.on('click', enableZoom);
    return () => map.off('click', enableZoom);
  }, [map]);

  return null;
};

const FadeInOnView = ({ children, direction = 'left', delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, delay },
      });
    } else {
      controls.start({
        opacity: 0,
        x: direction === 'left' ? -50 : 50,
      });
    }
  }, [controls, inView, direction, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

const position = [24.8977, 91.8712]; // Sylhet city center

const LocationSection = () => {
  return (
    <section id="location" className="pb-20 pt-10 px-4 md:px-12 lg:px-30">
      {/* Section Title & Description */}
      <FadeInOnView direction="up" delay={0}>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3 flex-wrap">
            <FaMapMarkerAlt className="text-secondary text-4xl sm:text-5xl" />
            How to Reach <span className="text-secondary ml-1">Aaponaloi</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg font-light">
            Aaponaloi is located in Sylhet city, offering quick access to
            markets, transport hubs, and city landmarks.
          </p>
        </div>
      </FadeInOnView>

      {/* Info & Map Grid */}
      <div className="max-w-6x mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Info */}
        <FadeInOnView direction="left" delay={0.1}>
          <ul className="space-y-6 text-gray-700 mt-4 sm:mt-6">
            <li className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl sm:text-4xl text-red-500" />
              <p className="text-lg sm:text-xl">Ambarkhana Point, Sylhet, Bangladesh</p>
            </li>
            <li className="flex items-start gap-4">
              <FaCar className="text-2xl sm:text-4xl text-green-600" />
              <p className="text-lg sm:text-xl">12 min from Osmani International Airport</p>
            </li>
            <li className="flex items-start gap-4">
              <FaBus className="text-2xl sm:text-4xl text-blue-600" />
              <p className="text-lg sm:text-xl">All major bus stops within 1.5km</p>
            </li>
            <li className="flex items-start gap-4">
              <FaTrain className="text-2xl sm:text-4xl text-purple-600" />
              <p className="text-lg sm:text-xl">15 min from Sylhet Railway Station</p>
            </li>
            <li className="flex items-start gap-4">
              <FaRoute className="text-2xl sm:text-4xl text-orange-500" />
              <p className="text-lg sm:text-xl">
                Ride-sharing apps (Uber, Pathao) fully accessible
              </p>
            </li>
          </ul>
        </FadeInOnView>

        {/* Right Map */}
        <FadeInOnView direction="right" delay={0.2}>
          <div className="relative w-full h-80 sm:h-96">
            {/* Map */}
            <div className="w-full sm:w-4/5 h-full rounded-2xl overflow-hidden shadow-lg border mx-auto">
              <MapContainer
                center={position}
                zoom={14}
                scrollWheelZoom={false}
                className="h-full w-full z-10"
              >
                <EnableScrollZoom />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={position} icon={customIcon}>
                  <Popup>Aaponaloi Apartment<br /> Ambarkhana, Sylhet.</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Line Person (hidden on small devices) */}
            <img
              src={linePerson}
              alt="Leaning Person"
              className="hidden lg:block absolute -right-62 top-9 -translate-y-1/2 h-175 z-20 object-contain pointer-events-none"
            />

          </div>
        </FadeInOnView>
      </div>
    </section>
  );
};

export default LocationSection;
