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
    const menuData = content.find(el => typeof el === 'object')
    const description = content.find(el => typeof el === 'string')
    return (
      <>
        <Navigation data={menuData} color={color} />
        <div className={'center-content'}>
          <img src={Logo.src} width={isMobile ? 100 : Logo.width} height={isMobile ? 100 : Logo.height}/>
          <span className={'divider'} />
          <p>{description}</p>
          <span className={'divider'} />
          <span>Berlin</span>
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
    const openingHours = content.find(el => typeof el === 'object')
    const contactInfo = content.find(el => typeof el === 'string')
    return (
      <>
        <div className={'center-content'}>
          <h2>KONTAKT</h2>
          <span className={'divider'} />
          <p>{contactInfo}</p>
          <span className={'divider'} />
          <table>
            <tbody>
              {getOpeningHours(openingHours)}
            </tbody>
          </table>
          <style jsx>{`
            p {
              white-space: break-spaces;
            }
          `}</style>
        </div>
      </>
    )
  },
  'defaultsection': (content) => content[0].lang === 'html' && <div className={'center-content'} dangerouslySetInnerHTML={{__html: content[0].code}}/>
}

const getSectionContent = (type, content, isMobile, color) => sectionOptions[type](content, isMobile, color)

export default function SplitContainer({ data }: Props) {
  const [ isMobile, setIsMobile ] = useState(false)

  const validSection = useMemo(() => {
    const sectionKey = Object.keys(data).find(key => {
      const validKey = key === 'firstsection' || key === 'secondsection' || key === 'defaultsection'
      if(validKey && Object.keys(data[key]).length > 1) return key;
    })
    return { type: sectionKey, ...data[sectionKey] }
  }, [data]);

  const { images, content, type, color, leftalign } = useMemo(() => {
    const { type, images, color, leftalign } = validSection
    const contentKeys = Object.keys(validSection).filter(key => key !== 'type' && key !== 'img' && key !== 'color' && key !== 'leftalign')
    const content = contentKeys.map(key => validSection[key])
    return { type, images, content, color, leftalign }
  }, [validSection]);

  const SectionContent = useMemo(() => getSectionContent(type, content, isMobile, color), [type, content, isMobile, color]);

  const updateSize = () => setIsMobile(window.innerWidth < 769 ? true : false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 769 ? true : false)
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [])

  return (
    <div className={`container ${type}`}>
      <div className={'image-wrapper'} {...(!leftalign || isMobile) && { style : { order: 1 } }}>
        <div className={'inner-container'}>
          {images && images.map((el, idx) => <img key={idx} src={el.image} className={'cover-img'}/>)}
        </div>
      </div>
      <div className={'text-wrapper'} style={{ backgroundColor: config.darktheme ? 'var(--black)' : color }}>
        <div className={'inner-container'}>
          {SectionContent}
        </div>
      </div>
      <style jsx>{`
        .container {
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
          .container {
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
