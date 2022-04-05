
import { allInbox } from './all-emails.js';
// import { promotions } from './promotions.js';
// import { social } from './social.js';

// const allInbox = [...primary, ...social, ...promotions];

// module.exports = { primary, social, promotions, allInbox };
// console.log(allInbox);

const newEmails = allInbox.map((item, index) => ({id: index + 1,...item}));
console.log(newEmails)

const emailList = document.querySelector('.email-list');
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
    createEmails(filteredData);
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

function createEmails(emails) {
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
    for (let email of emails) {
        const eachEmail = `<li id="${email.id}" class="email-item">
        <input type="checkbox" name="check-${email.id}" id=${email.id}>
        <i class="fa fa-star"></i>
        <i class="fa fa-arrow-right"></i>
        <div class="sender">
        <span class="email-sender">${email.senderEmail}</span>
        </div>
        <div class="message">
        <span class="email-message">${email.messageTitle}</span>
        </div>
        <div class="date">
        <span class="email-date">${email.date}</span>
        </div>
    </li>`

        emailList.innerHTML += eachEmail;
    }
}
createEmails(allInbox)

// prevBtn.addEventListener('click', function() {});
//     emailList.innerHTML = '';
//     pageNumber++;
//     createEmails(allInbox)
// nextBtn.addEventListener('click', function() {
//     emailList.innerHTML = '';
//     pageNumber++;
//     createEmails(allInbox)
// })

main.addEventListener('click', function(event){
    console.log(event.target);
})

//Tried to make Gulya's part work.
// const composeBtn = document.querySelector('.compose');
// composeBtn.addEventListener('mouseout', function(event) {
//     sidebarLinks.style.width = '265px';
//     console.log('hello')
// }, true);


