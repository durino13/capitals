import React, { Component } from 'react';
import * as actions from '../actions/common.jsx';
import { connect } from 'react-redux';
import jvectormap from '../../../../node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js';
import worldmill from '../../../../node_modules/admin-lte/plugins/jvectormap/jquery-jvectormap-world-mill-en';

const mapStateToProps = (state) => {
    return {
        latlng: state.latlng,
        countryName: state.country
    }
}

@connect(mapStateToProps)
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

    // Set the circle markers on the map based on the latlng values from the JSON
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

    /*
     * Refresh the map on the screen
     */
    refreshMap() {
        const { latlng, countryName } = this.props;
        // First remove the previous map and then draw a new one ..
        try { $('#world-map').vectorMap('get', 'mapObject').remove(); }
        catch(err) {}
        this.setMarkers(this.initMap(), latlng, countryName);
    }

    /*
     * This will render the map initially
     */
    componentDidMount() {
        this.refreshMap();
    }

    /*
     *This will render the map after every answer
     */
    componentDidUpdate() {
        this.refreshMap();
    }

    render() {
        return (
            <div id="world-map" style={{width: '600px'}, {height: '500px'}}></div>
        );
    }

}