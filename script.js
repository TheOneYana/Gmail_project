// Importing all the databases:
import { primary } from './primary.js';
import { promotions } from './promotions.js';
import { social } from './social.js';

// Creating all global variables:
const allInbox = [...primary, ...social, ...promotions];
const menu = document.querySelector('#menu');
const sideLeft = document.querySelector('#hover-left');

const displayedMp = document.querySelector("#displayedMp");
const displayedHp = document.querySelector("#displayedHp");
const smallCompose = document.querySelector('.composebtn');
const bigCompose = document.querySelector('.composebtn-displayed');
const emailList = document.querySelector('.email-list');
const pageInfoSpan = document.querySelector('.pages');
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const expanCategory = document.querySelector('#expanded-category')
const expandedMore = document.querySelector("#expanded-more")

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
const sidebar =document.querySelector('.left-side-menu');

let pageNumber = 0;
let limit = 50;
let newStarred = allInbox.filter(em => em.tags.isStarred);
let newSpam = allInbox.filter(em => em.tags.isSpam);
let newTrash = allInbox.filter(em => em.tags.isTrash);
console.log("Trash", newTrash)

let emails = allInbox;  // My Hero  line!!!

    create_emails()

prevBtn.addEventListener('click', function () {
    emailList.innerHTML = '';
    pageNumber--;
    create_emails();
});

nextBtn.addEventListener('click', function () {
    console.log('NEXT', pageNumber)
    emailList.innerHTML = '';
    pageNumber++;
    create_emails();
});

function create_emails() {
    console.log('pageNumber:', pageNumber)
    emailList.innerHTML = '';
    
    if (pageNumber === 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    const lastPage = Math.floor(emails.length / limit);
    if (pageNumber === lastPage) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
    const start = pageNumber * limit; // 0, 15, 30
    const end = (pageNumber + 1) * limit; // 15, 30, 45

    const partialEmails = emails.slice(start, end); //[]

    pageInfoSpan.innerText = `${start+1}-${end} of ${emails.length}`;
    
    for (let email of partialEmails) {
        const emailTime = email.date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        });

        const eachEmail = ` <li class="email">
        <div class = 'one'>
        <svg class="drag" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        <div class="checkBoxHover">
        <input class="email-line checkbox" type="checkbox" name="check-${email.id}" id="${email.id}"  />
        </div>
        <div class="starHover">
        <span class="material-icons starredSide star-${email.tags.isStarred}" style="color:white">star_border</span>
        </div>
        <div class="importantHover">
        <svg class="importantEmail" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 7H7.89l3.57 5-3.57 5H15l3.55-5z" opacity=".3"/><path d="M16.63 5.84C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16zM15 17H7.89l3.57-5-3.57-5H15l3.55 5L15 17z"/></svg>
        </div>
        <section class="sender">${email.senderEmail} </section>
        <section class="subject">${email.messageTitle}<span class="emailContent"> - ${email.messages[0].message}</span></section> 
        </div>
        <div class = 'two'>
        <section class="time">${emailTime} </section>
        </div>
      </li>`
        
        emailList.innerHTML += eachEmail;
    }
//Search filter and display
// function renderData(filteredData) {
//     emailList.innerHTML = '';
//     create_emails(filteredData);
//     }
    
search.addEventListener('input', function (event) {
    const searchKey = event.target.value;
    const filteredData = allInbox.filter(item => {
        return item.messageTitle.toLowerCase().includes(searchKey.toLowerCase())
    });
    emails = filteredData;
    create_emails();
    // console.log(filteredData);
    // renderData(filteredData);
    });



    //It's click function in the middle part for the for starred icons  
    document.body.addEventListener('click', function(event){
        // console.log(event.target.document.querySelector('#starredSide'))
        if (event.target.className.includes('starredSide')){
        const starredSide = event.target;
        if (starredSide.innerHTML === "star_border") {
                starredSide.innerHTML = "star";    
        } else if (starredSide.innerHTML === "star") {
                starredSide.innerHTML = "star_border";
        }    
        }
        });
    document.querySelector(".totalInbox").innerHTML = primary.length;
    document.querySelector('.totalSnum').innerHTML = social.length;
    document.querySelector('.totalPnum').innerHTML = promotions.length;
    document.querySelector('.totalSpam').innerHTML = newSpam.length;
}

