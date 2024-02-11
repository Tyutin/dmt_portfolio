import UserProfile from "@/components/UserProfile/UserProfile";
import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import { getPlainObject } from "@/utils";
import { redirect } from "next/navigation";
import React from "react";

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
  return (
    <div className="student-page">
      <UserProfile
        user={getPlainObject(student)}
      />
    </div>
  );
}
