import { Suspense } from "react"
import { Image, Link, useMutation, Routes, useParams, useQuery } from "blitz"
import Layout from "app/core/layouts/Layout"
import TopHeader from "app/core/components/TopHeader"
import db from "db"
import getProject from "app/projects/queries/getProject"
import getSection from "app/sections/queries/getSection"
import parse from "html-react-parser"

// This gets called on every request
export async function getServerSideProps() {
  const sections = await db.section.findMany()
  // console.log(sections)
  // Pass projects to the page via props
  return { props: { sections } }
}

function Project() {
  const [project, {refetch}] = useQuery(getProject, { id: 1 })
  // console.log("project:", JSON.stringify(project, null, 2))
  // console.log("refetch:", refetch)
  return <>
    <h1>{project.name}</h1>
  </>
}

const Section = (props) => {
  const params = useParams()
  const route = params.slug || ["home"]
  const fullRoute = route.toString().replace(/,/g, "/")
  // todo: fix this to use for sub-routes eventually
  const [section, {refetch}] = useQuery(getSection, { id: 1 })
  return <>
    <h1>{fullRoute}</h1>
    {parse(section.content)}
  </>
}


const Home = (props) => {
  const params = useParams()
  const route = params.slug || ["home"]
  const sections = props.sections
  //TODO: *** work on fixing for nested routes
  const links = sections.map((section) => {
    return { name: section.name, slug: section.link }
  })
  const section = sections.find((s) => s.link === route[0])



  return (
    <div className="container">
      <TopHeader links={links} />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Section />
        {/* <Project />
        {(section && (
          <div>
            <div id="content">
                {section.content || <p>default content</p>}
            </div>
          </div>
        )) || (
          <div id="404">
            <p><strong>404</strong> | you have tried to view a page that does not exist</p>
          </div>
        )} */}
        </Suspense>
      </main>

      <footer>
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by IvanM
        </a>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;1,300;1,700&display=swap');        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Josefin Sans', sans-serif;
          font-weight: 300;
          font-size: 24px;
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
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
          background-color: #45009d;
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
