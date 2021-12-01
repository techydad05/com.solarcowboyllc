import React, {useRef, Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import Hamburger from "hamburger-react"
import Button from "@mui/material/Button"
import { AppBar } from "@mui/material"
import { Grid } from "@mui/material"
import logo from "public/cmslogo.svg"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button variant="contained"
          onClick={async () => {
            await logoutMutation()
          }}>Logout</Button>
        <div>
          <br />
          Name: <code>{currentUser.name}</code>
          <br />
          Role: <code>{currentUser.role}</code>
          <br />
        </div>
      </>
    )
  } else {
    return (
      <>
        <Grid container spacing={1} justify="center">
          <Grid item>
            <Button color="primary" variant="contained" href={Routes.SignupPage().pathname}>Sign Up</Button>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" href={Routes.LoginPage().pathname}>Login</Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default function TopHeader(props) {
  // console.log("props", props)

  // TODO: work on fixing this into one possibly
  const [isOpen, setOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      <AppBar position="sticky" style={{minHeight: "11vh", background: "#577ae3", color: "#FFF", position: "relative", "overflow-x": "clip" }}>
        <Grid container alignItems="center" style={{padding:"10px"}}>
          <Grid item xs={2}>
            <Image layout="responsive" src={logo} alt="blitzjs" />
          </Grid>
          <Grid item xs={9}></Grid>
          <Grid item xs={1}>
            <Hamburger toggled={isOpen} onToggle={() => isOpen ? setOpen(false) : setOpen() & handleToggle()} />
          </Grid>
        </Grid>
        <div id="menu-container" className={`${isActive ? "slideout" : "slidein"}`}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        <ul>
          <strong>Admin:</strong>
          <li><Link href="/sections"><p style={{color: "#FFF", margin: "0", textAlign: "left", textDecoration: "underline", cursor: "pointer"}}>Sections</p></Link></li>
          <li><Link href="/projects"><p style={{color: "#FFF", margin: "0", textAlign: "left", textDecoration: "underline", cursor: "pointer"}}>Projects</p></Link></li>
          <br />
          <strong>Pages:</strong>
          {props.links.map((link, i) => (
            <li key={i}>
              <Link href={`/${link.slug}`}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      </AppBar>     {/* TODO work on fixing this logic .. better shorthand */}
      <style jsx global>{`
        .hide {
          opacity: 0;
        }
        .hamburger-react {
          float: right;
          z-index: 1 !important;
        }
        #menu-container ul a {
          color: #FFF;
        }
        #menu-container ul {
           list-style: none;
           padding: 0;
        }
        #menu-container {
         //   min-height: 87.6vh;
         //   overflow-y: hidden;
         //   height: 100%;
            width: 40%;
            background: #577ae3;
            padding: 10px;
            position: absolute;
            top: 100%;
         //   right: -30px;
         //   position: absolute;
         //   height: auto;
         //   top: 100%;
            box-shadow: -3px 0px 10px rgba(0,0,0.5,0.5);
        }
        #menu-container.slidein {
            animation: slidein .25s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        #menu-container.slideout {
            animation: slideout .25s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        @keyframes slidein {
          from {
            transform: translateX(150%);
          }

          to {
            transform: translateX(255%);
          }
        }
        @keyframes slideout {
          from {
            transform: translateX(255%);
          }

          to {
            transform: translateX(150%);
          }
        }

      `}</style>
    </>
  )
}
