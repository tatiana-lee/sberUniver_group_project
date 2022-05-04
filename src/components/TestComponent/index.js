import React from 'react'
import { useParams } from 'react-router-dom';

export const TestComponent = () => {
    const params = useParams();
    return (
        
    <div>{params.tag}</div>
  )
}
