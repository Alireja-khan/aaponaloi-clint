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

const FadeInOnView = ({ children, direction = 'up', delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });

  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, delay },
      });
    } else {
      controls.start({
        opacity: 0,
        y: direction === 'up' ? 50 : -50,
      });
    }
  }, [controls, inView, direction, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 50 : -50 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

const position = [24.8977, 91.8712]; // Sylhet city center

const LocationSection = () => {
  return (
    <section id="location" className="w-full">
      {/* Section Title */}
      <FadeInOnView direction="up" delay={0}>
        <div className="text-center max-w-4xl mx-auto px-4 pt-12 pb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3 flex-wrap">
            <FaMapMarkerAlt className="text-secondary text-4xl sm:text-5xl" />
            How to Reach <span className="text-secondary ml-1">Aaponaloi</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Aaponaloi is located in the heart of Sylhet city, with access to markets,
            transport hubs, and nearby landmarks, offering both convenience and comfort.
          </p>


        </div>
      </FadeInOnView>

      {/* Map with Overlay Info Card */}
      <div className=' border-5 border-primary '>
        <FadeInOnView direction="up" delay={0.2}>
          <div className="relative w-full h-[450px]  sm:h-[500px] lg:h-[600px]">
            {/* Map Container */}
            <MapContainer
              center={position}
              zoom={14}
              scrollWheelZoom={false}
              className="h-full w-full  z-0"
            >
              <EnableScrollZoom />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  Aaponaloi Apartment <br /> Ambarkhana, Sylhet.
                </Popup>
              </Marker>
            </MapContainer>

            {/* Info Card - Now properly positioned above the map */}
            <div className="absolute  bottom-20 left-20 right-4 sm:right-auto sm:max-w-md bg-primary/30 backdrop-blur-sm rounded-xl shadow-2xl p-6 z-[1000] border border-gray-200">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-2xl text-red-500 mt-1 flex-shrink-0" />
                  <p className="text-lg">Ambarkhana Point, Sylhet, Bangladesh</p>
                </li>
                <li className="flex items-start gap-4">
                  <FaCar className="text-2xl text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-lg">12 min from Osmani International Airport</p>
                </li>
                <li className="flex items-start gap-4">
                  <FaBus className="text-2xl text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-lg">All major bus stops within 1.5km</p>
                </li>
                <li className="flex items-start gap-4">
                  <FaTrain className="text-2xl text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-lg">15 min from Sylhet Railway Station</p>
                </li>
                <li className="flex items-start gap-4">
                  <FaRoute className="text-2xl text-orange-500 mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    Ride-sharing apps (Uber, Pathao) fully accessible
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </FadeInOnView>
      </div>
    </section>
  );
};

export default LocationSection;