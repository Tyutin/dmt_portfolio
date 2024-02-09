import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";


export default async function StudentsPage() {
  const users = await projectTypeormAdapter.students.getStudents();
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  )
}
