import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  ScrollViewProperties
} from "react-native";

export interface SliderProps {
  slideWidth: number;
  slideHeight: number;
  totalFrames: number;
  pages: number;
  scrollViewProps: ScrollViewProperties;
}

export default class Slider extends Component<SliderProps> {
  animatedScroll = new Animated.Value(0);

  render() {
    const { children, totalFrames } = this.props;

    const totalWidth = this.props.slideWidth * this.props.pages;

    const childrenWithProps = React.Children.map(children, (child: any, index) =>
      React.cloneElement(child, {
        animatedScroll: this.animatedScroll,
        page: index,
        slideWidth: this.props.slideWidth,
        slideHeight: this.props.slideHeight,
        totalFrames
      })
    );

    return (
      <>
        <Animated.View style={styles.container}>
          {childrenWithProps}
        </Animated.View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          style={styles.scroll}
          contentContainerStyle={{ width: totalWidth }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.animatedScroll } } }],
            {
              useNativeDriver: true
            }
          )}
          scrollEventThrottle={1}
          {...this.props.scrollViewProps}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch"
  },
  scroll: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
