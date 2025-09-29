// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Layers, MapPin, Satellite } from 'lucide-react';

// interface GeoJSONFeature {
//   type: 'Feature';
//   properties: {
//     claimant_name?: string;
//     status?: string;
//     village?: string;
//     claim_id?: string;
//   };
//   geometry: any;
// }

// interface MapViewerProps {
//   villageId?: string;
//   claimId?: string;
//   center?: [number, number];
//   zoom?: number;
//   height?: string;
//   showControls?: boolean;
// }

// const MapViewer: React.FC<MapViewerProps> = ({
//   villageId,
//   claimId,
//   center = [20.25, 81.5], // Chhattisgarh coordinates
//   zoom = 8,
//   height = "500px",
//   showControls = true
// }) => {
//   const [geoData, setGeoData] = useState<GeoJSONFeature[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [mapLayer, setMapLayer] = useState<'osm' | 'satellite'>('osm');

//   useEffect(() => {
//     loadGeoData();
//   }, [villageId, claimId]);

//   const loadGeoData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       let url = 'http://localhost:8000';
      
//       if (claimId) {
//         url += `/gis/shapefile/claim/${claimId}`;
//       } else if (villageId) {
//         url += `/gis/shapefile/${villageId}`;
//       } else {
//         // Load sample data for demonstration
//         setGeoData(generateSampleGeoJSON());
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(url);
//       setGeoData(Array.isArray(response.data) ? response.data : [response.data]);
//     } catch (err) {
//       console.warn('Backend not available, using sample data');
//       setGeoData(generateSampleGeoJSON());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateSampleGeoJSON = (): GeoJSONFeature[] => {
//     return [
//       {
//         type: 'Feature',
//         properties: {
//           claimant_name: 'Ram Singh',
//           status: 'Approved',
//           village: 'Kanker',
//           claim_id: 'FRA001'
//         },
//         geometry: {
//           type: 'Polygon',
//           coordinates: [[
//             [81.2, 20.2],
//             [81.3, 20.2],
//             [81.3, 20.3],
//             [81.2, 20.3],
//             [81.2, 20.2]
//           ]]
//         }
//       },
//       {
//         type: 'Feature',
//         properties: {
//           claimant_name: 'Sita Devi',
//           status: 'Pending',
//           village: 'Bastar',
//           claim_id: 'FRA002'
//         },
//         geometry: {
//           type: 'Polygon',
//           coordinates: [[
//             [81.4, 20.1],
//             [81.5, 20.1],
//             [81.5, 20.2],
//             [81.4, 20.2],
//             [81.4, 20.1]
//           ]]
//         }
//       },
//       {
//         type: 'Feature',
//         properties: {
//           claimant_name: 'Gita Patel',
//           status: 'Rejected',
//           village: 'Raipur',
//           claim_id: 'FRA003'
//         },
//         geometry: {
//           type: 'Polygon',
//           coordinates: [[
//             [81.6, 20.3],
//             [81.7, 20.3],
//             [81.7, 20.4],
//             [81.6, 20.4],
//             [81.6, 20.3]
//           ]]
//         }
//       }
//     ];
//   };

//   const getStatusColor = (status?: string) => {
//     switch (status?.toLowerCase()) {
//       case 'approved': return 'bg-success text-success-foreground';
//       case 'pending': return 'bg-warning text-warning-foreground';
//       case 'rejected': return 'bg-destructive text-destructive-foreground';
//       default: return 'bg-muted text-muted-foreground';
//     }
//   };

