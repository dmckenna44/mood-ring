

// chrome.history.search({
//     'text': ''
// }, function(item) {
//     console.log(item);
// })


// MOODS:
// %75
// red: anger --> #ff8080
// orange: aggressive/impatient --> #ff944d
// yellow: nervous, distracted --> #ffe680
// green: fresh, active --> #aaff80
// blue: calm, content --> #80e5ff
// purple: love --> #bf80ff
// pink: happy --> #ffb3ff
// black: stressed, tired --> #1a1a1a

const describeMood = {
    '#ff8080': 'rage',
    '#ff944d': 'impatient & aggressive',
    '#ffe680': 'nervous & distracted',
    '#aaff80': 'fresh & active',
    '#80e5ff': 'calm & content',
    '#bf80ff': 'love & adoration',
    '#ffb3ff': 'happiness',
    '#1a1a1a': 'stress & fatigue'
}



// initial visit of site to find the mood
const moodCount = {
    "#80e5ff": 0,
    "#ff8080": 0,
    "#aaff80": 0,
    "#ffe680": 0,
    "#bf80ff": 0,
    "#ff944d": 0,
    "#ffb3ff": 0,
    "#1a1a1a": 0
}


// after finding mood mode from the mood count,
// mood cache saves mood from previous sites +1
const moodCache = {
    blue: 0,
    red: 0,
    green: 0,
    "#ffe680": 0,
    "#bf80ff": 0,
    "#ff944d": 0,
    "#ffb3ff": 0,
    "#1a1a1a": 0
}

let count = 0;
// const moodCache = localStorage.setItem('moodCache', JSON.stringify(moodCache1));
localStorage.setItem('test', count);
// console.log(moodCache);

// Mood object - key: color/mood, value: array of keywords
const moodWords = {
    "#80e5ff": [
        'calm',
        'content',
        'normal',
        'regular',
        'everyday',
        'fine',
        'meh',
        'secure',
        'relax',
        'enjoy'
    ],
    "#ff8080": [
        'angry',
        'anger',
        'pissed',
        'mad',
        'fuming',
        'rage',
        'inflame',
        'wrath',
        'fury',
        'infuriate',
        'horrible',
        'infuriating',
        'terrible',
        'disgusting',
        'vexed',
        'resentment',
        'outrage',
        'justice',
    ],
    "#aaff80": [
        'fresh',
        'active',
        'fit',
        'proactive',
        'time',
        'management',
        'exercise',
        'positivity',
        'growth',
        'mindset',
        'gym',
        'job',
        'work',
        'productivity',
        'productive',
        'better'
    ],
    "#ffe680": [
        'nervous',
        'distracted',
        'nausea',
        'anxious',
        'nerves',
        'unstable',
    ],
    "#bf80ff": [
        'love',
        'admire',
        'admiration',
        'adore',
        'darling',
        'cute',
        'beautiful',
        'beauty',
        'romance',
        'like'
    ],
    "#ff944d": [
        'aggressive',
        'impatient',
        'hurry',
        'fast',
        'quick',
        'easy',
        'expediated',
        'speedy',
        'swift',
    ],
    "#ffb3ff": [
        'happy',
        'joyful',
        'awesome',
        'cool',
        'joy',
        'yummy',
        'yum',
        'cheer',
        'cheerful',
        'congratulations',
        'congrats',
        'lucky',
        'kitten',
        'puppies',
        'pup',
        'animals',
        'cat',
        'dog'
    ],
    "#1a1a1a": [
        'stressed',
        'tired',
        'sick',
        'ill',
        'depressed',
        'depression',
        'moody',
        'grumpy',
        'ugh',
        'unhappy',
        'sad',
        'unfortunate',
        'tragedy',
        'bad',
        'injustice',
        'unfair',
        'therapy',
        'therapist',
        'CBT',
        'get help',
    ]
}


// object of common websites that are assigned to a mood already
const commonMoods = {
    '#80e5ff': [
        'https://www.google.com/',
        'https://www.netflix.com',
        'https://www.youtube.com/'

    ],
    "#ff8080": [
        'https://twitter.com',
        'https://www.foxnews.com',

    ],
    "#aaff80": [
        'https://www.linkedin.com',
        'https://www.github.com',
        'https://www.wikipedia.org'
    ],
    "#ffe680": [
        'https://www.reddit.com',
        'https://www.instagram.com',
        'https://www.tiktok.com'
    ],
    "#bf80ff": [
        'https://www.twitch.tv'
    ],
    "#ff944d": [
        'https://www.facebook.com',
        'https://www.amazon.com',
        'https://www.ebay.com/',
    ],
    "#ffb3ff": [
        'https://www.pinterest.com',
        'https://www.roblox.com/'
        
    ],
    "#1a1a1a": [
        'https://stackoverflow.com',
        'https://developer.mozilla.org/en-US/',
        'https://www.webmd.com',
        'https://www.cnn.com',
    ]
}

