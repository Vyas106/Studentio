import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'


const page = () => {
  return (
    <div>
     Welcome to student.io
      <Button ><Link href="/login">
      Continu
      </Link></Button>
    </div>
  )
}

export default page
