import { useEffect, useMemo, useState } from "react";
import Navigation from "../Navigation";
import Logo from "../../assets/logo.png";
import config from "../../lib/config";

type Props = {
  data: any;
};

const getOpeningHours = hours => hours.map((el, idx) => {
  return (
    <tr key={idx}>
      <td>{el.menuitem.day}</td>
      <td>{el.menuitem.hours}</td>
    </tr>
  )
})

const sectionOptions = {
  'firstsection': (content, isMobile, color) => {
    const { description, subline } = content
    return (
      <>
        <Navigation color={color} />
        <div className={'center-content'}>
          <img src={Logo.src} width={isMobile ? 100 : Logo.width} height={isMobile ? 100 : Logo.height}/>
          <span className={'divider'} />
          <p>{description}</p>
          <span className={'divider'} />
          <span>{subline}</span>
          <style jsx>{`
            span {
              font-family: 'Playfair Display', serif;
              font-style: italic;
            }
          `}</style>
        </div>
      </>
    )
  },
  'secondsection': (content) => {
    const { title, address, openinghours } = content
    return (
      <div className={'center-content'}>
        <h2>{title}</h2>
        <span className={'divider'} />
        <p>{address}</p>
        <span className={'divider'} />
        <table>
          <tbody>
            {getOpeningHours(openinghours)}
          </tbody>
        </table>
        <style jsx>{`
          p {
            white-space: break-spaces;
          }
        `}</style>
      </div>
    )
  },
  'defaultsection': (content) => content.body.lang === 'html' && <div className={'center-content'} dangerouslySetInnerHTML={{__html: content.body.code}}/>
}

const getSectionContent = (type, content, isMobile, color) => sectionOptions[type](content, isMobile, color)

export default function SplitContainer({ data }: Props) {
  const [ isMobile, setIsMobile ] = useState(false)
 
  const { images, content, type, color, leftalign } = useMemo(() => {
    const { type, images, color, leftalign } = data
    const contentKeys = Object.keys(data).filter(key => key !== 'type' && key !== 'images' && key !== 'color' && key !== 'leftalign')
    const contentObjects = contentKeys.map(key => ({[key]: data[key]}))
    const content = Object.assign({}, ...contentObjects)
    return { type, images, content, color, leftalign }
  }, [data]);

  const SectionContent = useMemo(() => getSectionContent(type, content, isMobile, color), [type, content, isMobile, color]);

  const updateSize = () => setIsMobile(window.innerWidth < 769 ? true : false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 769 ? true : false)
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [])

  return (
    <div className={`split-container ${type}`} id={data.title.replace(/\s/g, "").toLowerCase()} data-name={data.title}>
      <div className={'image-wrapper'} {...(!leftalign || isMobile) && { style : { order: 1 } }}>
        <div className={'inner-container'}>
          {images && images.map((el, idx) => <img key={idx} src={el.image} className={'cover-img'}/>)}
        </div>
      </div>
      <div className={'text-wrapper'} style={{ backgroundColor: config.lighttheme ? 'var(--white)' : color }}>
        <div className={'inner-container'}>
          {SectionContent}
        </div>
      </div>
      <style jsx>{`
        .split-container {
          min-height: 100vh;
          width: 100%;
          display: grid;
        }

        .image-wrapper,
        .text-wrapper {
          display: flex;
        }

        .text-wrapper {
          flex-flow: column;
        }

        .image-wrapper {
          overflow: scroll;
        }

        .image-wrapper img {
          height: 50vh;
          width: 80%;
        }

        .image-wrapper img:only-child {
          width: 100%;
        }

        .inner-container {
          display: contents;
          position: sticky;
          top: 0;
        }

        @media (min-width: 769px) {
          .split-container {
            grid-template-rows: unset;
            grid-template-columns: 1fr 1fr;
          }

          .inner-container {
            display: grid;
          }

          .image-wrapper {
            flex-flow: column;
            overflow: unset;
          }

          .image-wrapper img,
          .image-wrapper img:only-child {
            height: 100vh;
            width: 50vw;
          }
        }
      `}</style>
    </div>
  );
}
