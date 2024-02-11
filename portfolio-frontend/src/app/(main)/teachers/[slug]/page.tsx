import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import UserProfile from "@/components/UserProfile/UserProfile";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { getPlainObject } from "@/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./TeacherPage.scss";

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
  const session = await getServerSession(authOptions);
  return (
    <div className="teacher-page">
      {session?.user.isAdmin && (
        <Link
          href={`/teachers/${slug}/edit`}
          className="teacher-page__edit-link"
        >
          Редактировать пользователя
        </Link>
      )}
      <UserProfile user={getPlainObject(teacher)} />
    </div>
  );
}
