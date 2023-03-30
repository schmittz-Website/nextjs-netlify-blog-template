import { useState, useMemo, useEffect } from "react";
import Burger from "./Burger";
import config from "../lib/config";

type Props = {
  data: any;
  color: string;
};

const getMenuItems = (menuItems, config) => menuItems.map((el, idx) => {
  return (
    <li key={idx} className={config.lighttheme ? "light" : ""}>
      <a href={el.link ?? `#${el.anchor}`}>{el.name}</a>
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
  const [menuItems, setMenuItems] = useState([]);

  const MenuItems = useMemo(() => getMenuItems(menuItems, config), [menuItems, config])

  useEffect(() => {
    const nodes = document.querySelectorAll('.split-container[id][data-name]')
    const [, ...rest] = Array.from(nodes).map(node => {
      return { 
        'name': (node as HTMLElement).dataset.name,
        'anchor': node.id
      }
    })
    setMenuItems([...rest, { 'name': 'Impressum', 'link': '/impressum' }])
  }, [data])
  
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <nav className={"container " + (active ? "active" : "")}>
        <ul style={config.lighttheme ? {backgroundColor: 'var(--white)'}: {backgroundColor: color}}>
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
