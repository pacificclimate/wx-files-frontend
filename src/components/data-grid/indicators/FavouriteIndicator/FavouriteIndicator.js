import React from 'react';
import { StarFill, Star } from 'react-bootstrap-icons';
import styles from './FavouriteIndicator.module.css';


export default function FavouriteIndicator({
  favourite = false,
  ...restProps
}) {
  const Indicator = favourite ? StarFill : Star;
  return (
    <Indicator
      className={styles.FavouriteIndicator}
      {...restProps}
    />
  );
}
