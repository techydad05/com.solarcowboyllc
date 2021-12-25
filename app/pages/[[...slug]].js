import { Suspense } from "react"
import { Image, Link, useMutation, Routes, useParams, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import TopHeader from "app/core/components/TopHeader"
import db from "db"
import getProject from "app/projects/queries/getProject"
import getSectionByName from "app/sections/queries/getSectionByName"
import parse from "html-react-parser"
import { CardMedia, CircularProgress } from "@mui/material"
import EmailJS from "app/core/components/EmailJS"
import ReactPlayer from "react-player/lazy"
import theme from "theme"

// This gets called on every request
export async function getServerSideProps() {
  // get section not including top-header
  const sections = await db.section.findMany({ where: { link: { not: "top-header" }}})
  // get top-header
  const topHeader = await db.section.findFirst({ where: { link: "top-header" }})
  // Pass sections and topheader? to the page via props
  return { props: { sections: sections, topHeader: topHeader } }
}


// TODO: work on setting this to show a different page
// when no data is available at all
// work on making the loading more instant on clicking the link
const NoDataPage = () => {
  return <div className="no-data-container">
      <CircularProgress color="warning" />
    </div>
}


const Section = (props) => {
  const params = useParams()
  const route = params.slug || ["home"]
  // todo: fix this to use for sub-routes eventually
  // const fullRoute = route.toString().replace(/,/g, "/")
  try {
    const [section, {refetch}] = useQuery(getSectionByName, { link: route[0] })
    return <>
      {section.video ? <div className="video-div">
        <ReactPlayer width={"100%"} className="video-player" url={`${section.video}`} wrapper={'p'} loop muted playing playsinline />
        </div> : null}
      <main>
        <div className="main-div">
          {section ? parse(section.content) : null}
        </div>
      </main>
    </>
  } catch (error) {
    console.log("error:", error)
    return <NoDataPage />
  }
}


const Home = (props) => {
  //TODO: *** work on fixing for nested routes
  const links = props.sections.map((section) => {
    return { name: section.name, slug: section.link }
  })

  return (
    <div className="container">
      <TopHeader links={links} topHeaderSection={props.topHeader} />
        <Suspense fallback={<div className="progress-div"><CircularProgress /></div>}>
          <Section />
          {/* TODO: move this to section check if has form in it? */}
          <EmailJS isData={props.sections.length > 0} />
        </Suspense>
      <footer style={{background: theme.palette.primary.main}}>
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by IvanM & BlitzJS
        </a>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;1,300;1,700&display=swap');        html,

        body {
          padding: 0;
          margin: 0;
          font-family: 'Josefin Sans', sans-serif !important;
          font-weight: 300 !important;
          font-size: 24px;
          overflow-x: hidden;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }

        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .main-div {
          min-heigth: 60vh;
        }

        .video-player {
          height: 100% !important;
          margin: 0 !important;
        }

        .video-div {
          width: 100%;
        }

        main {
          padding: 2.5rem .65em;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .progress-div {
          min-height: 79vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .no-data-container {
          min-height: 76.5vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }

        button {
          padding: 7px 16px 3px 16px !important;
          color: #fff !important;
          font-family: "Josefin Sans", sans-serif !important;
        }

        #menu-container a {
          padding: 7px 16px 3px 16px !important;
          color: #fff !important;
          font-family: "Josefin Sans", sans-serif !important;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #43AF3A;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          color: #f4f4f4;
          text-decoration: none;
        }

        .logo {
          margin-bottom: 2rem;
        }

        .logo img {
          width: 300px;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
