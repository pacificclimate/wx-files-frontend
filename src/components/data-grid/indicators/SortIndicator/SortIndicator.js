import React from 'react';
import {
  Circle,
  SortAlphaDown, SortAlphaDownAlt, SortNumericDown, SortNumericDownAlt
} from 'react-bootstrap-icons';
import flow from 'lodash/fp/flow';
import getOr from 'lodash/fp/getOr';
import styles from './SortIndicator.module.css';


const iconsByTypeAndDir = {
  "alphanumeric": {
    "true": SortAlphaDownAlt,
    "false": SortAlphaDown,
  },
  "default": {
    "true": SortAlphaDownAlt,
    "false": SortAlphaDown,
  },
  "numeric": {
    "true": SortNumericDownAlt,
    "false": SortNumericDown,
  },
  "numericArray": {
    "true": SortNumericDownAlt,
    "false": SortNumericDown,
  },
};


export default function SortIndicator({
  isSorted = false,
  isSortedDesc = false,
  sortType = "alphanumeric",
}) {
  if (!isSorted) {
    return null;
  }
  const Icon = flow(
    getOr(iconsByTypeAndDir["default"], sortType),
    getOr(Circle, isSortedDesc.toString()),
  )(iconsByTypeAndDir);
  return <Icon className={`${styles.SortIndicator} text-primary`}/>
}
