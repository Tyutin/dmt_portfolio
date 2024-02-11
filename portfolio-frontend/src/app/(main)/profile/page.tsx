import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import UserProfile from "@/components/UserProfile/UserProfile";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./ProfilePage.scss";
import { getPlainObject } from "@/utils";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await projectTypeormAdapter.users.getUserById(session.user.id);
  if (!user) {
    redirect("/");
  }
  return (
    <div className="profile-page">
      <Link href="/profile/edit" className="profile-page__edit-link">Редактировать профиль</Link>
      <UserProfile user={getPlainObject(user)} />
    </div>
  );
}
