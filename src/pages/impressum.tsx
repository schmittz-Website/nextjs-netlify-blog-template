import Layout from "../components/Layout";
import impressum from "../lib/impressum";
import Arrow from "../assets/arrow.svg";

export default function Impressum() {
  return (
    <Layout>
      <a href={'/'} className={'back'}>
        <figure><Arrow /></figure>
        <p>Home</p>
      </a>
      <h1>{impressum.title}</h1>
      <div>{impressum.text}</div>
      <style jsx>{`
        div {
          white-space: break-spaces;
          padding: 50px;
          max-width: 1000px;
          margin: auto;
          text-align: left;
        }
        .back {
          text-align: left;
          display: flex;
          align-items: center;
          margin: 50px 50px 0;
          column-gap: 25px;
        }
        .back figure {
          margin: 0;
        }
        .back p {
          height: 28px;
          color: var(--orange);
          font-size: 1.25rem;
          line-height: 1;
          font-family: 'Playfair Display', serif;
        }
      `}</style>
    </Layout>
  );
}