//   return (
//     <Card className="overflow-hidden">
//       {showControls && (
//         <div className="p-3 sm:p-4 border-b border-border">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//             <h3 className="text-lg font-semibold">Interactive Map Viewer</h3>
//             <div className="flex items-center gap-2">
//               <Button
//                 onClick={() => setMapLayer(mapLayer === 'osm' ? 'satellite' : 'osm')}
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center space-x-2"
//               >
//                 <Satellite className="h-4 w-4" />
//                 <span className="hidden sm:inline">{mapLayer === 'osm' ? 'Satellite' : 'Street'}</span>
//               </Button>
//               <Button
//                 onClick={loadGeoData}
//                 disabled={loading}
//                 size="sm"
//                 className="flex items-center space-x-2"
//               >
//                 <Layers className="h-4 w-4" />
//                 <span className="hidden sm:inline">{loading ? 'Loading...' : 'Refresh'}</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       <div style={{ height }} className="relative">
//         {/* Enhanced Interactive Map with Leaflet-like features */}
//         <div className="h-full w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
//           {/* Map Background Pattern */}
//           <div 
//             className="absolute inset-0 opacity-30"
//             style={{
//               backgroundImage: `
//                 radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)
//               `,
//               backgroundSize: '20px 20px'
//             }}
//           />
          
//           {/* Layer Toggle Info */}
//           <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs">
//             {mapLayer === 'osm' ? 'OpenStreetMap' : 'Satellite View'}
//           </div>
          
//           {/* Interactive Geographic Features */}
//           {geoData.map((feature, index) => (
//             <div
//               key={index}
//               className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
//               style={{
//                 left: `${25 + (index * 20) + Math.random() * 30}%`,
//                 top: `${20 + (index * 15) + Math.random() * 40}%`
//               }}
//             >
//               {/* Enhanced Polygon Representation */}
//               <div className={`
//                 relative transition-all duration-300 ease-in-out
//                 ${feature.properties.status?.toLowerCase() === 'approved' 
//                   ? 'w-20 h-16 bg-green-500/30 border-2 border-green-500 hover:bg-green-500/50' 
//                   : feature.properties.status?.toLowerCase() === 'pending'
//                   ? 'w-18 h-14 bg-yellow-500/30 border-2 border-yellow-500 hover:bg-yellow-500/50'
//                   : 'w-16 h-12 bg-red-500/30 border-2 border-red-500 hover:bg-red-500/50'
//                 }
//                 rounded-lg group-hover:scale-110 group-hover:shadow-xl
//                 before:absolute before:inset-0 before:bg-white/20 before:rounded-lg
//               `}>
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <MapPin className="h-6 w-6 text-white drop-shadow-lg" />
//                 </div>
                
//                 {/* Coordinate Grid Overlay */}
//                 <div className="absolute inset-0 opacity-20">
//                   <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-px">
//                     {Array.from({ length: 12 }).map((_, i) => (
//                       <div key={i} className="bg-white/30 rounded-[1px]" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Enhanced Popup Info Card */}
//               <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 group-hover:translate-y-1">
//                 <div className="bg-card border border-border rounded-lg shadow-2xl p-4 min-w-56 max-w-sm">
//                   <div className="space-y-3">
//                     <div className="flex items-center justify-between">
//                       <h4 className="font-semibold text-base">
//                         {feature.properties.claim_id || 'N/A'}
//                       </h4>
//                       <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(feature.properties.status)}`}>
//                         {feature.properties.status}
//                       </span>
//                     </div>
                    
//                     {feature.properties.claimant_name && (
//                       <div className="flex items-center space-x-2">
//                         <MapPin className="h-4 w-4 text-muted-foreground" />
//                         <div>
//                           <p className="text-xs text-muted-foreground font-medium">Claimant</p>
//                           <p className="text-sm">{feature.properties.claimant_name}</p>
//                         </div>
//                       </div>
//                     )}
                    
//                     {feature.properties.village && (
//                       <div className="flex items-center space-x-2">
//                         <Satellite className="h-4 w-4 text-muted-foreground" />
//                         <div>
//                           <p className="text-xs text-muted-foreground font-medium">Location</p>
//                           <p className="text-sm">{feature.properties.village}</p>
//                         </div>
//                       </div>
//                     )}
                    
//                     <div className="border-t pt-2">
//                       <p className="text-xs text-muted-foreground">
//                         Coordinates: {feature.geometry.coordinates[0][0].map((coord: number) => coord.toFixed(3)).join(', ')}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {/* Enhanced Navigation Controls */}
//           <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 space-y-2">
//             <Button size="sm" variant="ghost" className="w-8 h-8 p-0">+</Button>
//             <Button size="sm" variant="ghost" className="w-8 h-8 p-0">-</Button>
//           </div>
          
