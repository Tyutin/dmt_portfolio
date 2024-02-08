import "./MainPage.scss";

export default function MainPage() {
  return (
    <div className="main-page">
      <section className="main-page__section">
        <div className="main-page__section-info">
          <h3 className="main-page__section-subtitle">Советы по обучению</h3>
          <h2 className="main-page__section-title">Преподаватели</h2>
          <p className="main-page__section-info-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            senectus neque, lorem sit in mattis. Vehicula eget eget tellus{" "}
          </p>
        </div>
      </section>

      <section className="main-page__section">
        <div className="main-page__section-info">
          <h3 className="main-page__section-subtitle">Работы</h3>
          <h2 className="main-page__section-title">Портфолио студентов</h2>
          <p className="main-page__section-info-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae
            senectus neque, lorem sit in mattis. Vehicula eget eget tellus{" "}
          </p>
        </div>
      </section>
    </div>
  );
}
