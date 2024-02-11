import UserProfile from "@/components/UserProfile/UserProfile";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { getPlainObject } from "@/utils";
import { redirect } from "next/navigation";
import "./StudentPage.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import Link from "next/link";

export default async function StudentPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const student = await projectTypeormAdapter.students.getStudentBySlug(slug);
  if (!student) {
    redirect("/students");
  }
  const session = await getServerSession(authOptions);
  return (
    <div className="student-page">
      {session?.user.isAdmin && (
        <Link
          href={`/students/${slug}/edit`}
          className="student-page__edit-link"
        >
          Редактировать пользователя
        </Link>
      )}
      <UserProfile user={getPlainObject(student)} />
    </div>
  );
}
