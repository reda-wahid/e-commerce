import  { useRef } from 'react'

export default function imageProduct({data}) {
    const imgRef = useRef();
    
  return (
    <>
      <div className="images grid max-md:justify-center  gap-4">
              <img
                ref={imgRef}
                src={data.thumbnail}
                alt={data.title}
                className="w-auto max-w-96 h-96"
                loading="lazy"
              />
              <div className="flex gap-2 w-24">
                {data.images.map((item) => (
                  <img
                    onClick={() => (imgRef.current.src = item)}
                    key={item}
                    src={item}
                    alt={data.title}
                    loading="lazy"
                    className="w-full  cursor-pointer hover:opacity-75"
                  />
                ))}
              </div>
            </div>
    </>
  )
}
