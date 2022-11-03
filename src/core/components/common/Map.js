import React from 'react';
import { Circle, GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import { GOOGLE_MAP_KEY } from '@/env';

const mapStyles = {
    width: '100%',
    height: '100%'
}

class MapContainer extends React.Component {
    render() {
        const style = this.props.style || {};
        let components = this.props.components || [];
        let puntosMarcacion = this.props.puntosMarcacion || [];
        let i = 0;
        if (this.props.marker) {
            components.push(<Marker
                key={i++}
                onClick={this.props.marker.onClick}
                name={this.props.marker.name}
            />);
        }
        return (
            <Map
                google={this.props.google}
                zoom={this.props.zoom ?? 14}
                {...this.props}
                style={{ ...mapStyles, ...style }}
                initialCenter={{
                    lat: this.props.lat,
                    lng: this.props.lng,
                }}
            >

                {puntosMarcacion.map((puntoMarcacion, i) => {
                    if(puntoMarcacion.lat && puntoMarcacion.lng) {
                        return <Circle
                        key={i}
                        radius={Number(puntoMarcacion.radio)}
                        center={{lat: Number(puntoMarcacion.lat), lng: Number(puntoMarcacion.lng) }}
                        strokeColor='transparent'
                        strokeOpacity={0}
                        strokeWeight={5}
                        fillColor='#FF0000'
                        fillOpacity={0.2}
                        />
                    }
                }
                )}
                

                {components}
            </Map>        
        );
    }
}

export default GoogleApiWrapper({
    apiKey: GOOGLE_MAP_KEY,
})(MapContainer);