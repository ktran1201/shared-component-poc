// Stability: Experimental
import React from 'react';

export interface Index {
  label: React.ReactNode;
  isRequired?: boolean;
}

const FieldLabel: React.FC<Index> = ({ label, isRequired }) => {
  if (isRequired) {
    return (
      <>
        {label} - <i>Required</i>
      </>
    );
  }
  return <>{label}</>;
};

export default FieldLabel;
