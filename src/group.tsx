import React from "react";
import { ItemProps } from "./item";

export default function Group (props: ItemProps) {
  const childrenWithProps = React.Children.map(
    props.children,
    (child: any, index) =>
      React.cloneElement(child, {
        animatedScroll: props.animatedScroll,
        totalFrames: props.totalFrames,
        key: 'KEY_' + index
      })
  );
  return <>{childrenWithProps}</>;
};
