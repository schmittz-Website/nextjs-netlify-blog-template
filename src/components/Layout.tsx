import Head from "next/head";
import config from "../lib/config";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className={`root ${config.lighttheme ? 'light' :''}`}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <main>{children}</main>
      <footer>
        <p>© 2023, Schmittz</p>
      </footer>
      <style jsx>{`
        .root {
          color: var(--white);
        }
        .root.light {
          color: var(--black);
        }
        footer {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
        }
        footer p {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          color: var(--orange);
        }
      `}</style>
    </div>
  );
}
