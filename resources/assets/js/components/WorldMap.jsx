import React, { Component } from 'react';
import * as actions from '../actions/common.jsx';
import jvectormap from '../../../../node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js';
import worldmill from '../../../../node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-world-mill-en';

export default class WorldMap extends Component {

    constructor(props) {
        super(props);
    }

    // This function initializes the map
    initMap() {
        $('#world-map').vectorMap({
            backgroundColor: 'transparent',
            regionStyle: {
                initial: {
                    fill: '#448BAB',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                },
                hover: {
                    "fill-opacity": 0.8,
                    cursor: 'pointer'
                },
                selected: {
                    fill: 'yellow'
                },
                selectedHover: {
                },
            },
            markers: [],
            markerStyle: {
                initial: {
                    fill: 'red',
                    stroke: '#383f47'
                }
            }
        });

        // This line will regurn a mapObject, so we can work with this object later ..
        return $('#world-map').vectorMap('get', 'mapObject');
    }

    setMarkers(mapObject, latlng, countryName) {
        var mapMarkers = [];
        var mapMarkersValues = [];

        var plants = [
            {name: countryName, coords: latlng, status: 'mrk'}

        ];
        mapMarkers.length = 0;
        mapMarkersValues.length = 0;
        for (var i = 0, l= plants.length; i < l; i++) {
            mapMarkers.push({name: plants[i].name, latLng: plants[i].coords});
            mapMarkersValues.push(plants[i].status);
        }
        mapObject.addMarkers(mapMarkers, []);
    }

    refreshMap() {
        const { latlng, countryName } = this.props;
        this.setMarkers(this.initMap(), latlng, countryName);
    }

    componentDidMount() {
        this.refreshMap();
    }

    componentDidUpdate() {
        this.refreshMap();
    }

    render() {

        return (
            <div id="world-map" style={{width: '600px'}, {height: '600px'}}></div>
        );
    }

}