//           {/* Enhanced Legend */}
//           <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-xl max-w-[200px]">
//             <h4 className="font-semibold text-sm mb-3 flex items-center">
//               <Layers className="h-4 w-4 mr-2" />
//               Legend
//             </h4>
//             <div className="space-y-2 text-xs">
//               <div className="flex items-center space-x-3">
//                 <div className="w-4 h-3 rounded border-2 border-green-500 bg-green-500/30"></div>
//                 <span>Approved Claims</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-4 h-3 rounded border-2 border-yellow-500 bg-yellow-500/30"></div>
//                 <span>Pending Claims</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="w-4 h-3 rounded border-2 border-red-500 bg-red-500/30"></div>
//                 <span>Rejected Claims</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Map Attribution */}
//           <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/95 backdrop-blur-sm rounded px-3 py-2 border">
//             <div className="flex items-center space-x-2">
//               <Satellite className="h-3 w-3" />
//               <span>FRA Atlas • Interactive Map</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="p-4 bg-destructive/10 border-t border-destructive/20">
//           <p className="text-sm text-destructive">{error}</p>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default MapViewer;




// 2/


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Layers, MapPin, Satellite } from 'lucide-react';

// // Add Leaflet CSS dynamically if not loaded
// if (typeof window !== 'undefined') {
//   const leafletCSS = document.getElementById('leaflet-css');
//   if (!leafletCSS) {
//     const link = document.createElement('link');
//     link.id = 'leaflet-css';
//     link.rel = 'stylesheet';
//     link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css';
//     link.integrity = 'sha256-DB8v3KzrFPLNqiX8T5HyTzrZwcn/8p4C5G4x2+lYiVE=';
//     link.crossOrigin = 'anonymous';
//     document.head.appendChild(link);
//   }
// }

// interface GeoJSONFeature {
//   type: 'Feature';
//   properties: {
//     claimant_name?: string;
//     status?: string;
//     village?: string;
//     claim_id?: string;
//   };
//   geometry: any;
// }

// interface MapViewerProps {
//   villageId?: string;
//   claimId?: string;
//   center?: [number, number];
//   zoom?: number;
//   height?: string;
//   showControls?: boolean;
// }

// const MapViewer: React.FC<MapViewerProps> = ({
//   villageId,
//   claimId,
//   center = [20.25, 81.5], // Chhattisgarh coordinates
//   zoom = 8,
//   height = "500px",
//   showControls = true
// }) => {
//   const [geoData, setGeoData] = useState<GeoJSONFeature[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [mapLayer, setMapLayer] = useState<'osm' | 'satellite'>('osm');
//   const [mapReady, setMapReady] = useState(false);
//   const mapRef = useRef<HTMLDivElement>(null);
//   const mapInstanceRef = useRef<any>(null);
//   const layersRef = useRef<any[]>([]);

//   // Load GeoData
//   useEffect(() => {
//     loadGeoData();
//   }, [villageId, claimId]);

//   // Initialize map
//   useEffect(() => {
//     let mounted = true;

//     const initMap = async () => {
//       if (!mapRef.current || mapInstanceRef.current) return;

//       try {
//         // Wait for CSS to load
//         await new Promise(resolve => setTimeout(resolve, 100));

//         const L = (await import('leaflet')).default;
        
//         // Fix for marker icons in webpack
//         delete (L.Icon.Default.prototype as any)._getIconUrl;
//         L.Icon.Default.mergeOptions({
//           iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//           iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//           shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//         });

//         if (!mounted) return;

//         const map = L.map(mapRef.current, {
//           preferCanvas: true,
//           zoomControl: true
//         }).setView(center, zoom);
        
//         // OpenStreetMap tiles
//         const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '© OpenStreetMap contributors',
//           maxZoom: 19
//         });

//         // Satellite tiles
//         const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
//           attribution: '© Esri',
//           maxZoom: 19
//         });

//         osmLayer.addTo(map);

