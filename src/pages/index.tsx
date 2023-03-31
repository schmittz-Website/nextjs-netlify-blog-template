import { useMemo, useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SplitContainer, ScrollTop } from "../components/home";
import { SocialList } from "../components/SocialList";
import { fetchHomeSections } from "../lib/homesections";

type Props = {
  sections: any[];
};

const getHomeSections = (sections, setShowArrow) => {
  const validSection = () => {
    const validKeys = ['firstsection', 'secondsection']
    return validKeys.map(sectionKey => ({ type: sectionKey, ...sections[sectionKey] }))
  }
  const defaultSection = () => sections.default.map(section => ({ type: 'defaultsection', ...section.defaultsection }))

  const mergedArray = [...validSection(), ...defaultSection()]
  return mergedArray.map((section, idx) => {
    return <SplitContainer data={section} key={idx} setShowArrow={setShowArrow} />
  })
}

export default function Index({ sections }: Props) {
  const [showArrow, setShowArrow] = useState(false)

  const HomeSections = useMemo(() => getHomeSections(sections[0], setShowArrow), [sections]);

  return (
    <Layout>
      {HomeSections}
      <ScrollTop showArrow={showArrow} />
      {/* <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div>
          <h1>
            Hi, We're Next.js & Netlify<span className="fancy">.</span>
          </h1>
          <span className="handle">@nextjs-netlify-blog</span>
          <h2>A blog template with Next.js and Netlify...</h2>
          <SocialList />
        </div>
      </div> */}
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.75rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 2.25rem;
          }
        }
      `}</style>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sections = fetchHomeSections();
  return {
    props: {
      sections
    },
  };
};
