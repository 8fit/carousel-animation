import React, { Component } from "react";
import { Animated, ViewProps } from "react-native";
import Group from "./group";
import { SliderProps } from "./slider";

interface Frame {
  frame: number;
  value: number;
}

interface KeyFrame {
  property: string;
  frames: Frame[];
}

export interface ItemProps extends ViewProps, SliderProps {
  keyframes: KeyFrame[];
  animatedScroll: Animated.Value;
  center: boolean;
  children?: React.ReactNode;
}

export default class Item extends Component<ItemProps> {
  static defaultProps = {
    keyframes: []
  };

  get style() {
    let style:any = { transform: [{ perspective: 1000 }] };

    this.props.keyframes.map(keyframe => {
      const { property, frames } = keyframe;
      const inputRange: number[] = [];
      const outputRange: number[] = [];

      frames.forEach(({ frame, value }) => {
        inputRange.push((frame / 375) * this.props.slideWidth);

        if (property === "translateX") {
          outputRange.push(value * this.props.slideWidth);
        } else if (property === "translateY") {
          outputRange.push(value * this.props.slideHeight);
        } else {
          outputRange.push(value);
        }
      });

      const interpolatedValue = this.props.animatedScroll.interpolate({
        inputRange,
        outputRange,
        extrapolate: "clamp"
      });

      if (property !== "opacity") {
        style.transform.push({
          [property]: interpolatedValue
        });
      } else {
        style.opacity = interpolatedValue;
      }
    });

    return style;
  }

  render() {
    return (
      <Animated.View
        style={[
          this.style,
          { position: "absolute", left: 0, right: 0, top: 0 },
          this.props.center && { alignItems: "center" },
          this.props.style
        ]}
      >
        <Group {...this.props}>{this.props.children}</Group>
      </Animated.View>
    );
  }
}
