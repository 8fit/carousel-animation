import React, { Component } from "react";
import {
  StyleSheet,
  Animated,
  ScrollViewProperties,
  View,
  ScrollViewProps,
} from "react-native";

export interface SliderProps extends ScrollViewProps {
  slideWidth: number;
  slideHeight: number;
  totalFrames: number;
  pages: number;
  scrollViewProps?: ScrollViewProperties;
  skipFrames?: number;
  onPageChange?: (page: number) => void;
}

export default class Slider extends Component<SliderProps> {
  animatedScroll = new Animated.Value(0);

  onMomentumScrollEnd = (event: any) => {
    const page = Math.round(event.nativeEvent.contentOffset.x / this.props.slideWidth);
    if(this.props.onPageChange) {
      this.props.onPageChange(page);
    }
  };
  
  render() {
    const { children, totalFrames } = this.props;

    const totalWidth = this.props.slideWidth * this.props.pages;

    const childrenWithProps = React.Children.map(children, (child: any, index) =>
      React.cloneElement(child, {
        animatedScroll: this.animatedScroll,
        page: index,
        pages: this.props.pages,
        slideWidth: this.props.slideWidth,
        slideHeight: this.props.slideHeight,
        skipFrames: this.props.skipFrames,
        totalFrames
      })
    );

    return (
      <>
        <View style={styles.container}>
          {childrenWithProps}
        </View>
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
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          {...this.props.scrollViewProps}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    
  },
  scroll: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
});
