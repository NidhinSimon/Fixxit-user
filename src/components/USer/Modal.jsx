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

const Modal = ({ closemodal, handlelocation }) => {
  const [map, setMap] = useState(null);
  const [userLocationMarker, setUserLocationMarker] = useState(null);
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [isLoadingSelectAddress, setIsLoadingSelectAddress] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const { userInfo } = useSelector((state) => state.user);
  const userid = userInfo.userExists._id;

  const handleSubmit = async (address, longitude, latitude) => {
    if (address.trim() === "") {
      Swal.fire(
        "Address Field Empty?",
        "Please choose Your location",
        "question"
      );
      return;
    }

    setIsLoadingSelectAddress(true);

    const res = await axios.post("https://fixxit-server-1.onrender.com/users/saveaddress", {
      userid,
      address,
      longitude,
      latitude,
    });
    handlelocation({ address, longitude, latitude });

    setIsLoadingSelectAddress(false);

    if (res.data.message === "user address saved") {
      Swal.fire(
        "Address saved",
        "You can now proceed to select a slot",
        "success"
      );
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      // Handle empty search term
      return;
    }

    setIsLoadingMap(true);

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchTerm
        )}.json?access_token=${mapboxgl.accessToken}`
      )
      .then((response) => {
        const features = response.data.features;
        if (features && features.length > 0) {
          const [lng, lat] = features[0].center;
          map.setCenter([lng, lat]);
          addMarker(lng, lat);
          reversegeocode(lng, lat);
          setLongitude(lng);
          setLatitude(lat);
          setIsLoadingMap(false);
        } else {
          console.error("No results found for the search term");
          setIsLoadingMap(false);
        }
        setSuggestions(features);
      })
      .catch((error) => {
        console.error("Error searching for the address:", error);
        setIsLoadingMap(false);
      });
  };

  const handleSuggestionClick = (suggestion) => {
    const [lng, lat] = suggestion.center;
    map.setCenter([lng, lat]);
    map.setZoom(14); 
    addMarker(lng, lat);
    reversegeocode(lng, lat);
    setLongitude(lng);
    setLatitude(lat);
    setSearchTerm(suggestion.place_name); 
    setSuggestions([]);
  };

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [75.862640, 12.250400],
        zoom: 17,
      });

      setMap(newMap);

      newMap.on("load", () => {
        setIsLoadingMap(false); // Map has loaded, clear loading state
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

    const marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    setLongitude(lng);
    setLatitude(lat);

    marker.on("dragend", () => {
      const newLngLat = marker.getLngLat();
      setLongitude(newLngLat.lng);
      setLatitude(newLngLat.lat);
      reversegeocode(newLngLat.lng, newLngLat.lat);
    });

    setUserLocationMarker(marker);
  };

  const handleUseMyLocationClick = () => {
    setIsLoadingMap(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          map.setCenter([longitude, latitude]);
          addMarker(longitude, latitude);
          reversegeocode(longitude, latitude);
          setLongitude(longitude);
          setLatitude(latitude);
          setIsLoadingMap(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setIsLoadingMap(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
      setIsLoadingMap(false);
    }
  };

  const reversegeocode = (lng, lat) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyA04gExT_3ABGyN3KoRT70m1PdQ0RDWWVA`
      )
      .then((response) => {
        const results = response.data.results;
        if (results && results.length > 0) {
          const address = results[0].formatted_address;
          setAddress(address);
        } else {
          console.error("No results found for reverse geocoding");
        }
      })
      .catch((error) => {
        console.error("Error reverse geocoding:", error);
      });
  };

  return (
    <div>
      <Toaster />
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm mt-16">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-4/5 h-4/5 flex">
          <div
            className="relative"
            id="map"
            style={{ width: "100%", height: "500px" }}
          >
            {isLoadingMap ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Spinner />
              </div>
            ) : null}
          </div>

          <div className="w-4/5">
            <input
              type="text"
              placeholder="Search for an address"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              className="bg-gray-100 text-black w-full p-2 rounded-md"
            />
            <div className="mt-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-2 border-b cursor-pointer bg-slate-600 text-white hover:bg-gray-400"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.place_name}
                </div>
              ))}
            </div>
            <button
              onClick={handleSearch}
              className="text-white bg-blue-500 p-2 mt-2 rounded-md"
            >
              Search
            </button>
            <button
              className="text-white bg-red-500 w-32 rounded-md mt-5 flex justify-center"
              onClick={handleUseMyLocationClick}
              disabled={isLoadingSelectAddress}
            >
              Use My Location
            </button>
            <h1 className="text-black text-xl font-semibold">Address</h1>
            <textarea
              className="bg-gray-100 text-black w-full h-20 p-2 rounded-md"
              value={address}
              readOnly
            />

            <button
              onClick={() => handleSubmit(address, longitude, latitude)}
              className="bg-blue-500 text-white p-2 mt-2 rounded-md"
              disabled={isLoadingSelectAddress}
            >
              {isLoadingSelectAddress ? (
                <Spinner size={24} color="black" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
        <div className="relative bottom-72">
          <button
            onClick={closemodal}
            className="text-black w-14 h-14 rounded-full bg-red-500"
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
