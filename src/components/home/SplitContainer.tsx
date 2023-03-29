import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "../Navigation";
import Logo from "../../assets/logo.png";

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
  'firstsection': (content) => {
    const menuData = content.find(el => typeof el === 'object')
    const description = content.find(el => typeof el === 'string')
    return (
      <>
        <Navigation data={menuData}/>
        <div className={'center-content'}>
          <img src={Logo.src} width={Logo.width} height={Logo.height} />
          <hr />
          <p>{description}</p>
          <hr />
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
          <hr />
          <p>{contactInfo}</p>
          <hr />
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

const getSectionContent = (type, content) => sectionOptions[type](content)

export default function SplitContainer({ data }: Props) {

  const validSection = useMemo(() => {
    const sectionKey = Object.keys(data).find(key => {
      const validKey = key === 'firstsection' || key === 'secondsection' || key === 'defaultsection'
      if(validKey && Object.keys(data[key]).length > 1) return key;
    })
    return { type: sectionKey, ...data[sectionKey] }
  }, [data]);

  const { img, content, type, color, leftalign } = useMemo(() => {
    const { type, img, color, leftalign } = validSection
    const contentKeys = Object.keys(validSection).filter(key => key !== 'type' && key !== 'img' && key !== 'color' && key !== 'leftalign')
    const content = contentKeys.map(key => validSection[key])
    return { type, img, content, color, leftalign }
  }, [validSection]);

  const SectionContent = useMemo(() => getSectionContent(type, content), [type,content]);

  return (
    <div className={`container ${type}`}>
      <div className={'image-wrapper'} {...!leftalign && { style : { order: 1 } }}>
        <Image src={img} layout={'fill'} className={'cover-img'}/>
      </div>
      <div className={'text-wrapper'} style={{ backgroundColor: color }}>
        {SectionContent}
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .image-wrapper,
        .text-wrapper {
          display: flex;
          overflow: scroll;
        }

        .firstsection .text-wrapper {
          overflow: hidden;
        }

        .image-wrapper {
          position: relative;
        }

        .text-wrapper {
          position: relative;
        }

        @media (min-width: 769px) {
          .container {
          }
        }
      `}</style>
    </div>
  );
}
