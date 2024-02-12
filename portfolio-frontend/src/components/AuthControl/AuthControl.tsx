"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
import Button from "../Button/Button";
import "./AuthControl.scss";
import { Popover } from "antd";

const content = (
  <ul className="auth-control__menu">
    <li>
      <Link className="auth-control__menu-link" href={"/profile"}>Мой профиль</Link>
    </li>
    <li>
      <button className="auth-control__menu-link" onClick={() => signOut()}>Выход</button>
    </li>
  </ul>
);

export default function AuthControl(props: { session: Session | null }) {
  const { session } = props;
  if (!session) {
    return (
      <Button theme="white" onClick={() => signIn("vk")}>
        Войти
      </Button>
    );
  }
  return (
    <Popover content={content} trigger="click" placement="bottomRight" arrow={false} overlayClassName="auth-control__overlay-tooltip">
      <button className="auth-control">
        <img
          src={session?.user?.image || ""}
          alt={session?.user?.name || ""}
          className="auth-control__user-picture"
        />
      </button>
    </Popover>
  );
}