const primarySection = document.querySelector('.primary');

primarySection.addEventListener('click', function(){
    pageNumber = 0;
    emails = primary;
    console.log(emails);
    create_emails();
    
}); 

const socialSection = document.querySelector('.socialEmailsTop');

socialSection.addEventListener('click', function(){
pageNumber = 0;
emails = social;
console.log(emails);
create_emails();
});

const promotionsSection = document.querySelector('.promotionsEmailsTop');

promotionsSection.addEventListener('click', function(){
pageNumber = 0;
emails = promotions;
console.log(emails);
create_emails();
});


const icons = document.querySelectorAll('[id = sidebarIcons]');
    console.log(icons.length)
    for (let i = 0; i < icons.length; i++){
        icons[i].addEventListener('click', function () {
            let j = 0;
            while(j < icons.length){
                icons[j++].className = " "
            }
            icons[i].setAttribute('class', 'changeColor');
            // Inbox sidebar 
            if (i === 0){
                console.log('Primary ', i)
                pageNumber = 0;
                emails = primary;
                create_emails();
                icons[0].setAttribute('class', 'changeColorpink');
                document.querySelector('.inbox').style.color = "rgb(234, 17, 85)";
            } else {
            document.querySelector('.inbox').style.color = "";
            icons[0].classList.remove('changeColorpink');
            }
            // Starred sidebar
            if (i === 1) {
                console.log('NEWMAILS ', i)
                pageNumber = 0;
                emails = newStarred;
                create_emails();
            }
            // Category sidebar
            if (i === 6){
                if (expanCategory.style.display !== 'none'){
                    expanCategory.style.display = "none";
                    document.getElementById('arrow').innerHTML = "arrow_right";
                } else {
                    expanCategory.style.display = "block";
                    document.getElementById('arrow').innerHTML = "arrow_drop_down";
                }
            }
            // Social sidebar
            if (i === 7) {
                console.log('SOCIAL ', i)
                pageNumber = 0;
                emails = social;
                create_emails();
                icons[7].setAttribute('class', 'changeColorblue')
                document.querySelector('.social').style.color = "#1a73e8";
            } else {
                icons[7].classList.remove('changeColorblue')
                document.querySelector('.social').style.color = "";
            }
            // Promotions sidebar
            if (i === 9) {
                console.log('PROMOTIONS ', i)
                pageNumber = 0;
                emails = promotions;
                create_emails();   
            icons[9].setAttribute('class', 'changeColorgreen');
            document.querySelector('.promotions').style.color = "#188038";
            } else {
                document.querySelector('.promotions').style.color = "";
                icons[9].classList.remove('changeColorgreen');
            }
            // More sidebar
            if (i === 11){
            if (expandedMore.style.display !== 'none'){
                expandedMore.style.display = "none";
                document.querySelector('.more').innerHTML = "expand_more";
                document.querySelector('.more-less').innerHTML = "More";
            } else {
                expandedMore.style.display = "block";
                document.querySelector('.more').innerHTML = "expand_less";
                document.querySelector('.more-less').innerHTML = "Less";
            }
            }
            // All Mail sidebar 
            if (i === 14) {
                console.log('allInbox', i)
                pageNumber = 0;
                emails = allInbox;
                create_emails();
            }
            // Spam sidebar
            if (i === 15) {
                console.log('Spam ', i)
                pageNumber = 0;
                emails = newSpam;
                create_emails();
            }
            // Trash sidebar
            if (i === 16) {
                if(newTrash.length === 0) {
                emailList.innerHTML = "No conversations in Trash.";
                emailList.style.textAlign = "center";
                pageInfoSpan.innerText = " ";
                } else {
                console.log('Trash', i)
                pageNumber = 0;
                emails = newTrash;
                create_emails(); 
                }
            }
        })
    }

