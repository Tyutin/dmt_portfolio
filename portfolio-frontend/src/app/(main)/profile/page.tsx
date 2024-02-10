import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import UserProfile from "@/components/UserProfile/UserProfile";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { UserInfoType } from "@/types/UserInfo.type";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./ProfilePage.scss";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await projectTypeormAdapter.users.getUserById(session.user.id);
  if (!user) {
    redirect("/");
  }
  const userInfo: UserInfoType = { ...user };
  return (
    <div className="profile-page">
      <Link href="/profile/edit" className="profile-page__edit-link">Редактировать профиль</Link>
      <UserProfile user={userInfo} />
    </div>
  );
}
