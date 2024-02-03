import React from 'react'

export const SetimentIcon = ({setiment}) => {
  return (
    <span>
    {
        setiment === 0 ?  "😔" : setiment === 1 ? "🙂" : "😄"
    }
    </span>
  )
}