//Sidebar mouseover effect
sideLeft.addEventListener('mouseover', () => {
    if (sideLeft.style.width === "73px"){
        sideLeft.style.width ='265px';
        smallCompose.style.display = "none";
        bigCompose.style.display = "block";
        displayedHp.style.display = "block";
        displayedMp.style.display = "block";
        footerDisp.style.display = "none";
        footerDiv.style.display = "block";
        }
})

sideLeft.addEventListener('mouseout', () => {
    if (sideLeft.style.width === "265px"){
        sideLeft.style.width = '73px';
        smallCompose.style.display = "block";
        bigCompose.style.display = "none";
        displayedHp.style.display = "none";
        displayedMp.style.display = "none";
        footerDisp.style.display = "block";
        footerDiv.style.display = "none";
    }
})

// Menu button click
    const footerDisp = document.querySelector(".footer-button");
    const footerDiv = document.querySelector("#leftSideFooter")
menuToggle.addEventListener('click',() =>{
    if (sideLeft.style.width ==='265px') {
        sideLeft.style.width = '73px';
        smallCompose.style.display = "block";
        bigCompose.style.display = "none";
        displayedHp.style.display = "none";
        displayedMp.style.display = "none";
        footerDisp.style.display = "block";
        footerDiv.style.display = "none";
    } else {
        sideLeft.style.width ='265px';
        smallCompose.style.display = "none";
        bigCompose.style.display = "block";
        displayedHp.style.display = "block";
        displayedMp.style.display = "block";
        footerDisp.style.display = "none";
        footerDiv.style.display = "block";
    }
});
    // if ( bigCompose.style.width ==='180px') {
    //     bigCompose.style.width = '70px';  
    // } else {
    //     bigCompose.style.width = '180px';
    // }
    // if (smallCompose.style.display = 'block') {
    //     smallCompose.style.display = 'none'
    // } else {
    //     smallCompose.style.display = 'block';
    // }
    // if (composeP.style.visibility==='visible') {
    //     composeP.style.visibility= 'hidden';
    // } else {
    //     composeP.style.visibility = 'visible';
    // }
    // if (displayedMp.style.visibility === 'visible') {
    //     displayedMp.style.visibility = 'hidden';
    // } else { 
    //     displayedMp.style.visibility ='visible';
    // }
    // if (displayedHp.style.visibility === 'visible') {
    //     displayedHp.style.visibility = 'hidden';
    // } else { 
    //     displayedHp.style.visibility ='visible';
    // }


//Header icons toggle
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

// previous Code
// import { allInbox } from './all-emails.js';
// // import { promotions } from './promotions.js';
// // import { social } from './social.js';
// const emailList = document.querySelector('.email-list');
// const pageInfoSpan = document.querySelector('.pagenation');


// function createEmail(emails) {
//    for(let i=0; i<50; i++){
//        const emailTime = (emails[i].date).toLocaleString('en-US',{
//            hour: 'numeric',
//            minute: 'numeric',
//            hour12: true,
//        });
//        const eachEmail = ` <li class="email">
//        <div class = 'one'>
//        <svg class="drag" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
//        <div class="checkBoxHover">
//        <input class="email-line checkbox" type="checkbox" name="check-${emails[i].id}" id="${emails[i].id}"  />
//      </div>
//      <div class="starHover">
//        <svg class="'star" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
//      </div>
//      <div class="importantHover">
//        <svg class="importantEmail" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 7H7.89l3.57 5-3.57 5H15l3.55-5z" opacity=".3"/><path d="M16.63 5.84C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16zM15 17H7.89l3.57-5-3.57-5H15l3.55 5L15 17z"/></svg>
//      </div>
//        <section class="sender">${emails[i].senderEmail} </section>
//        <section class="subject">${emails[i].messageTitle}<span class="emailContent"> - ${emails[i].messageTitle}</span></section> 
//        </div>
//        <div class = 'two'>
//        <section class="time">${emailTime} </section>
//        </div>
//      </li>`
//      emailList.innerHTML += eachEmail;

//    }
// }

// createEmail(allInbox)


// for(let i = 0; i<primary.length; i++)
// primary[i].id = i+1;

// console.log(primary);



// module.exports = { primary, social, promotions, allInbox };
// console.log(allInbox);

