import { Suspense, useState, useEffect } from "react"
import Layout from "app/core/layouts/Layout"
import TopHeader from "app/core/components/TopHeader"
import db from "db"
import parse from "html-react-parser"
import { CircularProgress, Grid } from "@mui/material"
import ReactPlayer from "react-player/lazy"
import theme from "theme"
import { dynamic, useRouter, useParams, useQuery } from "blitz"
import Page404 from "./404"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import getSectionByName from "app/sections/queries/getSectionByName"
import "animate.css"
// TODO: work on figuring out how to do this the correct way?
const EmailJS = dynamic(() => import("app/core/components/EmailJS"),
  { ssr: false }
)

// export async function getStaticPaths() {
//   return {
//       paths: [], //indicates that no page needs be created at build time
//       fallback: 'blocking' //indicates the type of fallback
//   }
// }

// export async function getStaticProps(props) {
//   // const { slug } = props.params
//   const route = props.params[0] || "home"
//   const sections = await db.section.findMany()
//   const section = await db.section.findFirst({where: {link: route}})
//   console.log("section", section)
//   return {
//     props: {
//       route,
//       sections,
//       section,
//     },
//     revalidate: 1,
//   }
// }

export async function getServerSideProps(props) {
  const route = props.params[0] || "home"
  const sections = await db.section.findMany()
  // figure out how to use the useRouter hook to get the route in here
  // const section = await db.section.findFirst({where: {link: "home"}})
  return {
    props: {
      // is route needed?
      // section,
      route,
      sections,
      formId: process.env.FORM_USER_ID
    },
  }
}

const Section = (props) => {
  const router = useRouter()
  const params = useParams()
  const route = params.slug || ["home"]

  const [sectionFocus, setSectionFocus] = useState(false)
  const checkFormFocused = (target) => {
    if (target.parentNode.parentNode.id === "form") {
      setSectionFocus(true)
      console.log("form focused")
    }
  }

  useEffect(() => {
    NProgress.configure({ parent: 'header', showSpinner: false })
    const handleStart = (url) => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  const section = props.sections.find(e => e.link === route[0])
  return <>
     {section.video ? <div>
        <ReactPlayer fallback={<CircularProgress />} width={"100%"} className="video-player" url={`${section.video}`} wrapper={'p'} loop muted playing playsinline />
      </div> : null}
    <main>
      <div onClick={(e) => checkFormFocused(e.target)} style={{flex: "1 0 0%"}}>
        {section ? parse(section.content) : <Page404 />}
      </div>
    </main>
    {sectionFocus ? <EmailJS formUserID={props.formId} form={section.form} /> : null}
  </>
  // // TODO: FIX TO GET WORKING AGAIN FOR CHANGING DATA WITH ROUTES
  // // AND THEN SEE IF I CAN DO IT A CLEANER WAY USING THE SECTIONS
  // // AFTER LOADED ONCE?
}

const Home = (props) => {
  //TODO: *** work on fixing for nested routes
  // and using links or db?
  // const links = props.sections.map((section) => {
  //   return { name: section.name, slug: section.link }
  // })

  return (
    <Grid className="main-container" container>
      <TopHeader links={props.sections.map((s) => s.link )}  />
      <div>
        <Suspense fallback={<div className="progress-div"><CircularProgress /></div>}>
          {/* <div onClick={(e) => checkFormFocused(e.target)} style={{flex: "1 0 0%"}}> */}
            <Section sections={props.sections} formId={props.formId} />
          {/* </div> */}
          {/* TODO: work on fixing this into having multiple sections per page
          and figuring out why I cant get it to load dynamically after daya is present */}
          {/* {sectionFocus ? <EmailJS formUserID={props.formUserID} form={props.section.form} /> : null} */}
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
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;1,300;1,700&display=swap');

        html,body {
          padding: 0;
          margin: 0;
          font-family: 'Josefin Sans', sans-serif !important;
          font-weight: 300 !important;
          font-size: 24px;
          overflow-x: hidden;
          height: 100%;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }

        #__next {
          height: 100%;
        }

        .main-container {
          display: block;
          min-height: 100%;
        }

        header > .MuiGrid-root {
          z-index: 3;
        }

        .video-player {
          height: 100% !important;
          margin: 0 !important;
        }

        .video-div {
          width: 100%;
        }

        .progress-div {
          min-height: 79vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #nprogress {
          z-index: 1;
        }

        #nprogress .peg {
          box-shadow: 0 0 10px #22dd62, 0 0 5px #22dd62;
        }

        #nprogress .bar {
          height: 100%;
          background: #00C853;
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

        // adding custom animations

        .link-cont {
          position: relative;
          font-size: 24px;
        }
        .link {
          display: inline-block;
          position: relative;
          text-decoration: none;
          padding: 10px 0;
          color: #000;
        }
        .link-wrapper {
          position: relative;
          display: block;
          padding: 20px 0;
        }
        .inner-wrapper {
          position: relative;
          display: inline-block;
        }

        .wrapper-14:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: #00c853;
          transform: scaleY(0);
          transition: transform 0.3s;
        }
        .wrapper-14:after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 3px;
          height: 100%;
          background-color: #00c853;
          transform: scaleY(0);
          transition: transform 0.3s;
        }
        .wrapper-14 .hover-14 {
          padding: 10px;
        }
        .wrapper-14 .hover-14:before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 3px;
          background-color: #00c853;
          transform: scaleX(0);
          transition: transform 0.3s;
        }
        .wrapper-14 .hover-14:after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 3px;
          background-color: #00c853;
          transform: scaleX(0);
          transition: transform 0.3s;
        }
        .wrapper-14:hover:before,
        .wrapper-14:hover:after {
          transform: scaleY(1);
        }
        .wrapper-14:hover .hover-14:before,
        .wrapper-14:hover .hover-14:after {
          transform: scaleX(1);
        }
      `}</style>
    </Grid>
  )
}

Home.suppressFirstRenderFlicker = true

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
