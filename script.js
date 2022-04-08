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
// let newStarred = allInbox.filter(em => em.tags.isStarred);
let newSpam = allInbox.filter(em => em.tags.isSpam);
let newTrash = allInbox.filter(em => em.tags.isTrash);


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
        <div class="starHover" data-email-id="${email.id}">
        <span class="material-icons starredSide star-${email.tags.isStarred}" style="color:white">${email.tags.isStarred === true ? 'star' : 'star_border'}</span>
        </div>
        <div class="importantHover">
        <svg class="importantEmail" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 7H7.89l3.57 5-3.57 5H15l3.55-5z" opacity=".3"/><path d="M16.63 5.84C16.27 5.33 15.67 5 15 5H4l5 7-5 6.99h11c.67 0 1.27-.32 1.63-.83L21 12l-4.37-6.16zM15 17H7.89l3.57-5-3.57-5H15l3.55 5L15 17z"/></svg>
        </div>
        <section class="sender">${email.senderEmail} </section>
        <section class="subject"  data-email-id="${email.id}">${email.messageTitle}<span class="emailContent"> - ${email.messages[0].message}</span></section> 
        </div>
        <div class = 'two'>
        <section class="time">${emailTime} </section>
        </div>
        </li>`
        
        

        emailList.innerHTML += eachEmail;
    }

    


    search.addEventListener('input', function (event) {
        const searchKey = event.target.value;
        const filteredData = allInbox.filter(item => {
            return item.messageTitle.toLowerCase().includes(searchKey.toLowerCase())
        });
        emails = filteredData;
        create_emails();
    });

    // const oneEmail = document.querySelectorAll(".subject")
    // console.log("oneEmail: ", oneEmail)

    // for (let i=0; i<oneEmail.length; i++){
    //     oneEmail[i].addEventListener('click', () =>{
    //         // console.log("oneEmail: ", oneEmail)
    //         createOneEmail();
    //     });
    // }
    
    

    document.body.addEventListener('click', (e) => {
        if (e.target.className === 'subject') {
            const emailId = e.target.dataset.emailId;
            console.log('emailid', emailId)
            createOneEmail(emailId)
        } else if (e.target.className === 'back') {
            console.log("back")
            create_emails()
        }        
    });

    //It's click function in the middle part for the for starred icons  
    document.body.addEventListener('click', function(event){
        if (event.target.className.includes('starredSide')){
            const emailId = event.target.parentElement.dataset.emailId;
            const emailObject = emails.find((el) => el.id === Number(emailId))
            const starredSide = event.target;
            if (starredSide.innerHTML === "star_border") {
                starredSide.innerHTML = "star";    
                emailObject.tags.isStarred = true
            } else if (starredSide.innerHTML === "star") {
                starredSide.innerHTML = "star_border";
                emailObject.tags.isStarred = false
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
                emails = emails.filter((el) => el.tags.isStarred === true);
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

// sideLeft.addEventListener('mouseout', () => {
//     if (sideLeft.style.width === "265px"){
//         sideLeft.style.width = '73px';
//         smallCompose.style.display = "block";
//         bigCompose.style.display = "none";
//         displayedHp.style.display = "none";
//         displayedMp.style.display = "none";
//         footerDisp.style.display = "block";
//         footerDiv.style.display = "none";
//     }
// })

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


//Tried to make Gulya's part work.
const composeBtn = document.querySelector('.compose');
// composeBtn.addEventListener('mouseout', function(event) {
//     sidebarLinks.style.width = '265px';
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






function createOneEmail(emailId) {
    // debugger
    const emailObject = emails.find((el) => {
        return el.id === Number(emailId);
    })
    console.log('emailObject', emailObject)
    emailList.innerHTML = `
    <div class="openedEmail" >
        <div class="pagenationTwo" id="${emailObject.id}">
            <div class="leftEmail">
                <div class="oneOf Three">
                    <div class="back Hover">
                        <svg class="backArrow" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                    </div>
                    <div class="archive Hover">
                        <svg class="archive" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/></svg>
                    </div>
                    <div class="reportSpam Hover">
                        <svg class = 'reportSpam' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"/><circle cx="12" cy="16" r="1"/><path d="M11 7h2v7h-2z"/></svg>
                    </div>
                    <div class="delete Hover">
                        <svg class='delete' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                    </div>
                </div>
                <div class="twoOf Three">
                    <div class="markAsUnread Hover">
                        <svg class="markAsUnread" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><g><path d="M16.23,7h2.6c-0.06-0.47-0.36-0.94-0.79-1.17L10.5,2L2.8,5.83C2.32,6.09,2,6.64,2,7.17V15c0,1.1,0.9,2,2,2V7.4L10.5,4 L16.23,7z"/><path d="M20,8H7c-1.1,0-2,0.9-2,2v9c0,1.1,0.9,2,2,2h13c1.1,0,2-0.9,2-2v-9C22,8.9,21.1,8,20,8z M20,19H7v-7l6.5,3.33L20,12V19z M13.5,13.33L7,10h13L13.5,13.33z"/></g></g></svg>
                    </div>
                    <div class="snooze Hover">
                        <svg class="snooze" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.2,16.2L11,13V7h1.5v5.2l4.5,2.7L16.2,16.2z"/></g></g></g></svg>
                    </div>
                    <div class="addToTasks Hover">
                        <svg class="addTasks" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8 c1.57,0,3.04,0.46,4.28,1.25l1.45-1.45C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12s4.48,10,10,10c1.73,0,3.36-0.44,4.78-1.22 l-1.5-1.5C14.28,19.74,13.17,20,12,20z M19,15h-3v2h3v3h2v-3h3v-2h-3v-3h-2V15z"/></svg>
                    </div>
                </div>
                <div class="threeOf Three">
                    <div class="moveTo Hover">
                        <svg class="moveTo" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>
                    </div>
                    <div class="labels Hover">
                        <svg class="labels" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/></svg>
                    </div>
                </div>
                <div class="more Hover">
                    <svg class="more" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" alt="more" /></svg> 
                    <span class="tooltiptext">o</span>
                </div>
            </div>
            <div class="right">
                <section class="pages">1-50 of 1,000</section>
                <svg  class="arrow_left" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" alt="arrow_left" /></svg>
                <svg
                class="arrow_right" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" alt="arrow_right"/></svg>  
                <img
                class="input_tools"
                src="./input_tools.png"
                alt="input_tools"
                />
                <svg
                    class="arrow_drop_down" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"
                    alt="arrow_drop_down"/></svg>
            </div>
        </div>        
        <section class="emailHeader">
            <div class="leftSide">
                <div class="emailSubject">${emailObject.messageTitle} 
                    <div class="importantThree Hover"> 
                        <svg class = 'importantLabel' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3.5 18.99l11 .01c.67 0 1.27-.33 1.63-.84L20.5 12l-4.37-6.16c-.36-.51-.96-.84-1.63-.84l-11 .01L8.34 12 3.5 18.99z"/></svg>                        
                        <div class="inbox Hover">Inbox</div>
                        <div class="removeLabel Hover">
                            <svg class="removeLabel" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="rightSide">
                <div class="printAll Hover">
                    <svg class="printAll" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 8h-1V3H6v5H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zM8 5h8v3H8V5zm8 12v2H8v-4h8v2zm2-2v-2H6v2H4v-4c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v4h-2z"/><circle cx="18" cy="11.5" r="1"/></svg>
                </div>
                <div class="inNewWindow Hover">
                    <svg class = 'openInNew' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
                </div>
            </div>
        </section>
        <section class="emailSender">
            <div class="leftPart">
                <svg class="senderIcon" xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 0 24 24" width="50px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/></svg>
                <div class="senderEmail">
                    <p class="emailaddress"><strong>${emailObject.senderName}</strong>${"   "}${emailObject.senderEmail}</p>                    
                    <div class=" Hover toMe"> <p >to me </p>
                        <div class="arrowB">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 10l5 5 5-5z"/></svg>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="rightPart">
                <p class="time">1:00 PM (3 hours ago)</p>
                <div class="star Hover">
                    <svg class="star" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>
                </div>
                <div class="reply Hover">
                    <svg class="reply" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>
                </div>
                <div class="more Hover">
                    <svg class="more" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                </div>
            </div>
        </section>
        <div class="emailTextAndButtons">
            <main class="emailText">
                ${emailObject.messages[0].message}
            </main>                    
            <div class="buttonsInEmail">
                <button> <div class="buttonsEmail"> <svg class="reply" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg> Reply</div></button>
                <button> <div class="buttonsEmail"> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8V4l8 8-8 8v-4H4V8z"/></svg> Forward</div></button>
            </div>
        </div>               
    </div>`
}