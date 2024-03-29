import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import "./StudentsPage.scss";
import UserList from "@/components/UserList/UserList";

export default async function StudentsPage() {
  const students = await projectTypeormAdapter.students.getStudents();
  return (
    <div className="students-page">
      <section className="main-layout__section">
        <div className="main-layout__section-info">
          <h2 className="main-layout__section-title">Наши студенты</h2>
        </div>
        {students.length ? (
          <UserList users={students} />
        ) : (
          <p>Список пока что пуст :)</p>
        )}
      </section>
    </div>
  );
}
