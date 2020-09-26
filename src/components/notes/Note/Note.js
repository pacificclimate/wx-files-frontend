import React from 'react';

export default function Note({ title, children }) {
  return (
    <li>
      <strong>{title}: </strong>
      {children}
    </li>
  );
}