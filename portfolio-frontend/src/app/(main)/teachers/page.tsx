import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import "./TeachersPage.scss";
import UserList from "@/components/UserList/UserList";

export default async function TeachersPage() {
  const teachers = await projectTypeormAdapter.teachers.getTeachers();
  return (
    <div className="teachers-page">
      <section className="main-layout__section">
        <div className="main-layout__section-info">
          <h2 className="main-layout__section-title">Преподаватели</h2>
        </div>
        {teachers.length ? (
          <UserList users={teachers} />
        ) : (
          <p>Список пока что пуст :)</p>
        )}
      </section>
    </div>
  );
}
