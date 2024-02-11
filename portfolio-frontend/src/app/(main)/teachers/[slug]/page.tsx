import UserProfile from "@/components/UserProfile/UserProfile";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { getPlainObject } from "@/utils";
import { redirect } from "next/navigation";

export default async function TeacherPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const teacher = await projectTypeormAdapter.teachers.getTeacherBySlug(slug);
  if (!teacher) {
    redirect("/teachers");
  }
  return (
    <div className="teacher-page">
      <UserProfile user={getPlainObject(teacher)} />
    </div>
  );
}
