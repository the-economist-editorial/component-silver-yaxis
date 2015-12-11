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
    const yAxis = this.setYaxisConfig();
    this.updateYaxis(yAxis);
  }

  // SET Y-AXIS CONFIG
  setYaxisConfig() {
    const yAxis = this.props.axis;
    const config = this.props.config;
    // Scale function:
    const yScale = config.scale;
    // Tick density:
    const tickDensity = config.tickDensity;
    // Padding between labels and tick-ends:
    const tickPadding = config.tickPadding;
    // Left or right:
    const orient = config.orient;
    // Tick length
    let tickLength = config.tickLength;
    // NOTE: do I need this? I assume r/h scale works like
    // x-axis top...
    // If axis at top, tickLength is neg value:
    if (orient === 'right') {
      tickLength = -tickLength;
    }
    yAxis
      .scale(yScale)
      .orient(orient)
      // Gap between labels and ticks
      .tickPadding(tickPadding)
      // Number of ticks
      .ticks(tickDensity)
      // Tick length
      .tickSize(tickLength);
    return yAxis;
  }
  // SET Y-AXIS CONFIG ends

  // GET AXIS GROUP TRANSFORM STRING
  // Called from updateYAxis. Returns string that determines
  // whether axis is drawn left/right
  getAxisGroupTransformString() {
    let width = 0;
    if (this.props.config.orient === 'right') {
      width = this.props.config.bounds.width;
    }
    return `translate(${width}, 0)`;
  }
  // GET AXIS GROUP TRANSFORM STRING ends

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

  // RENDER axis group
  render() {
    return (
      <g className="d3-yaxis-group"/>
    );
  }
}
