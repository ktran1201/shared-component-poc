import React from 'react';

import classNames from 'classnames';
import { Circles } from 'react-loader-spinner';

import styles from './Loader.module.scss';
import {DataTestId} from "../PrivateTextInput";

export enum LoaderSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface LoaderProps extends DataTestId {
  className?: string;
  size?: LoaderSize;
  overlay?: boolean;
}

const DIMENSIONS = {
  [LoaderSize.SMALL]: { height: 20, width: 20 },
  [LoaderSize.MEDIUM]: { height: 50, width: 50 },
  [LoaderSize.LARGE]: { height: 80, width: 80 },
};

const Loader: React.FC<LoaderProps> = ({
  className,
  dataTestId = 'loader',
  size = LoaderSize.LARGE,
  overlay = false,
}) => (
  <div
    data-test-id={dataTestId}
    className={classNames(
      className,
      styles.loader,
      overlay && styles.withOverlay,
    )}
  >
    <Circles {...DIMENSIONS[size]} />
  </div>
);

export default Loader;
