import React from 'react';
import {Image, View} from 'react-native';
import Item from './item';
import Group from './group';
import Slider from './slider';

const types:any = {
  Image,
  View,
  Item,
  Group,
}

interface AssetsLibrary {[key: string]: any}

export default (json: any, assets: AssetsLibrary) => {
  const {properties, children} = json;
  return <Slider
    {...properties}
    >
    {children.map(mapChildren(assets))}
    </Slider>
}

function createComponent(json: any, assets: AssetsLibrary) {
  let {type, properties, children} = json;

  if(properties && properties.source && properties.source.require) {
    properties.source = assets[properties.source.require];
  }

  if(children) {
    children = children.map(mapChildren(assets))
  }

  return React.createElement(types[type], properties, children);
}

const mapChildren = (assets: AssetsLibrary) => (item: any, index: number) => {
  item = {
    ...item,
    properties: {
      ... item.properties,
      key: 'ITEM__' + index
    }
  }
  return createComponent(item, assets)
}