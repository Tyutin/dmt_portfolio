"use client";
import { WorkEntity } from "../../../../typeorm/src/entities/work.entity";
import "./Portfolio.scss";
import AddWorkButton from "../AddWorkButton/AddWorkButton";
import { Image } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

type PortfolioProps = {
  works: WorkEntity[];
  userId?: string | null;
};

export default function Portfolio({ works, userId }: PortfolioProps) {
  if (!userId && !works.length) {
    return (
      <div className="portfolio">
        <p>Здесь пока пусто</p>
      </div>
    );
  }
  return (
    <AntdRegistry>
      <div className="portfolio">
        <ul className="portfolio__list">
          {!!userId && (
            <li className="portfolio__element">
              <div className="portfolio-card">
                <AddWorkButton />
              </div>
            </li>
          )}
          {works.map((work) => {
            return (
              <li className="portfolio__element" key={work.id}>
                <div className="portfolio-card">
                  <Image
                    src={`/images/works/${work.imageName}`}
                    alt={work.title}
                    wrapperClassName="portfolio-card__wrapper"
                    className="portfolio-card__image"
                    height={"100%"}
                    preview={{
                      mask: work.title,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AntdRegistry>
  );
}
