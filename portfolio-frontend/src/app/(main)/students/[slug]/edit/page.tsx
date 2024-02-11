import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import UpdateProfileForm from "@/components/UpdateProfileForm/UpdateProfileForm";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { getPlainObject } from "@/utils";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import './EditProfilePage.scss'


export default async function EditStudentPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.isAdmin) {
    redirect("/students");
  }
  const { slug } = params;
  const student = await projectTypeormAdapter.students.getStudentBySlug(slug);
  if (!student) {
    redirect("/students");
  }
  return (
    <AntdRegistry>
      <div className="edit-profile-page">
        <UpdateProfileForm user={getPlainObject(student)} isAdmin={true} />
      </div>
    </AntdRegistry>
  )
}
