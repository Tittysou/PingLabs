"use client"

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="glow-orb w-96 h-96 bg-blue-500"
        style={{
          top: '10%',
          left: '20%',
          animationDelay: '0s'
        }}
      />
      
      <div 
        className="glow-orb w-80 h-80 bg-purple-500"
        style={{
          top: '60%',
          right: '15%',
          animationDelay: '2s'
        }}
      />
      
      <div 
        className="glow-orb w-64 h-64 bg-pink-500"
        style={{
          bottom: '20%',
          left: '10%',
          animationDelay: '4s'
        }}
      />
      
      <div 
        className="glow-orb w-72 h-72 bg-cyan-400"
        style={{
          top: '30%',
          right: '40%',
          animationDelay: '1s'
        }}
      />
    </div>
  )
}