//         if (mounted) {
//           mapInstanceRef.current = map;
//           (map as any)._osmLayer = osmLayer;
//           (map as any)._satelliteLayer = satelliteLayer;
//           setMapReady(true);
//         }

//       } catch (err) {
//         console.error('Map initialization error:', err);
//         if (mounted) {
//           setError('Failed to initialize map');
//         }
//       }
//     };

//     if (typeof window !== 'undefined') {
//       initMap();
//     }

//     return () => {
//       mounted = false;
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [center, zoom]);

//   // Add data to map
//   useEffect(() => {
//     if (mapReady && mapInstanceRef.current && geoData.length > 0) {
//       addDataToMap();
//     }
//   }, [geoData, mapReady]);

//   // Switch map layers
//   useEffect(() => {
//     if (mapReady && mapInstanceRef.current) {
//       switchMapLayer();
//     }
//   }, [mapLayer, mapReady]);

//   const switchMapLayer = () => {
//     const map = mapInstanceRef.current;
//     const osmLayer = (map as any)._osmLayer;
//     const satelliteLayer = (map as any)._satelliteLayer;

//     if (mapLayer === 'satellite') {
//       if (map.hasLayer(osmLayer)) map.removeLayer(osmLayer);
//       if (!map.hasLayer(satelliteLayer)) map.addLayer(satelliteLayer);
//     } else {
//       if (map.hasLayer(satelliteLayer)) map.removeLayer(satelliteLayer);
//       if (!map.hasLayer(osmLayer)) map.addLayer(osmLayer);
//     }
//   };

//   const addDataToMap = async () => {
//     if (!mapInstanceRef.current) return;

//     try {
//       const L = (await import('leaflet')).default;
//       const map = mapInstanceRef.current;

//       // Clear existing layers
//       layersRef.current.forEach(layer => map.removeLayer(layer));
//       layersRef.current = [];

//       const allLayers: any[] = [];

//       geoData.forEach((feature) => {
//         if (!feature.geometry?.coordinates) return;

//         const colors = getStatusColor(feature.properties.status);
//         let layer;
        
//         if (feature.geometry.type === 'Polygon') {
//           const coordinates = feature.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
          
//           layer = L.polygon(coordinates, {
//             color: colors.border,
//             fillColor: colors.fill,
//             fillOpacity: 0.6,
//             weight: 2
//           });
//         }

//         if (layer) {
//           const popupContent = `
//             <div style="min-width: 200px; font-family: system-ui;">
//               <h4 style="margin: 0 0 10px 0; font-weight: bold;">${feature.properties.claim_id || 'N/A'}</h4>
//               ${feature.properties.status ? `<p><strong>Status:</strong> ${feature.properties.status}</p>` : ''}
//               ${feature.properties.claimant_name ? `<p><strong>Claimant:</strong> ${feature.properties.claimant_name}</p>` : ''}
//               ${feature.properties.village ? `<p><strong>Village:</strong> ${feature.properties.village}</p>` : ''}
//             </div>
//           `;
          
//           layer.bindPopup(popupContent);
//           layer.addTo(map);
//           layersRef.current.push(layer);
//           allLayers.push(layer);
//         }
//       });

//       // Fit bounds to show all features
//       if (allLayers.length > 0) {
//         const group = L.featureGroup(allLayers);
//         map.fitBounds(group.getBounds(), { padding: [20, 20] });
//       }

//     } catch (error) {
//       console.error('Error adding data to map:', error);
//     }
//   };

//   const loadGeoData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       let url = 'http://localhost:8000';
      
