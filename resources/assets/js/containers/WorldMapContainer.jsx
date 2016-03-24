// TODO Rewrite this to different type of module .. Use class as in all other cases ..

import { connect } from 'react-redux';
import WorldMap from '../components/WorldMap.jsx';

const mapStateToProps = (state) => {
    return {
        latlng: state.latlng,
        countryName: state.country
    }
}

const WorldMapContainer = connect(
    mapStateToProps
)(WorldMap)

export default WorldMapContainer