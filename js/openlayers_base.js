// definition de la projection suisse
proj4.defs(
    "EPSG:2056",
    "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
    );
  ol.proj.proj4.register(proj4);

// parametre des couches de fond
const attributions_swisstopo = [
  "Fond de plan &copy; <a href=\"https://www.swisstopo.admin.ch/fr/home.html\">swisstopo</a>"
];
const attributions_geodienste = [
  "Fond de plan &copy; <a href=\"https://www.tydac.ch\">TYDAC AG</a>"
];
// carte nationale
const carte_nationale = new ol.layer.Tile({
  id: "background-layer",
  source: new ol.source.XYZ({
    url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-grau/default/current/3857/{z}/{x}/{y}.jpeg`,
    attributions: attributions_swisstopo,
  }),
  opacity: 0.8,
  zIndex: -99
});
// orthophoto
const orthophoto = new ol.layer.Tile({
  id: "background-layer",
  source: new ol.source.XYZ({
    url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg`,
    attributions: attributions_swisstopo,
  }),
  zIndex: -99
});
// MO
const MO_nb = new ol.layer.Tile({
  id: "background-layer",
  source: new ol.source.TileWMS({
    url: `https://sigeom.mapplus.ch/cgi-bin/mapserv?map=/data/Client_Data/sigeom/layers/wms_opendata.map`,
    params: {'LAYERS': 'MO_ACTUELLE,PARCELLE_PROJ,BATIMENT_PROJ'},
    attributions: attributions_geodienste,
  }),
  zIndex: -99
});

// parametre de la vue
const view = new ol.View({
  projection: "EPSG:2056",
  center: [2585362, 1231309],
  zoom: 11.5
});

let liste_basemaps = [carte_nationale,orthophoto,MO_nb]
// creation de la carte
const map = new ol.Map({
  target: "map",
  layers: [carte_nationale],
  view: view
});