let currentMood = "#80e5ff";

// Mood cache - keeping track of how many websites of each mood have been visited


// Mode function returns mode

// event -> visit new page -> check objects, return mood mode


// create a shadow border that would add a border to the entire window

// create a style event triggered by mood change
// set mood variable based off of mood mode
// default to blue (calm)


function findWords(element) {
    if(element.hasChildNodes()) {
        element.childNodes.forEach(node => {
            findWords(node);
        })
    } else if (element.nodeType === Text.TEXT_NODE) {
        const textArr = element.textContent.split(' ');
        for (let i = 0; i < textArr.length; i++ ) {
            for (const mood in moodWords) {
                if (moodWords[mood].includes(textArr[i])) {
                    moodCount[mood]++;
                    console.log(mood, textArr[i]);
                }
            }
        }
    }
    // console.log(moodCount);
}

function setMood(url) {
    // const url = window.location.origin;
    for (const mood in commonMoods) {
        if (commonMoods[mood].includes(url)) {
            currentMood = mood;
            console.log(currentMood);
            break;
        } else {
            findWords(document.body);
            for (const mood in moodCount) {
                if (moodCount[mood] > moodCount[currentMood]) currentMood = mood;
            }
        } 
    }
    // moodCache[currentMood]++;
    // for (const mood in moodCache) {
    //     if (moodCache[mood] > moodCache[currentMood]) currentMood = mood;
    // }
    console.log('current mood: ', currentMood);
    console.log('Current page Mood Count: ', moodCount);
    // updateCache();

    const hostEle = document.createElement('div');
    hostEle.className ='our-host';
    document.body.firstElementChild.insertAdjacentElement('beforebegin', hostEle);
    const host = document.querySelector('.our-host');
    const root = hostEle.attachShadow({mode: 'open'});
    const div = document.createElement('div');
    div.classList.add('root-class');
    div.innerHTML = `
    <style>
    .root-class {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 85px;
        padding-top: 20px;
        background-color:  #${currentMood.slice(1)};
        line-height: 0.1;
        
        position: relative;
        top: 0;
        text-align: center;
        border: #${currentMood.slice(1)};
        width: 100vw;
        font-family: 'Century Gothic';
        font-size: 24px;
      }
    </style>
    ` + 'm o o d' + ' ' +  ' // ' + ' '  + 'r i n g';
    
    root.appendChild(div);
    const desc = document.createElement('p');
    desc.textContent = `${describeMood[currentMood]}`
    div.appendChild(desc);

    const borderTop = document.createElement('div');
    borderTop.classList.add('top');
    borderTop.setAttribute('style', `background-color: ${currentMood} !important`);
    document.body.appendChild(borderTop);
    if (currentMood === '#ff8080') {
        console.log('WHY ARE YOU SO ANGRY?????');
        setTimeout(function() {
            window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        }, 2000)
    };
    if (currentMood === "#1a1a1a") {
        console.log('y so sad TT');
        div.style.color='white';
        setTimeout(function() {
            window.location.replace('https://www.youtube.com/watch?v=Tj8M3zWOeC8');
        }, 2000)
    };
}

setMood(window.location.origin);



// localStorage.setItem('moodCache', JSON.stringify(moodCache));

// function updateCache() {
// //   let color = moodCache[currentMood];
//   const moods = ['blue', 'red', 'green', 'yellow', 'orange', 'pink', 'black', 'purple'];  
//   moods.forEach(mood => {
//     chrome.storage.local.set({mood: 
//         chrome.storage.local.get(mood, result => )
//     }, 
//     // console.log(chrome.storage.local);
//   })
//   chrome.storage.local.get(['blue']), result => {
//     console.log('chrome storage', result);
//   }
// chrome.storage.local.set({currentMood: 1}) // the result of the callback set mood
// console.log(chrome.storage.local);
// // retrieve the hi
// chrome.storage.local.get('key', result => {
//     console.log
// })
// chrome.storage.local.get('key');
//   console.log('chrome storage on');
 




// element.setAttribute( 'style', 'background-image: url( "http://placekitten.com/200/300" ) !important' );

// ---- Local storage ------ //
// localStorage.getItem('color') ? localStorage.setItem('color', '1') : localStorage.setItem('color', Number(localStorage.getItem('color') + 1))


// if currentMood set to black or red, redirect

// chrome.webRequest.onBeforeRequest.addListener(
//     function(){
//         if (currentMood === 'black' || currentMood === 'red'){
//             return {redirectUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'};
//         }
//     }
// )