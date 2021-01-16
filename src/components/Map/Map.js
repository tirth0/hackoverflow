import React, { useState, useEffect, useRef } from 'react';
import styles from './Map.module.css';
// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import {transform,fromLonLat} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import {circular} from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import Control from 'ol/control/Control';
import BingMaps from 'ol/source/BingMaps';
import { noAuto } from '@fortawesome/fontawesome-svg-core';
import { PostAdd } from '@material-ui/icons';


const post = async (e) => {
  e.preventDefault();
   const state={
    name:e.target.name.value,
    email:e.target.email.value,
    phone:e.target.phone.value, 
    address:e.target.address.value,
    latitude:e.target.lat.value,
    longitude:e.target.lon.value,
  };
  console.log(state);
   fetch('https://hackoverflow-backend-api.herokuapp.com/api/places',{
     method:'POST',
     body:state
   });
}
const Form = () => <div><form method="post" onSubmit={post}>
                <label htmlFor='name'><b>Full Name:</b></label>
                <input type="text" id="name" name="name" />
                <label htmlFor='email'><b>Email:</b></label>
                <input type="email" id="email" />
                <label htmlFor="phone"><b>Phone no:</b></label>
                <input type="text" id="phone" />
                <label htmlFor="address"><b>Address:</b></label>
                <input type="text" id="address" placeholder="Street address,P.O.box and Colony name " />
                <label htmlFor="img"><b>Image(less than 250kb):</b></label>
                <input type="file" id="img" accept="image/*" />
                <input type="checkbox" id="manually" />
                <label htmlFor="manually" className="manual">Select latitude and longitude manually</label>
                <br/>
                <label htmlFor="lat" className="lat">latitude:</label>
                <input type="text" id="lat" />
                <label htmlFor="lon" className="lon">longitude:</label>
                <input type="text" id="lon" />
                <input type="submit" className="final"/>
              </form>
              </div>;

const MapWrapper = ()=>{
    const [center,setCenter] = useState([0,0]);
    const [zoom,setZoom] = useState(1);
    
    const olMap = new Map({
        layers: [
            new TileLayer({
              source: new BingMaps({
                  key : 'AsQblU0RiCtFTCZqCy95v6Ax4YOunThhOO8RIsowcDuVQjBLJqZ37dYAwo4VRe_Z',
                  imagerySet : 'RoadOnDemand',
                  maxZoom : 19
              }),
            }) ],
          target: null,
          view: new View({
            center: center,
            zoom: zoom,
            extent : [8622096.75805907,1441340.8001343308,8658939.390685353,1472267.5601899377]
          }),
    });

    useEffect(()=>{
        olMap.setTarget("map");
        const source = new VectorSource();
        const layer = new VectorLayer({
                source: source
        });
        olMap.addLayer(layer);
        navigator.geolocation.watchPosition(function(pos) {
            const coords = [pos.coords.longitude, pos.coords.latitude];
            const accuracy = circular(coords, pos.coords.accuracy);
            source.clear(true);
            source.addFeatures([
              new Feature(accuracy.transform('EPSG:4326', olMap.getView().getProjection())),
              new Feature(new Point(fromLonLat(coords)))
            ]);
          }, function(error) {
            alert(`ERROR: ${error.message}`);
          }, {
            enableHighAccuracy: true
          });
          const locate = document.getElementById('locator');
            locate.className = `ol-control ol-unselectable ${styles.locate}`;
            locate.innerHTML = '<button title="Locate me">◎</button>';
            locate.addEventListener('click', function() {
            if (!source.isEmpty()) {
                olMap.getView().fit(source.getExtent(), {
                maxZoom: 18,
                duration: 500
                });
            }
            });
            olMap.addControl(new Control({
            element: locate
            }));
    });

    return (
        <div id="map" className={styles.map}>
            <div id="locator" className={`ol-control ol-unselectable ${styles.locate}`}>
                <button title="Locate me">◎</button>
            </div>
              <Form />
        </div>
    );
}

export default MapWrapper;























// function MapWrapper(props) {

//   // set intial state
//   const [ map, setMap ] = useState()
//   const [ featuresLayer, setFeaturesLayer ] = useState()
//   const [ selectedCoord , setSelectedCoord ] = useState()

//   // pull refs
//   const mapElement = useRef()
  
//   // create state ref that can be accessed in OpenLayers onclick callback function
//   //  https://stackoverflow.com/a/60643670
//   const mapRef = useRef()
//   mapRef.current = map

//   // initialize map on first render - logic formerly put into componentDidMount
//   useEffect( () => {

//     // create and add vector source layer
//     const initalFeaturesLayer = new VectorLayer({
//       source: new VectorSource()
//     })

//     // create map
//     const initialMap = new Map({
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }) ],
//         target: 'map',
//         view: new View({
//           center: [0, 0],
//           zoom: 2,
//         }),
//       })

//     // set map onclick handler
//     initialMap.on('click', handleMapClick)

//     // save map and vector layer references to state
//     setMap(initialMap)
//     setFeaturesLayer(initalFeaturesLayer)

//   },[])

//   // update map if features prop changes - logic formerly put into componentDidUpdate
//   useEffect( () => {

//     if (props.features.length) { // may be null on first render

//       // set features to map
//       featuresLayer.setSource(
//         new VectorSource({
//           features: props.features // make sure features is an array
//         })
//       )

//       // fit map to feature extent (with 100px of padding)
//       map.getView().fit(featuresLayer.getSource().getExtent(), {
//         padding: [100,100,100,100]
//       })

//     }

//   },[props.features])

//   // map click handler
//   const handleMapClick = (event) => {

//     // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
//     //  https://stackoverflow.com/a/60643670
//     const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

//     // transform coord to EPSG 4326 standard Lat Long
//     const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

//     // set React state
//     setSelectedCoord( transormedCoord )

//     console.log(transormedCoord)
    
//   }

//   // render component
//   return (      
//     <div ref={mapElement} className="map-container"></div>
//   ) 

// }

// export default MapWrapper
