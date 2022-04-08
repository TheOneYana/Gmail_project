import { primary } from './primary.js';
import { promotions } from './promotions.js';
import { social } from './social.js';
(function(){
    const menu = document.querySelector('#menu');
    const sideLeft = document.querySelector('#hover-left');
    const displayedMp = document.querySelector("#displayedMp");
    const displayedHp = document.querySelector("#displayedHp");
    const smallCompose = document.querySelector('.composebtn');
    const bigCompose = document.querySelector('.composebtn-displayed');
    const emailList = document.querySelector('.email-list');
    const pageInfoSpan = document.querySelector('#page-info');
    const prevBtn = document.querySelector('#prev');
    const nextBtn = document.querySelector('#next');
    const expanCategory = document.querySelector('#expanded-category')
    const expandedMore = document.querySelector("#expanded-more")

    let pageNumber = 0;
    let limit = 15;
    const allInbox = [...primary, ...social, ...promotions];
    let newStarred = allInbox.filter(em => em.tags.isStarred);
    let newSpam = allInbox.filter(em => em.tags.isSpam);
    let newTrash = allInbox.filter(em => em.tags.isTrash);
    console.log("Trash", newTrash)

    let emails = allInbox;  // My Hero  line!!!

    // create_emails()

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
        if (emails.length < 10){
            pageInfoSpan.innerText = `Total ${emails.length}`;
        }
        for (let email of partialEmails) {
            const emailTime = email.date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            });

            // const eachEmail = `<li id="${email.id}" class="email-item">
            //     <input type="checkbox" name="check-${email.id}" id="${email.id}" />
            //     <span class="material-icons starredSide">star_border</span>
            //     <span class="material-icons">arrow_forward</span>
            //     <span class="email-sender">${email.senderEmail}</span>
            //     <span class="email-message">${email.messageTitle}</span>
            //     <span class="time">${emailTime}</span>
            // </li>`;

            emailList.innerHTML += eachEmail;
        }
        
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
})();
