import { getServerSession } from "next-auth";
import "./EditProfilePage.scss";
import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import { redirect } from "next/navigation";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import UpdateProfileForm from "@/components/UpdateProfileForm/UpdateProfileForm";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getPlainObject } from "@/utils";
import UpdateProfileAvatarForm from "@/components/UpdateProfileAvatarForm/UpdateProfileAvatarForm";

export default async function EditProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await projectTypeormAdapter.users.getUserById(session.user.id);
  if (!user) {
    redirect("/");
  }
  return (
    <AntdRegistry>
      <div className="edit-profile-page">
        <UpdateProfileAvatarForm userId={user.id} />
        <UpdateProfileForm user={getPlainObject(user)} isAdmin={session.user.isAdmin} />
      </div>
    </AntdRegistry>
  );
}
