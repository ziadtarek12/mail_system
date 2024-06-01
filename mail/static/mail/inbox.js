document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', () => compose_email("", reply=false));
  
  
  // By default, load the inbox
  load_mailbox('inbox');

  
  
}

  
);

function compose_email(email, reply) {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#click-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
  const compose = document.querySelector('#compose-view');
  const recipients = document.querySelector('#compose-recipients');
  const subject = document.querySelector('#compose-subject');
  const body = document.querySelector('#compose-body');
  if (reply === true){
      recipients.value = email.sender;
      if (!email.subject.includes("Re: ")) {
        subject.value = `Re: ${email.subject}`;
      }
      else{
        subject.value = `${email.subject}`;
      }
      
      body.value = `on ${email.timestamp} ${email.sender} wrote: ${email.body}`;
  }
  
  console.log(recipients);
  console.log(subject);
  console.log(body);
  compose.onsubmit = function(){
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recipients.value,
          subject: subject.value,
          body: body.value,
          read: false
      })
    })
    .then(response => response.json())
    .then(result => {
        // Print result
        console.log(result);
        load_mailbox('sent');
    });
  };
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#click-view').style.display = 'none';
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails
      console.log(emails);
      emails.forEach(email => {
          
          let element = document.createElement('div');
          console.log(element);
          element.setAttribute('id', 'email');
          element.setAttribute('onclick', `Email(${email.id})`);
          element.style.border = 'solid';
          
          if (email.read === true){
            element.style.backgroundColor = 'grey';
          }
          else{
            element.style.backgroundColor = 'white';
          }

          element.innerHTML = `${email.sender}<br>${email.subject}<br>${email.timestamp}<br><button id="email_id" onsubmit="return false;">${email.archived ? "UnArchive":"Archive"}</button>`;
          console.log(element);
          
          element.querySelector('#email_id').onclick = function(){
            if (email.archived === true){
              
              fetch(`/emails/${email.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    archived: false
                })
              });
              location.reload();
            }
            else{
              
              fetch(`/emails/${email.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    archived: true
                })
              });
              location.reload();
            }
          };
          document.querySelector('#emails-view').append(element);
          
      });
      // ... do something else with emails ...

      
  });

  
}


function Email(id){
  document.querySelectorAll('#email').forEach(div => {
    
  
      document.querySelector('#emails-view').style.display = 'none';
      document.querySelector('#compose-view').style.display = 'none';
      document.querySelector('#click-view').style.display = 'block';
      
      fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: true
        })
      })


      fetch(`/emails/${id}`)
      .then(response => response.json())
      .then(email => {
          // Print email
          console.log(email);
          document.querySelector('#click-view').innerHTML = `From: ${email.sender}<br>To: ${email.recipients}<br>Subject: ${email.subject}<br>TimeStamp: ${email.timestamp}<br>${email.body}<br><button id="reply">Reply</button>`;
          document.querySelector('#reply').onclick = function(){
                compose_email(email, true);
          };
          // ... do something else with email ...
      });
  });
}