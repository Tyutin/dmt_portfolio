"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AuthControl from "../AuthControl/AuthControl";
import "./Header.scss";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import useIsMobile from "@/hooks/useIsMobile";

type HeaderProps = {
  session: Session | null;
};

export default function Header({ session }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.classList.add("header-mobile-menu-open");
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove("header-mobile-menu-open");
  };
  const toggleHandler = () => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  const pathname = usePathname();
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const { isMobile } = useIsMobile();
  useEffect(() => {
    closeMenu();
  }, [isMobile]);
  return (
    <div className="header">
      <div className="container header__container">
        <div className="header__logo-wrapper">
          <Link href={"/"} className="header__logo">
            <Image
              fill={true}
              src={"/images/svg/logo.svg"}
              alt="Логотип факультета"
            />
          </Link>
        </div>
        <nav className="hide-less-tablet header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-element">
              <Link
                href={"/"}
                className={classNames(
                  "header__nav-link",
                  pathname === "/" && "header__nav-link_active"
                )}
              >
                Главная
              </Link>
            </li>
            <li className="header__nav-element">
              <Link
                href={"/students"}
                className={classNames(
                  "header__nav-link",
                  pathname === "/students" && "header__nav-link_active"
                )}
              >
                Студенты
              </Link>
            </li>
            <li className="header__nav-element">
              <Link
                href={"/teachers"}
                className={classNames(
                  "header__nav-link",
                  pathname === "/teachers" && "header__nav-link_active"
                )}
              >
                Преподаватели
              </Link>
            </li>
            <li className="header__nav-element">
              <Link
                href={"/"}
                className={classNames(
                  "header__nav-link",
                  pathname === "/" && "header__nav-link_active"
                )}
              >
                Работы
              </Link>
            </li>
          </ul>
        </nav>
        <AuthControl session={session} />
        <button
          className={classNames(
            "hide-tablet-and-more",
            "header__nav-toggle",
            isMenuOpen && "header__nav-toggle_active"
          )}
          onClick={toggleHandler}
        />
      </div>
      <nav
        className={classNames(
          "hide-tablet-and-more",
          "header__nav",
          isMenuOpen && "header__nav_active"
        )}
      >
        <ul className="header__nav-list">
          <li className="header__nav-element">
            <Link
              href={"/"}
              className={classNames(
                "header__nav-link",
                pathname === "/" && "header__nav-link_active"
              )}
              onClick={closeMenu}
            >
              Главная
            </Link>
          </li>
          <li className="header__nav-element">
            <Link
              href={"/"}
              className={classNames(
                "header__nav-link",
                pathname === "/" && "header__nav-link_active"
              )}
              onClick={closeMenu}
            >
              О нас
            </Link>
          </li>
          <li className="header__nav-element">
            <Link
              href={"/"}
              className={classNames(
                "header__nav-link",
                pathname === "/" && "header__nav-link_active"
              )}
              onClick={closeMenu}
            >
              Советы по обучению
            </Link>
          </li>
          <li className="header__nav-element">
            <Link
              href={"/"}
              className={classNames(
                "header__nav-link",
                pathname === "/" && "header__nav-link_active"
              )}
              onClick={closeMenu}
            >
              Работы
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
