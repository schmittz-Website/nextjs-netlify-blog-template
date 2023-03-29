import { useState, useMemo } from "react";
import Burger from "./Burger";

type Props = {
  data: any;
};

const getMenuItems = (data) => data.map((el, idx) => {
  return (
    <li key={idx}>
      <a href={''}>{el.menuitem}</a>
      <style jsx>{`
        li {
          font-family: 'Playfair Display', serif;
          margin-bottom: 1.75rem;
          font-size: 1.5rem;
        }

        &:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </li>
  )
})

export default function Navigation({ data }: Props) {
  const [active, setActive] = useState(false);

  const MenuItems = useMemo(() => getMenuItems(data), [data])
  
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <nav className={"container " + (active ? "active" : "")}>
        <ul>
          <hr />
            {MenuItems}
          <hr />
        </ul>
        <style jsx>{`
          nav {
            width: 100%;
            height: 100%;
            position: absolute;
            user-select: none;
            pointer-events: none;
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
            background-color: #fbf9f9;
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
        `}</style>
      </nav>
    </>
  );
}
