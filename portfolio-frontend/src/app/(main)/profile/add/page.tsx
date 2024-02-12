import { authOptions } from "@/app/api/auth/[...nextauth]/handler";
import AddWorkForm from "@/components/AddWorkForm/AddWorkForm";
import { getServerSession } from "next-auth";
import React from "react";

export default async function AddWorkPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="students-page">
      <section className="main-layout__section">
        <div className="main-layout__section-info">
          <h2 className="main-layout__section-title">Добавить работу в портфолио</h2>
        </div>
        <AddWorkForm userId={session?.user.id || ""} />
      </section>
    </div>
  );
}
