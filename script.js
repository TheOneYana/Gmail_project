
import { allInbox } from './all-emails.js';
// import { promotions } from './promotions.js';
// import { social } from './social.js';
const emailList = document.querySelector('.email-list');
const pageInfoSpan = document.querySelector('.pagenation');


function createEmail(emails) {
   for(let i=0; i<50; i++){
       const emailTime = (emails[i].date).toLocaleString('en-US',{
           hour: 'numeric',
           minute: 'numeric',
           hour12: true,
       });
       const eachEmail = ` <li class="email">
       <svg class="drag" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
       <div class="checkBoxHover">
       <input class="email-line checkbox" type="checkbox" name="check-${emails[i].id}" id="${emails[i].id}"  />
     </div>
     <div class="starHover">
       <svg class="'star" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
     </div>
     <div class="importantHover">
       <svg class="importantEmail" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 7H7.89l3.57 5-3.57 5H15l3.55-5z" opacity=".3"/><path d="M16.63 5.84C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16zM15 17H7.89l3.57-5-3.57-5H15l3.55 5L15 17z"/></svg>
     </div>
       <section class="sender">${emails[i].senderEmail} </section>
       <section class="subject">${emails[i].messageTitle}  <span class="emailContent"> - Hello, Student!  Welcome to our bootcamp! You going...</span> </section>
       <section class="time">${emailTime} </section>
     </li>`
     emailList.innerHTML += eachEmail;

   }
}

createEmail(allInbox)


// for(let i = 0; i<primary.length; i++)
// primary[i].id = i+1;

// console.log(primary);

// const allInbox = [...primary, ...social, ...promotions];

// module.exports = { primary, social, promotions, allInbox };
// console.log(allInbox);

const newEmails = allInbox.map((item, index) => ({id: index + 1,...item}));
console.log(newEmails)

const menuToggle = document.querySelector('#menu-toggle');
const sidebarLinks = document.querySelector('.sidebar-links');
const supportIcon = document.querySelector('#support-icon');
const supportLinks = document.querySelector('.support-links');
const profileIcon = document.querySelector('#profile-icon');
const accountInfo = document.querySelector('.account-info');
const appsIcon = document.querySelector('#apps-icon');
const googleApps = document.querySelector('.google-apps');
const headerMiddle = document.querySelector('.header-middle');
const main = document.querySelector('.main-container');
const search = document.querySelector('#search');


menuToggle.addEventListener('click',function () {
sidebarLinks.classList.toggle('hide-sidebar');
});

supportIcon.addEventListener('click', () => {
    supportLinks.classList.toggle('show-support');
} )

profileIcon.addEventListener('click', () => {
   accountInfo.classList.toggle('hide-account-info');
});

appsIcon.addEventListener('click', () => {
    googleApps.classList.toggle('hide-apps');
})

headerMiddle.addEventListener('click', () => {
    headerMiddle.classList.toggle('search-change');
})

function renderData(filteredData) {
    emailList.innerHTML = '';
    createEmail(filteredData);
    }
    
search.addEventListener('input', function (event) {
    const searchKey = event.target.value;
    const filteredData = allInbox.filter(item => {
        return item.messageTitle.toLowerCase().includes(searchKey.toLowerCase())
    });
    console.log(filteredData);
    renderData(filteredData);
    });
    

//Pagination. Uliana's part is needed to select buttons
// const pageInfoSpan = document.querySelector('#page-info');
// const prevBtn = document.querySelector('#prev');
// const nextBtn = document.querySelector('#next');
// const spinnerDiv = document.querySelector('#spinner');

// let pageNumber = 0;
// let limit = 15;

// function createEmails(emails) {
    // spinnerDiv.style.display ='block'
//console.log(Math.floor(emails.length/limit));  5
// console.log(pageNumber);

    // if(pageNumber<= 0) {
    //     prevBtn.disabled = true;
    // } else {
    //     prevBtn.disabled = false;
    // }

    // const lastPage = Math.floor(emails.length/limit);
    // if(pageNumber===lastPage) {
    //     nextBtn.disabled =true;
    // } else {
    //     nextBtn.disabled = false;
    // }

    // const start = pageNumber * limit; //0, 15,30
    // const end = (pageNumber +1) * limit;//15, 30, 45

    // const partialEmails= emails.slice(start, end);//[]

    // pageInfoSpan.innerText = `${start} - ${end} of ${emails.length}`;
//     for (let email of emails) {
//         const eachEmail = `<li id="${email.id}" class="email-item">
//         <input type="checkbox" name="check-${email.id}" id=${email.id}>
//         <i class="fa fa-star"></i>
//         <i class="fa fa-arrow-right"></i>
//         <div class="sender">
//         <span class="email-sender">${email.senderEmail}</span>
//         </div>
//         <div class="message">
//         <span class="email-message">${email.messageTitle}</span>
//         </div>
//         <div class="date">
//         <span class="email-date">${email.date}</span>
//         </div>
//     </li>`

//         emailList.innerHTML += eachEmail;
//     }
// }
// createEmails(allInbox)

// prevBtn.addEventListener('click', function() {});
//     emailList.innerHTML = '';
//     pageNumber++;
//     createEmails(allInbox)
// nextBtn.addEventListener('click', function() {
//     emailList.innerHTML = '';
//     pageNumber++;
//     createEmails(allInbox)
// })

// main.addEventListener('click', function(event){
//     console.log(event.target);
// })

//Tried to make Gulya's part work.
// const composeBtn = document.querySelector('.compose');
// composeBtn.addEventListener('mouseout', function(event) {
//     sidebarLinks.style.width = '265px';
//     console.log('hello')
// }, true);


