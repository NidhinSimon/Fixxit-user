import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import Spinner from "../Employee/Spinner";
mapboxgl.accessToken =
  "pk.eyJ1IjoibmlkaGluc2ltb24iLCJhIjoiY2xtcnRnMXRuMDl6djJrcW05b2EzZHk3dSJ9.mBz6318PCWKLjMF-TxK-IQ";

const Map = ({ clicked, handlemap }) => {
  const [useraddress, setuseraddress] = useState(null);
  const [map, setMap] = useState(null);
  const [userLocationMarker, setUserLocationMarker] = useState(null);

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [isLoadingSelectAddress, setIsLoadingSelectAddress] = useState(false);

  useEffect(() => {
    if (clicked) {
      setIsLoadingMap(true);

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            map.setCenter([longitude, latitude]);
            addMarker(longitude, latitude);

            setLongitude(longitude);
            console.log(longitude, "longitude");
            setLatitude(latitude);
            console.log(latitude, "latitude");
            setIsLoadingMap(false);

            axios
              .get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
              )
              .then((response) => {
                const place = response.data.features[0];
                console.log(place, ">>>>>>");
                const formattedAddress = place.place_name;
                console.log(formattedAddress, ">>>>>");

                handlemap(longitude, latitude, formattedAddress);
                console.log(useraddress, ">>>>>.");
              })
              .catch((error) => {
                toast.error("Error reverse geocoding:", error);
              });

            console.log(useraddress, ">>>>>>>");
          },
          (error) => {
            toast.error("Error getting user location:", error);
            setIsLoadingMap(false);
          }
        );
      } else {
        toast.error("Geolocation is not available in this browser.");
        setIsLoadingMap(false);
      }
    }
  }, [clicked]);

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.580643, 12.972442],
        zoom: 15,
      });

      setMap(newMap);

      newMap.on("load", () => {
        setIsLoadingMap(false);
      });

      newMap.addControl(new mapboxgl.NavigationControl());
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  const addMarker = (lng, lat) => {
    if (userLocationMarker) {
      userLocationMarker.remove();
    }
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    setUserLocationMarker(marker);
  };

  return (
    <div>
      <div
        className="relative"
        id="map"
        style={{ width: "100%", height: "300px" }}
      ></div>
      <button className="text-red-500 w-32 absolute inset-x-0 bottom-32 ">
        Use My Location
      </button>
    </div>
  );
};

export default Map;