//       if (claimId) {
//         url += `/gis/shapefile/claim/${claimId}`;
//       } else if (villageId) {
//         url += `/gis/shapefile/${villageId}`;
//       } else {
//         setGeoData(generateSampleGeoJSON());
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(url);
//       setGeoData(Array.isArray(response.data) ? response.data : [response.data]);
//     } catch (err) {
//       console.warn('Backend not available, using sample data');
//       setGeoData(generateSampleGeoJSON());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateSampleGeoJSON = (): GeoJSONFeature[] => {
//     return [
//       {
//         type: 'Feature',
//         properties: {
//           claimant_name: 'Ram Singh',
//           status: 'Approved',
//           village: 'Kanker',
//           claim_id: 'FRA001'
//         },
//         geometry: {
//           type: 'Polygon',
//           coordinates: [[
//             [81.2, 20.2],
//             [81.3, 20.2],
//             [81.3, 20.3],
//             [81.2, 20.3],
//             [81.2, 20.2]
//           ]]
//         }
//       },
//       {
//         type: 'Feature',
//         properties: {
//           claimant_name: 'Sita Devi',
//           status: 'Pending',
//           village: 'Bastar',
//           claim_id: 'FRA002'
//         },
//         geometry: {
//           type: 'Polygon',
//           coordinates: [[
//             [81.4, 20.1],
//             [81.5, 20.1],
//             [81.5, 20.2],
//             [81.4, 20.2],
//             [81.4, 20.1]
//           ]]
//         }
//       },
//       {
//         type: 'Feature',
//         properties: {
//           claimant_name: 'Gita Patel',
//           status: 'Rejected',
//           village: 'Raipur',
//           claim_id: 'FRA003'
//         },
//         geometry: {
//           type: 'Polygon',
//           coordinates: [[
//             [81.6, 20.3],
//             [81.7, 20.3],
//             [81.7, 20.4],
//             [81.6, 20.4],
//             [81.6, 20.3]
//           ]]
//         }
//       }
//     ];
//   };

//   const getStatusColor = (status?: string) => {
//     switch (status?.toLowerCase()) {
//       case 'approved': 
//         return { fill: '#22c55e', border: '#16a34a' };
//       case 'pending': 
//         return { fill: '#eab308', border: '#ca8a04' };
//       case 'rejected': 
//         return { fill: '#ef4444', border: '#dc2626' };
//       default: 
//         return { fill: '#6b7280', border: '#4b5563' };
//     }
//   };

//   return (
//     <Card className="overflow-hidden">
//       {showControls && (
//         <div className="p-3 sm:p-4 border-b border-border">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//             <h3 className="text-lg font-semibold">Interactive Map Viewer</h3>
//             <div className="flex items-center gap-2">
//               <Button
//                 onClick={() => setMapLayer(mapLayer === 'osm' ? 'satellite' : 'osm')}
//                 variant="outline"
//                 size="sm"
//                 disabled={!mapReady}
//               >
//                 <Satellite className="h-4 w-4 mr-1" />
//                 <span className="hidden sm:inline">{mapLayer === 'osm' ? 'Satellite' : 'Street'}</span>
//               </Button>
//               <Button
//                 onClick={loadGeoData}
//                 disabled={loading}
//                 size="sm"
//               >
//                 <Layers className="h-4 w-4 mr-1" />
//                 <span className="hidden sm:inline">{loading ? 'Loading...' : 'Refresh'}</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       <div style={{ height }} className="relative">
//         {/* Map Container */}
//         <div 
//           ref={mapRef} 
//           className="w-full h-full"
//           style={{ 
//             minHeight: height,
//             background: '#f0f0f0',
//             position: 'relative'
//           }}
//         />
        
//         {/* Loading State */}
//         {(!mapReady || loading) && (
//           <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-[2000]">
//             <div className="bg-white rounded-lg p-6 shadow-lg border">
//               <div className="flex items-center space-x-3">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//                 <span className="text-sm font-medium">
//                   {!mapReady ? 'Loading map...' : 'Loading data...'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Simple Legend */}
//         {mapReady && (
//           <div className="absolute bottom-4 left-4 bg-white/95 border rounded-lg p-3 shadow-lg z-[1000]">
//             <h4 className="font-semibold text-sm mb-2">Legend</h4>
//             <div className="space-y-1 text-xs">
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-3 bg-green-500 border border-green-600 rounded"></div>
//                 <span>Approved</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-3 bg-yellow-500 border border-yellow-600 rounded"></div>
//                 <span>Pending</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-3 bg-red-500 border border-red-600 rounded"></div>
//                 <span>Rejected</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Debug Info */}
//         {process.env.NODE_ENV === 'development' && (
//           <div className="absolute top-4 right-4 bg-white/90 rounded p-2 text-xs z-[1000]">
//             <div>Map Ready: {mapReady ? '✅' : '❌'}</div>
//             <div>Features: {geoData.length}</div>
//             <div>Layer: {mapLayer}</div>
//           </div>
//         )}
//       </div>

