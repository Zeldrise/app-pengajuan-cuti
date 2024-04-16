import React from 'react'
import HrLayout from '../../../layouts/HrLayout'


export default function index() {
  return (
    <div>test approval</div>
  )
}
index.getLayout = (page: React.ReactNode) => <HrLayout>{page}</HrLayout>