import Arrowtop from "../../assets/arrowtop.svg";

export default function ScrollTop({ showArrow }) {
  const onClick = () => {
    history.replaceState(null, null, ' ');
    window.scrollTo(0, 0)
  }
  return (
    <div className={`container ${showArrow ? 'active' : ''}`} onClick={onClick}>
      <div className={'circle'}>
        <figure><Arrowtop /></figure>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          bottom: 25px;
          right: 25px;
          cursor: pointer;
          display: none;
        }

        .active {
          display: block;
        }

        .circle {
          background-color: var(--orange);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circle figure {
          margin: 0;
        }

        @media (min-width: 769px) {
          .container {
            bottom: 50px;
            right: 50px;
          }
        }
      `}</style>
    </div>
  );
}
