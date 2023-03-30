import config from "../lib/config";

type Props = {
  active: boolean;
  onClick: () => void;
};
export default function Burger({ active, onClick }: Props) {
  return (
    <div className={"container " + (active ? "active " : "") + (config.lighttheme ? "light " : "")} onClick={onClick}>
      <div className={"meat meat-1"} />
      <div className={"meat meat-2"} />
      <div className={"meat meat-3"} />
      <p>{active ? "CLOSE" : "MENU"}</p>
      <style jsx>{`
        .container {
          position: absolute;
          width: 100%;
          height: 68px;
          cursor: pointer;
          top: 1rem;
          z-index: 2;
        }
        .meat {
          position: absolute;
          width: 48px;
          height: 2px;
          background: var(--white);
          top: calc(50% - 2px / 2);
          left: calc(50% - 48px / 2);
          transition: all 150ms ease-in;
        }
        .light .meat {
          background: var(--black);
        }
        .meat-1 {
          transform: translateY(-12px);
        }
        .meat-2 {
          width: calc(48px - 6px);
        }
        .meat-3 {
          transform: translateY(12px);
        }
        .active .meat-1 {
          transform: rotate(45deg);
        }
        .active .meat-2 {
          opacity: 0;
        }
        .active .meat-3 {
          transform: rotate(-45deg);
        }
        p {
          font-family: 'Playfair Display', serif;
          position: absolute;
          width: 100%;
          top: 48px;
          color: var(--orange);
        }
      `}</style>
    </div>
  );
}
