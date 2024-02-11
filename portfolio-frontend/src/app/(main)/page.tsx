import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import "./MainPage.scss";
import { ProfileType } from "../../../../typeorm/src/entities/types/profileType";
import UserList from "@/components/UserList/UserList";

export default async function MainPage() {
  const students = await projectTypeormAdapter.students.getStudents()
  const teachers = await projectTypeormAdapter.teachers.getTeachers()
  return (
    <div className="main-page">
      <section className="main-layout__section">
        <div className="main-layout__section-info">
          <h3 className="main-layout__section-subtitle">Советы по обучению</h3>
          <h2 className="main-layout__section-title">Преподаватели</h2>
          <p className="main-layout__section-info-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            senectus neque, lorem sit in mattis. Vehicula eget eget tellus{" "}
          </p>
        </div>
        {!!teachers.length ? <UserList users={teachers} /> : <p>Список пуст</p>}
      </section>

      <section className="main-layout__section">
        <div className="main-layout__section-info">
          <h3 className="main-layout__section-subtitle">Работы</h3>
          <h2 className="main-layout__section-title">Портфолио студентов</h2>
          <p className="main-layout__section-info-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            senectus neque, lorem sit in mattis. Vehicula eget eget tellus{" "}
          </p>
        </div>
        {!!students.length ? <UserList users={students} /> : <p>Список пуст</p>}
      </section>
    </div>
  );
}
