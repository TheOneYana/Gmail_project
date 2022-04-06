import { primary } from './primary.js';
// import { promotions } from './promotions';
// import { social } from './social';

const emailList = document.querySelector('.email-list');
const pageInfoSpan = document.querySelector('.pagenation');


function createEmail(emails) {
   for(let email of emails){
       const emailTime = new Date(email.date).toLocaleString('en-US',{
           hour: 'numeric',
           minute: 'numeric',
           hour12: true,
       });
       const eachEmail = ` <li class="email">
       <svg class="drag" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
       <div class="checkBoxHover">
       <input class="email-line checkbox" type="checkbox" name="check-${email.id}" id="${email.id}"  />
     </div>
     <div class="starHover">
       <svg class="'star" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
     </div>
     <div class="importantHover">
       <svg class="importantEmail" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 7H7.89l3.57 5-3.57 5H15l3.55-5z" opacity=".3"/><path d="M16.63 5.84C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16zM15 17H7.89l3.57-5-3.57-5H15l3.55 5L15 17z"/></svg>
     </div>
       <section class="sender">${email.senderEmail} </section>
       <section class="subject">${email.messageTitle}  <span class="emailContent"> - Hello, Student!  Welcome to our bootcamp! You going...</span> </section>
       <section class="time">${emailTime} </section>
     </li>`
     emailList.innerHTML += eachEmail;

   }
}

createEmail(primary)




// for(let i = 0; i<primary.length; i++)
// primary[i].id = i+1;

// console.log(primary);

// const allInbox = [...primary, ...social, ...promotions];

// module.exports = { primary, social, promotions, allInbox };
