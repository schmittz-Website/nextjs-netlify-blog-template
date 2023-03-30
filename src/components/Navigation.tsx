import { useState, useMemo } from "react";
import Burger from "./Burger";
import config from "../lib/config";

type Props = {
  data: any;
  color: string;
};

const getMenuItems = (data, config) => data.map((el, idx) => {
  return (
    <li key={idx} className={config.lighttheme ? "light" : ""}>
      <a href={''}>{el.menuitem}</a>
      <style jsx>{`
        li {
          font-family: 'Playfair Display', serif;
          margin-bottom: 1.75rem;
          font-size: 1.5rem;
        }

        .light a {
          color: var(--black);
        }

        &:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </li>
  )
})

export default function Navigation({ data, color }: Props) {
  const [active, setActive] = useState(false);

  const MenuItems = useMemo(() => getMenuItems(data, config), [data, config])
  
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <nav className={"container " + (active ? "active" : "")}>
        <ul style={config.lighttheme ? {backgroundColor: 'var(--white)'}: {backgroundColor: 'var(--black)'}}>
          <span className={'divider'} />
            {MenuItems}
          <span className={'divider'} />
        </ul>
        <style jsx>{`
          nav {
            width: 100%;
            height: 100%;
            position: absolute;
            user-select: none;
            pointer-events: none;
            z-index: 1;
          }
          .active {
            user-select: auto;
            pointer-events: auto;
          }
          ul {
            opacity: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            list-style: none;
            margin: 0;
            padding: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            z-index: 1;
            transform: translateY(100%);
            transition: opacity 200ms;
          }
          .active ul {
            opacity: 1;
            transform: translateY(0);
          }
          hr:first-of-type {
            margin-bottom: 1.75rem;
          }
          .divider:not(:last-of-type) {
            margin-bottom: 30px;
          }
        `}</style>
      </nav>
    </>
  );
}