// Previous variables (they are above now):
// const newEmails = allInbox.map((item, index) => ({id: index + 1,...item}));
// console.log(newEmails)
// const menuToggle = document.querySelector('#menu-toggle');
// const sidebarLinks = document.querySelector('.sidebar-links');
// const supportIcon = document.querySelector('#support-icon');
// const supportLinks = document.querySelector('.support-links');
// const profileIcon = document.querySelector('#profile-icon');
// const accountInfo = document.querySelector('.account-info');
// const appsIcon = document.querySelector('#apps-icon');
// const googleApps = document.querySelector('.google-apps');
// const headerMiddle = document.querySelector('.header-middle');
// const main = document.querySelector('.main-container');
// const search = document.querySelector('#search');


// menuToggle.addEventListener('click',() =>{
//     if (sidebar.style.width ==='265px') {
//         sidebar.style.width = '50px';
//     } else {
//         sidebar.style.width ='265px';
//     }
// }) 

// supportIcon.addEventListener("click", () => {
//   supportLinks.classList.toggle("show-support");
// });

// profileIcon.addEventListener("click", () => {
//   accountInfo.classList.toggle("hide-account-info");
// });

// appsIcon.addEventListener("click", () => {
//   googleApps.classList.toggle("hide-apps");
// });

// headerMiddle.addEventListener("click", () => {
//   headerMiddle.classList.toggle("search-change");
// });

// function renderData(filteredData) {
//   emailList.innerHTML = "";
//   createEmail(filteredData);
// }

// search.addEventListener("input", function (event) {
//   const searchKey = event.target.value;
//   const filteredData = allInbox.filter((item) => {
//     return item.messageTitle.toLowerCase().includes(searchKey.toLowerCase());
//   });
//   console.log(filteredData);
//   renderData(filteredData);
// });

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
const composeBtn = document.querySelector('.compose');
// composeBtn.addEventListener('mouseout', function(event) {
//     sidebarLinks.style.width = '265px';
//     console.log('hello')
// }, true);




// Aimana's Part

const closeBtn = document.querySelector(".close-btn");
const popup = document.querySelector(".popup");
const calendarPopup = document.querySelector(".calendar-popup");

calendar.addEventListener("click", () => {
  popup.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

const second_popup = document.querySelector(".second-popup");
const closeBtn2 = document.querySelector(".close-btn2");
const keepPopup = document.querySelector(".keep-popup");

keep.addEventListener("click", () => {
  second_popup.style.display = "flex";
});
closeBtn2.addEventListener("click", () => {
  second_popup.style.display = "none";
});


const third_popup = document.querySelector(".third-popup");
const closeBtn3 = document.querySelector(".close-btn3");
const taskPopup = document.querySelector(".task-popup");

tasks.addEventListener("click", () => {
    third_popup.style.display = "flex";
});
closeBtn3.addEventListener("click", () => {
    third_popup.style.display = "none";
});

const fourth_popup = document.querySelector(".fourth-popup");
const closeBtn4 = document.querySelector(".close-btn4");
const contactPopup = document.querySelector(".calendar-popup");

contacts.addEventListener("click", () => {
    fourth_popup.style.display = "flex";
});
closeBtn4.addEventListener("click", () => {
    fourth_popup.style.display = "none";
});

// const fifth_popup = document.querySelector(".fifth-popup");
// const closeBtn5 = document.querySelector(".close-btn5");
// const addPopup = document.querySelector(".add-popup");

// add.addEventListener("click", () => {
//     fifth_popup.style.display = "flex";
// });
// closeBtn5.addEventListener("click", () => {
//     fifth_popup.style.display = "none";

// sidebarLinks.addEventListener('mouseover', () => {
//     composeBtn.style.width = '265px';
//     sidebar.style.width ='265px';
//         // emailList.getElementsByClassName.width = "700px"
// });

// sidebarLinks.addEventListener('mouseout', () => {
//     composeBtn.style.width = '50px';
//     sidebar.style.width ='50px';
// // emailList.getElementsByClassName.width = "1200px"
// });
// menuToggle.addEventListener('click',function () {
// sidebar.classList.toggle('hide-sidebar');
// });
