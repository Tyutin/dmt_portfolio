import { Image } from "antd";
import "./AboutPage.scss";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function AboutPage() {
  return (
    <AntdRegistry>
      <div className="about-page">
        <div className="about-page__kafedra-wrapper">
          <Image
            src="/images/kafedra.jpg"
            alt='Фото преподавателей кафедры "Технология промшленной и художественной обработки материалов"'
            wrapperClassName="works-page__card-wrapper"
            className="works-page__card-image"
            preview={{
              mask: "Открыть",
            }}
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="about-page__info">
          Особенность кафедры «Технология промышленной и художественной
          обработки материалов», отличающая ее от других подразделений ИжГТУ
          имени М.Т. Калашникова, в том, что мы обучаем студентов по
          инженерно-художественным направлениям. <br />
          Мы готовим специалистов по созданию художественно-промышленных изделий
          из материалов разных классов, средовых объектов, проектированию
          интерьеров общественного и жилого назначения. Сочетание
          художественно-дизайнерской подготовки с инженерными знаниями делает
          выпускников кафедры востребованными в самых разных отраслях, поскольку
          качественный дизайн является основным показателем привлекательности
          продукции для потребителя, во многом определяющим его
          конкурентоспособность на рынке. <br />
          Наша кафедра – это большая сплоченная команда из преподавателей и
          студентов. Первые вносят в эту команду свой профессионализм и
          привязанность к выбранному делу, а вторые – свое творческое видение,
          активность, любознательность и желание создавать что-то новое. В
          основе коллектива – тесный союз творчества и инженерных знаний,
          глубокое знание технологий и большой опыт работы с разными материалами
          и разными людьми.
          <br />
          Мы очень надеемся, что что каждый студент, вставший вместе с нами на
          путь инженерно-художественного образования заразится атмосферой
          творчества и созидания. Развитие и становление новых талантливых
          личностей – это то, что мы умеем и хотим делать.
        </p>
      </div>
    </AntdRegistry>
  );
}