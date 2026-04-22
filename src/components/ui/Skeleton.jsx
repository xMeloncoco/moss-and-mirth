import React from 'react'

/** Animated skeleton loader block. */
export default function Skeleton({ className = '' }) {
  return (
    <div className={`bg-parchment/10 animate-pulse rounded-md ${className}`} />
  )
}

export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <Skeleton className="h-64 rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 rounded-lg" />
    </div>
  )
}

export function HarmonySkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1,2,3,4].map(i => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="h-3 flex-1 rounded-full" />
        </div>
      ))}
    </div>
  )
}
