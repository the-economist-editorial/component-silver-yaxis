// Disable prefer-reflect, for D3 axis.call()
/* eslint-disable prefer-reflect */
import React from 'react';
import Dthree from 'D3';

export default class SilverYaxis extends React.Component {

// PROP TYPES
  static get propTypes() {
    return {
      test: React.PropTypes.string,
      config: React.PropTypes.object,
      axis: React.PropTypes.func,
    };
  }

  // DEFAULT PROPS
  static get defaultProps() {
    return {
      axis: Dthree.svg.axis(),
    };
  }

  // COMPONENT DID MOUNT
  componentDidMount() {
    const yAxis = this.setYaxisConfig();
    this.updateYaxis(yAxis);
  }

  // COMPONENT DID UPDATE
  componentDidUpdate() {
    // this.setYaxisConfig();
    // this.updateYaxis();
    const yAxis = this.setYaxisConfig();
    this.updateYaxis(yAxis);
  }

  // SET X-AXIS CONFIG
  setYaxisConfig() {
    const yAxis = this.props.axis;
    const config = this.props.config;
    const yScale = config.scale;
    const orient = config.orient;
    const tickSize = config.tickSize;
    yAxis
      .scale(yScale)
      .orient(orient)
      .tickPadding(5)
      // To come: ticks need to be at an appropriate 'density',
      // rather than a fixed number...
      .ticks(5)
      .tickSize(tickSize);
    return yAxis;
  }

  getAxisGroupTransformString() {
    let width = 0;
    if (this.props.config.orient === 'right') {
      width = this.props.config.bounds.width;
    }
    return `translate(${width}, 0)`;
  }

  // UPDATE Y-AXIS
  // Called directly on the DOM to update the axis
 updateYaxis(yAxis) {
   const axisGroup = Dthree.select('.d3-yaxis-group');
   const duration = this.props.config.duration;
   const transform = this.getAxisGroupTransformString();
   axisGroup
     .transition().duration(duration)
     .attr('transform', transform)
       // There may be circumstances where I want to set a delay...
       .transition().delay(0).duration(duration)
      .call(yAxis)
       ;
 }

  // RENDER
  render() {
    // Axis group
    return (
      <g className="d3-yaxis-group" ref="axisGrouproup"/>
    );
  }
}
