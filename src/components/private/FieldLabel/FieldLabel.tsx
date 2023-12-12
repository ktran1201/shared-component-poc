import React from 'react';

const FieldLabel = ({ label, isRequired }) => {
  if (isRequired) {
    return (
      <>
        {label} - <i>required</i>
      </>
    );
  }
  return <>{label}</>;
};

export default FieldLabel;
