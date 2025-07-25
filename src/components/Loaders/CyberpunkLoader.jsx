const CyberpunkLoader = () => {
  return (
    <div className="bg-opacity-50 flex h-full w-full items-center justify-center bg-black">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 animate-pulse rounded-full border-4 border-cyan-500"></div>
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-pink-500"></div>
        <div className="absolute inset-4 animate-ping rounded-full border-4 border-yellow-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-pulse text-xl font-bold text-white">LOADING</span>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkLoader
