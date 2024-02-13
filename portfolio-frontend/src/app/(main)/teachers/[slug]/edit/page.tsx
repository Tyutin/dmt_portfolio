import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import UpdateProfileForm from "@/components/UpdateProfileForm/UpdateProfileForm";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { getPlainObject } from "@/utils";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import './EditProfilePage.scss'
import UpdateProfileAvatarForm from "@/components/UpdateProfileAvatarForm/UpdateProfileAvatarForm";


export default async function EditTeacherPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    redirect("/teachers");
  }
  const { slug } = params;
  const teacher = await projectTypeormAdapter.teachers.getTeacherBySlug(slug);
  if (!teacher) {
    redirect("/teachers");
  }
  return (
    <AntdRegistry>
      <div className="edit-profile-page">
        <UpdateProfileAvatarForm redirectLink={`/teachers/${slug}`} userId={teacher.id} />
        <UpdateProfileForm user={getPlainObject(teacher)} isAdmin={true} />
      </div>
    </AntdRegistry>
  )
}