//       {error && (
//         <div className="p-4 bg-red-50 border-t border-red-200">
//           <p className="text-sm text-red-600">{error}</p>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default MapViewer;


// 3.
import React, { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, Satellite, RefreshCw } from 'lucide-react';

interface GeoJSONFeature {
  type: 'Feature';
  properties: {
    claimant_name?: string;
    status?: string;
    village?: string;
    claim_id?: string;
  };
  geometry: any;
}

interface MapViewerProps {
  villageId?: string;
  claimId?: string;
  center?: [number, number];
  zoom?: number;
  height?: string;
  showControls?: boolean;
}

const MapViewer: React.FC<MapViewerProps> = ({
  villageId,
  claimId,
  center = [20.25, 81.5],
  zoom = 8,
  height = "500px",
  showControls = true
}) => {
  const [geoData, setGeoData] = useState<GeoJSONFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite' | 'terrain'>('streets');
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<any[]>([]);

  // Load CSS once
  useEffect(() => {
    const loadCSS = () => {
      if (document.getElementById('leaflet-css')) return;
      
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
      link.crossOrigin = '';
      document.head.appendChild(link);
    };
    
    loadCSS();
  }, []);

  // Load data
  useEffect(() => {
    loadGeoData();
  }, [villageId, claimId]);

  // Initialize map with Google Maps-like behavior
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const L = (await import('leaflet')).default;
        
        // Fix marker icons
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });

        // Google Maps-like configuration
        const map = L.map(mapRef.current!, {
          // Natural zoom behavior like Google Maps
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          dragging: true,
          
          // Smooth animations like Google Maps
          fadeAnimation: true,
          zoomAnimation: true,
          markerZoomAnimation: true,
          
          // Natural zoom sensitivity
          wheelPxPerZoomLevel: 120, // More pixels per zoom = slower zoom
          wheelDebounceTime: 40,
          
          // Other settings
          attributionControl: true,
          zoomSnap: 0.25, // Allows fractional zoom for smoother experience
          zoomDelta: 0.25
        }).setView(center, zoom);
        
        // CartoDB Positron - Clean, Google Maps-like street map
        const streetsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap © CartoDB',
          subdomains: 'abcd',
          maxZoom: 19,
          minZoom: 3
        });

        // Esri World Imagery - High quality satellite
        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: '© Esri © DigitalGlobe © GeoEye',
          maxZoom: 19,
          minZoom: 3
        });

        // USGS Terrain - Topographic map showing elevation
        const terrainLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
          attribution: '© Esri',
          maxZoom: 16,
          minZoom: 3
        });

        // CartoDB labels overlay for satellite view
        const labelsLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
          attribution: '© OpenStreetMap © CartoDB',
          subdomains: 'abcd',
          opacity: 0.9,
          maxZoom: 19
        });

        streetsLayer.addTo(map);

        mapInstanceRef.current = map;
        (map as any)._streetsLayer = streetsLayer;
        (map as any)._satelliteLayer = satelliteLayer;
        (map as any)._terrainLayer = terrainLayer;
        (map as any)._labelsLayer = labelsLayer;
        
        // Wait for map to be fully loaded
        map.whenReady(() => {
          setTimeout(() => {
            setMapReady(true);
          }, 200);
        });

      } catch (err) {
        console.error('Map initialization error:', err);
        setError('Failed to initialize map');
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn('Error removing map:', e);
        }
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  // Add data to map
  useEffect(() => {
    if (mapReady && mapInstanceRef.current && geoData.length > 0) {
      addDataToMap();
    }
  }, [geoData, mapReady]);

  // Switch layers
  useEffect(() => {
    if (mapReady && mapInstanceRef.current) {
      switchMapLayer();
    }
  }, [mapLayer, mapReady]);

  const switchMapLayer = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    
    const streetsLayer = (map as any)._streetsLayer;
    const satelliteLayer = (map as any)._satelliteLayer;
    const terrainLayer = (map as any)._terrainLayer;
    const labelsLayer = (map as any)._labelsLayer;

    // Remove all layers first
    [streetsLayer, satelliteLayer, terrainLayer, labelsLayer].forEach(layer => {
      if (layer && map.hasLayer(layer)) map.removeLayer(layer);
    });

    // Add the selected layer
    switch (mapLayer) {
      case 'satellite':
        satelliteLayer.addTo(map);
        labelsLayer.addTo(map); // Add labels overlay
        break;
      case 'terrain':
        terrainLayer.addTo(map);
        break;
      default: // 'streets'
        streetsLayer.addTo(map);
        break;
    }
  };

  const addDataToMap = async () => {
    if (!mapInstanceRef.current) return;

    try {
      const L = (await import('leaflet')).default;
      const map = mapInstanceRef.current;

      // Clear existing layers
      layersRef.current.forEach(layer => {
        try {
          map.removeLayer(layer);
        } catch (e) {
          // Ignore errors
        }
      });
      layersRef.current = [];

      const allLayers: any[] = [];

      geoData.forEach((feature) => {
        if (!feature.geometry?.coordinates) return;

        const colors = getStatusColor(feature.properties.status);
        let layer;
        
        if (feature.geometry.type === 'Polygon') {
          const coordinates = feature.geometry.coordinates[0].map((coord: number[]) => [coord[1], coord[0]]);
          
          layer = L.polygon(coordinates, {
            color: colors.border,
            fillColor: colors.fill,
            fillOpacity: 0.6,
            weight: 2,
            opacity: 0.9,
            smoothFactor: 1.0
          });

          if (layer) {
            const popupContent = `
              <div style="min-width: 200px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <div style="padding: 4px 0; border-bottom: 1px solid #e0e0e0; margin-bottom: 8px;">
                  <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #333;">${feature.properties.claim_id || 'N/A'}</h4>
                </div>
                ${feature.properties.status ? `
                  <div style="margin: 6px 0;">
                    <span style="color: #666; font-size: 13px;">Status:</span> 
                    <span style="font-weight: 500; color: ${getStatusTextColor(feature.properties.status)};">${feature.properties.status}</span>
                  </div>
                ` : ''}
                ${feature.properties.claimant_name ? `
                  <div style="margin: 6px 0;">
                    <span style="color: #666; font-size: 13px;">Claimant:</span> 
                    <span style="font-weight: 500; color: #333;">${feature.properties.claimant_name}</span>
                  </div>
                ` : ''}
                ${feature.properties.village ? `
                  <div style="margin: 6px 0;">
                    <span style="color: #666; font-size: 13px;">Village:</span> 
                    <span style="font-weight: 500; color: #333;">${feature.properties.village}</span>
                  </div>
                ` : ''}
              </div>
            `;
            
            layer.bindPopup(popupContent, {
              maxWidth: 300,
              className: 'custom-popup'
            });
            
            // Google Maps-like hover effects
            layer.on('mouseover', function(e) {
              this.setStyle({ 
                weight: 3, 
                fillOpacity: 0.8,
                opacity: 1 
              });
            });
            
            layer.on('mouseout', function(e) {
              this.setStyle({ 
                weight: 2, 
                fillOpacity: 0.6,
                opacity: 0.9 
              });
            });
            
            layer.addTo(map);
            layersRef.current.push(layer);
            allLayers.push(layer);
          }
        }
      });

      // Fit bounds with natural animation
      if (allLayers.length > 0) {
        const group = L.featureGroup(allLayers);
        map.fitBounds(group.getBounds(), { 
          padding: [30, 30], 
          maxZoom: 15,
          animate: true,
          duration: 1.0
        });
      }

    } catch (error) {
      console.error('Error adding data to map:', error);
    }
  };

  const loadGeoData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = 'http://localhost:8000';
      
      if (claimId) {
        url += `/gis/shapefile/claim/${claimId}`;
      } else if (villageId) {
        url += `/gis/shapefile/${villageId}`;
      } else {
        setGeoData(generateSampleGeoJSON());
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      const data = await response.json();
      setGeoData(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.warn('Backend not available, using sample data');
      setGeoData(generateSampleGeoJSON());
    } finally {
      setLoading(false);
    }
  };

  const generateSampleGeoJSON = (): GeoJSONFeature[] => {
    return [
      {
        type: 'Feature',
        properties: {
          claimant_name: 'Ram Singh',
          status: 'Approved',
          village: 'Kanker',
          claim_id: 'FRA001'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.15, 20.15], [81.25, 20.15], [81.25, 20.25], [81.15, 20.25], [81.15, 20.15]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          claimant_name: 'Sita Devi',
          status: 'Pending',
          village: 'Bastar',
          claim_id: 'FRA002'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.35, 20.05], [81.45, 20.05], [81.45, 20.15], [81.35, 20.15], [81.35, 20.05]
          ]]
        }
      },
      {
        type: 'Feature',
        properties: {
          claimant_name: 'Gita Patel',
          status: 'Rejected',
          village: 'Raipur',
          claim_id: 'FRA003'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [81.55, 20.35], [81.65, 20.35], [81.65, 20.45], [81.55, 20.45], [81.55, 20.35]
          ]]
        }
      }
    ];
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'approved': return { fill: '#10b981', border: '#059669' };
      case 'pending': return { fill: '#f59e0b', border: '#d97706' };
      case 'rejected': return { fill: '#ef4444', border: '#dc2626' };
      default: return { fill: '#6b7280', border: '#4b5563' };
    }
  };

  const getStatusTextColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'approved': return '#059669';
      case 'pending': return '#d97706';
      case 'rejected': return '#dc2626';
      default: return '#4b5563';
    }
  };

  const handleRefresh = () => {
    loadGeoData();
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-popup .leaflet-popup-content-wrapper {
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .custom-popup .leaflet-popup-content {
            margin: 12px 16px;
            line-height: 1.4;
          }
        `
      }} />
      
      <Card className="overflow-hidden shadow-lg">
        {showControls && (
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900">Interactive Map</h3>
              <div className="flex items-center gap-2">
                <div className="flex rounded-md border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setMapLayer('streets')}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
                      mapLayer === 'streets' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={!mapReady}
                  >
                    Streets
                  </button>
                  <button
                    onClick={() => setMapLayer('satellite')}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
                      mapLayer === 'satellite' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={!mapReady}
                  >
                    Satellite
                  </button>
                  <button
                    onClick={() => setMapLayer('terrain')}
                    className={`px-3 py-1 text-sm font-medium transition-colors ${
                      mapLayer === 'terrain' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    disabled={!mapReady}
                  >
                    Terrain
                  </button>
                </div>
                <Button onClick={handleRefresh} disabled={loading} size="sm">
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="relative" style={{ height }}>
          <div 
            ref={mapRef} 
            className="w-full h-full"
            style={{ 
              width: '100%',
              height: height,
              background: '#f8f9fa'
            }}
          />
          
          {(!mapReady || loading) && (
            <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-[2000]">
              <div className="bg-white rounded-xl p-6 shadow-xl border">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {!mapReady ? 'Loading map...' : 'Loading data...'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {mapReady && geoData.length > 0 && (
            <div className="absolute bottom-4 left-4 bg-white/95 border rounded-lg p-3 shadow-lg z-[1000] backdrop-blur">
              <h4 className="font-semibold text-sm mb-3 text-gray-900">FRA Claims</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-emerald-500 border border-emerald-600 rounded-sm"></div>
                  <span className="text-gray-700">Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-amber-500 border border-amber-600 rounded-sm"></div>
                  <span className="text-gray-700">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-red-500 border border-red-600 rounded-sm"></div>
                  <span className="text-gray-700">Rejected</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-t border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MapViewer;