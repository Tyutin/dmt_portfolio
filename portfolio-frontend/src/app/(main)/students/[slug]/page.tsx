import { projectTypeormAdapter } from '@/typeorm/projectTypeormAdapter';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function StudentPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const user = await projectTypeormAdapter.students.getStudentBySlug(slug)
  if (!user) {
    redirect('/students')
  }
  return (
    <div>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
