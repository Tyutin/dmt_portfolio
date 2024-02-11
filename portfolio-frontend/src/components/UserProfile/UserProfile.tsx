"use client";

import "./UserProfile.scss";
import { useState } from "react";
import classNames from "classnames";
import Portfolio from "../Portfolio/Portfolio";
import { UserEntity } from "../../../../typeorm/src/entities/nextAuth.entity";

type ActiveTabType = "portfolio" | "about" | "experience";

const buttonList: { text: string; value: ActiveTabType }[] = [
  {
    text: "Фокус",
    value: "portfolio",
  },
  {
    text: "Обо мне",
    value: "about",
  },
  {
    text: "Опыт работы",
    value: "experience",
  },
];

type UserProfileProps = {
  user: UserEntity;
};

export default function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<ActiveTabType>("portfolio");
  return (
    <div className="user-profile">
      <aside className="user-profile__aside">
        <div className="user-profile__info">
          <img
            src={user.imageMax || ""}
            alt={`${user.lastName || ""} ${user.firstName || ""}`}
            className="user-profile__avatar"
          />
          <h1 className="user-profile__name">
            {user.lastName} {user.firstName}
          </h1>
          <a
            href={`https://vk.com/id${user.vkId}`} //TODO поменять slug на айди
            target="_blank"
            className="user-profile__vk-link"
          >
            vk.com/id{user.vkId}
          </a>
          {!!user.shortInfo && (
            <p className="user-profile__short-info">{user.shortInfo}</p>
          )}
        </div>
        <ul className="user-profile__toggle-list">
          {buttonList.map((button) => {
            return (
              <li className="user-profile__toggle-element" key={button.value}>
                <button
                  className={classNames(
                    "user-profile__toggle-button",
                    activeTab === button.value &&
                      "user-profile__toggle-button_active"
                  )}
                  onClick={() => setActiveTab(button.value)}
                >
                  {button.text}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="user-profile__content">
        <section className="main-layout__section">
          <h2 className="main-layout__section-title">
            {activeTab === "about"
              ? "Обо мне"
              : activeTab === "experience"
              ? "Опыт работы"
              : "Портфолио"}
          </h2>
          {activeTab === "portfolio" ? <Portfolio /> : <p>{user[activeTab]}</p>}
        </section>
      </main>
    </div>
  );
}

function UserProfileAbout({ about }: { about: string }) {
  return (
    <section className="main-layout__section">
      <h2 className="main-layout__section-subtitle">Обо мне</h2>
      <p>{about}</p>
    </section>
  );
}
