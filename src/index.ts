// Import and re-export since Rollup complains when attempting
// `export { default as Module, Type } from './module';`.

import Slider, { SliderProps } from './slider';
import Group, { GroupProps } from './group';
import Item, { KeyFrame, ItemProps } from './item';
import FromJSON, { SliderJSON } from './from-json';

export type KeyFrame = KeyFrame;
export type SliderProps = SliderProps;
export type GroupProps = GroupProps;
export type ItemProps = ItemProps;
export type SliderJSON = SliderJSON;
export { Item, Group, Slider, FromJSON };
