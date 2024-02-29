"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../components/Tasks/Tasks';

function Page() {
  const {incompleteTasks} = useGlobalState();
  return (
    <Tasks title="Incomplete Task" tasks={incompleteTasks}/>
  )
}

export default Page;