import React from 'react'

const Image = ({src,...rest}) => {
    src = src && src.includes('https://')
    ? src
    : 'http://localhost:5002/'+src;
  return (
    <img {...rest} src={src} alt={""}  />
  );
}

export default Image