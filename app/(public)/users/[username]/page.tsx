import React from 'react'

export default async function page({params}:{params:Promise<{username:string}>}) {
    const {username} = await params;
  return (
    <div>
        <h1>{username}</h1>
    </div>
  )
}
