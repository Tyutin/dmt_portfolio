import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { redirect } from "next/navigation";

export default async function TeacherPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const user = await projectTypeormAdapter.teachers.getTeacherBySlug(slug);
  if (!user) {
    redirect("/teachers");
  }
  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
