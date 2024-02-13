import { projectTypeormAdapter } from "@/typeorm/projectTypeormAdapter";
import "./WorksPage.scss";
import { Image } from "antd";
import Link from "next/link";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default async function WorksPage() {
  const works = await projectTypeormAdapter.wokrs.getAllWorks();
  return (
    <AntdRegistry>
      <div className="works-page">
        <section className="main-layout__section">
          <div className="main-layout__section-info">
            <h2 className="main-layout__section-title">Работы кафедры</h2>
          </div>
          <ul className="works-page__list">
            {works.map((work) => {
              const { user, id, title, imageName } = work;
              return (
                <li className="works-page__element" key={id}>
                  <Image
                    src={`/images/works/${imageName}`}
                    alt={title}
                    wrapperClassName="works-page__card-wrapper"
                    className="works-page__card-image"
                    preview={{
                      mask: title,
                    }}
                    style={{ objectFit: "cover" }}
                  />
                  <Link
                    className="works-page__user-link"
                    href={`/${user.status}s/${user.slug}`}
                  >
                    {user.lastName} {user.firstName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </AntdRegistry>
  );
}
