import React, { useEffect, useState } from 'react'

type Props = {
  alt: string
  src: string
  className?: string
  style?: React.CSSProperties
}

const ImageComponent: React.FC<Props> = ({
  alt,
  src,
  className = '',
  style = {},
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const preloadImage = (image: string) => {
      const img = new Image()
      img.src = image
    }

    preloadImage(src)
  }, [src])

  return (
    <img
      src={src}
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        ...style,
      }}
      alt={alt}
    />
  )
}

export default ImageComponent
