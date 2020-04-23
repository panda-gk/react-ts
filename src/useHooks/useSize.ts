import React from 'react'

export const useSize = () => {
  const [size, setSize] = React.useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = React.useCallback(() => {
    const newSize = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
    setSize(newSize)
    // console.log(newSize)
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    }
  }, [])

  return {
    y: size.height
  }
}