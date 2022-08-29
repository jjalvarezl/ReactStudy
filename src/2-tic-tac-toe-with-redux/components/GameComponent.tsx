import React, { Component } from "react";
import { useSelector, shallowEqual, connect } from "react-redux";
import { increaseDimension, decreaseDimension } from "../redux/actions/GameActions";
import { Dispatch } from "redux";

const mapStateToProps = (state: any)  => {
  return {
    dimension: state.gameReducer.game.dimension
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    increaseCounter: () => dispatch(increaseDimension()),

    decreaseCounter: () => dispatch(decreaseDimension()),
  }
}

function Game (props: any) {

  console.log(props);

  return (
    <>
      <div>Dimension {props.dimension}</div>
      <button onClick={() => props.increaseCounter()}>Increase Count</button>
      <button onClick={() => props.decreaseCounter()}>Decrease Count</button>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);