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

// TODO: work on using the them in every area it makes sense
import theme from "theme"


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
        <ul>
          <strong>Admin:</strong>
          <li><Link href="/sections" prefetch={false}>Sections</Link></li>
          <li><Link href="/headers" prefetch={false}>Headers</Link></li>
          <li><Link href="/footers" prefetch={false}>Footers</Link></li>
        </ul>
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
        <br />
      </>
    )
  }
}

const MenuLinks = (props) => {
  return props.links.map((link, i) => {
    if (props.isMobile) {
      return (
        <div key={i} className="links" >
          <Link href={`/${link == "home" ? "/" : link}`} prefetch={false}>{link.replace(/-/g, ' ')}</Link>
        </div>
      )
    } else {
      return (
        <div key={i} className="links links-wrapper">
            <span class="inner-wrapper wrapper-14">
              <Link onClick={() => console.log("working")} passHref href={`/${link == "home" ? "/" : link}`} prefetch={false}>
                <a className="link hover-14">{link.replace(/-/g, ' ')}</a>
              </Link>
            </span>
        </div>
      )
    }
  })
}

export default function TopHeader(props) {
  // const [isOpen, setOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  // TODO work on fixing this so the the user is used in one function instead of both
  // cant use because it will need suspense to work
  // const currentUser = useCurrentUser()

  return (
    <>
      <AppBar position="sticky" style={{background: "#FFF", color: "#000", "overflow-x": "clip" }}>
        <Grid container alignItems="center" style={{padding:"10px"}}>
          <Grid item xs={4} sm={2}>
            {/* TODO: work on setting up topheader section to its own db object
            for image and other things */}
            <Image layout="responsive" src={props.topHeaderSection ? props.topHeaderSection.logo : logo} alt="blitzjs" />
          </Grid>
          <Grid item xs={7} sm={9} md={10}>
            <Grid container justifyContent={"flex-end"}>
              <Grid className="header-links" fluid={"true"} item sx={{display: {xs: "none", md: "flex"}}}>
                <MenuLinks links={props.links} />
              </Grid>
              <Grid fluid={"true"} item>
                {props.topHeaderSection ? props.topHeaderSection.content : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1} sx={{ display: {xl: "none", lg: "none", md: "none"}}}>
            {/* <Hamburger style={{float: "right !important", marginRight: "10px"}} toggled={isOpen} onToggle={() => setOpen(!isOpen)} /> */}
            <Hamburger style={{float: "right !important", marginRight: "10px"}} toggled={props.reloading} onToggle={() => props.setReloading(!props.reloading)} />
          </Grid>
        </Grid>
        <div id="menu-container" className={`${props.reloading ? "slideout" : ""} slidein`}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        <ul>
          <strong>Pages:</strong>
          <MenuLinks isMobile onClick={() => console.log("clicking link")} links={props.links} />
        </ul>
        <Grid fluid={"true"} item>
          {props.topHeaderSection ? props.topHeaderSection.content : null}
        </Grid>
      </div>
      </AppBar>
      {/* TODO: work on using sass or figuring out the global css cuz its not working */}
      <style jsx global>{`
        header .MuiGrid-root {
          padding: 0 0 0 5px !important;
        }
        .header-links {
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          text-transform: uppercase;
          font-weight: 400;
        }
        .header-links .links{
          margin-right: 10px;
          // padding-top: 4px;
        }
        .header-links .links:last-child {
          padding-top: 0;
        }
        .header-links .links::after {
          content: " |";
          position: relative;
          top: -2px;
        }
        .header-links .links:last-child:after {
          content: "";
        }
        .header-links .links a {
          text-decoration: none;
          color: #000 !important;
          transition: all 0.23s ease;
        }
        .header-links .links a:hover {
          /* TODO: work on this change to theme color */
          color: #00c853 !important;
        }
        .hide {
          opacity: 0;
        }
        .hamburger-react {
          float: right;
          z-index: 1 !important;
        }
        #menu-container ul a {
          color: #000 !important;
          text-transform: capitalize;
        }
        #menu-container ul {
           list-style: none;
           padding: 0;
        }
        #menu-container {
            width: 40%;
            /* TODO working on using just theme for styling to make it
            quicker to put sites up */
            background: ${theme.palette.menuContainer};
            color: ${theme.text.primary.dark};
            padding: 10px;
            position: absolute;
            top: 100%;
            box-shadow: -3px 0px 10px rgba(0,0,0.5,0.5);
            transition: all 0.25s cubic-bezier(.68,-0.55,.27,1.55);
        }
        .slidein {
          transform: translateX(255%);
        }
        .slideout {
          transform: translateX(155%);
        }
      `}</style>
    </>
  )
}
