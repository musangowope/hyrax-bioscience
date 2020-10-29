import React from "react";
import GoogleMapReact from "google-map-react";
import MarkerIcon from "../svgs/marker.svg";
import styled from "styled-components";

const Marker = () => <S.MarkerImage src={MarkerIcon} alt="geotag" />;

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys="AIzaSyAKzcbG1DkSRo8LI7wXCnp_3OJtVljvv9Y"
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker lat={this.props.center.lat} lng={this.props.center.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;

const S = {};
S.MarkerImage = styled.img`
  width: 50px;
  height: auto;
`;
