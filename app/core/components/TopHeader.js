import React, {useRef, Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import Hamburger from "hamburger-react"
import Button from '@mui/material/Button'

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Button variant="contained"
          onClick={async () => {
            await logoutMutation()
          }}>Logout
        </Button>
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
        <Button variant="contained" href={Routes.SignupPage().pathname}>Sign Up</Button>
        <Button variant="contained" href={Routes.LoginPage().pathname}>Login</Button>
      </>
    )
  }
}

export default function TopHeader(props) {
  // console.log("props", props)

  // TODO: work on fixing this into one possibly
  const [isHidden, setHidden] = useState(true)
  const [isOpen, setOpen] = useState(false);
  const [isActive, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!isActive);
  };

  setTimeout(() => {
    setHidden(false)
  }, 2000);

  const unhideRef = useRef()


  return (
    <div className="top-header" style={{width: "100%", padding: "10px", background: "#577ae3", color: "#FFF"}}>
      {/* <h1 style={{ float: "left" }}>{props.name}</h1> */}
      <h1 style={{float: "left"}}>CMS?</h1>
      {/* TODO work on fixing this logic .. better shorthand */}
      <Hamburger toggled={isOpen} onToggle={() => isOpen ? setOpen(false) : setOpen() & handleToggle()} />
      <div ref={unhideRef} id="menu-container" className={`${isHidden ? 'hide' : ''}  ${isActive ? "slideout" : "slidein"}`}>
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
      <style jsx global>{`
        .hide {
          opacity: 0;
        }
        .hamburger-react {
          position: absolute !important;
          z-index: 1 !important;
          top: 10px;
          right: 10px;
        }
        #menu-container ul a {
          color: #FFF;
        }
        #menu-container ul {
           list-style: none;
           padding: 0;
        }
        #menu-container {
            height: 100%;
            width: 40%;
            background: #577ae3;
            border: 1px solid black;
            padding: 80px 50px 0px 10px;
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            right: -30px;
        }
        #menu-container.slidein {
            animation: slidein .25s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        #menu-container.slideout {
            animation: slideout .25s cubic-bezier(.68,-0.55,.27,1.55) forwards;
        }
        @keyframes slidein {
          from {
            transform: translateX(0%);
          }

          to {
            transform: translateX(100%);
          }
        }
        @keyframes slideout {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0%);
          }
        }

      `}</style>
    </div>
  )
}
