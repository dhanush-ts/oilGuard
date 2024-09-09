// src/components/Counter.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/slices/SampleSlice.js';
import { Button } from '@/components/ui/button';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className='gap-10 grid grid-cols-2'>
      <h1>Count: {count}</h1>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</Button>
    </div>
  );
};

export default Counter;