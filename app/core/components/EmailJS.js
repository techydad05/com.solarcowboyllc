import Script from "next/script"
import { useEffect } from "react"

const EmailJS = (props) => {
  useEffect(() => {
    // if (props.isData) {
    //   emailjs.init('user_sfHHqVix3VlKerTBKwc66')
    //   const btn = document.getElementById('button');

    //   document.getElementById('form')
    //   .addEventListener('submit', function(event) {
    //     event.preventDefault();

    //     btn.value = 'Sending...';

    //     const serviceID = 'default_service';
    //     const templateID = 'template_8tfe3th';

    //     emailjs.sendForm(serviceID, templateID, this)
    //       .then(() => {
    //         btn.value = 'Send Email';
    //         alert('Sent!');
    //       }, (err) => {
    //         btn.value = 'Send Email';
    //         alert(JSON.stringify(err));
    //       });
    //   });
    // }
  })
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js" strategy="beforeInteractive" />
    </>
  )
}

export default EmailJS
