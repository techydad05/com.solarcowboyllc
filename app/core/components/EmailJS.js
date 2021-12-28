import emailjs from "emailjs-com"

export default function EmailJS(props) {
  if (props.form) {
    console.log("Loading EmailJS")
    var form = document.getElementById('form')
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = {
        'from_name':  this[0].value,
        'from_phone': this[1].value,
        'from_email': this[2].value,
        'message':    this[3].value
      };
      emailjs.send('default_service','template_8tfe3th', formData, props.formUserID)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
          console.log('FAILED...', err);
        });
        e.target.reset();
    });
  }
}
