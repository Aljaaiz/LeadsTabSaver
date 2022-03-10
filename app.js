let btn = document.getElementById('btn')
let deletebtn = document.getElementById('deletebtn')
let saveTab = document.getElementById('saveTab')
let input = document.getElementById('input')
let leadArray = []
let ul = document.getElementById('ul')



//get Items From Ls
getItemsinLs()

//Delete Items from Leads Array
ul.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
        //get Inner text of the click button
        let itemText = e.target.parentElement.innerText
        //split the text to get the first main text
        let textArray = itemText.split(' ');
        //find the the index of the splitted text in the leadArray
        const index = leadArray.indexOf(textArray[0]);
        console.log(index);
        //check if the splitted Text is in the Array  
        if (index > -1) {
            //Remove the the text using the Index number
            leadArray.splice(index, 1); // 2nd parameter means remove one item only
            //Remove the Item from the Display
            e.target.parentElement.remove()
        }

        savetoLs(leadArray)
        getItemsinLs()
    }
    // console.log()
})



deletebtn.addEventListener('dblclick', function () {
    if (confirm('Are you saure you want to clear all ?')) {
        localStorage.clear()
        leadArray = []
        render(leadArray)
    }
})
btn.addEventListener('click', function () {
    if (input.value !== '') {
        leadArray.push(input.value)
        savetoLs(leadArray)
        input.value = ''
        render(leadArray)
    }
})

function render(arrayleads) {
    let items = ''
    arrayleads.forEach(function (el, index) {
        items += `<li><a href="${el}" target="_blank">${el} </a><button class="btn-delete">Delete</button></li>`
    })
    ul.innerHTML = items
}

function savetoLs(arr) {
    let leads = localStorage.setItem("leads", JSON.stringify(arr))
    return leads

}

function getItemsinLs() {
    let getleads = JSON.parse(localStorage.getItem('leads'))
    if (getleads) {
        leadArray = getleads
        render(leadArray)
        console.log(leadArray);
    }
}

//get currentTab
saveTab.addEventListener('click', function () {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function (tabs) {
        // and use that tab to fill in out title and url
        let tab = tabs[0];
        console.log(tab.url);
        leadArray.push(tab.url)
        savetoLs(leadArray);
        getItemsinLs()

    });
})
// function generateBestC(desc, arr) {
//     let list = ""
//     let lastIndex = arr.length - 1
//     items = arr.forEach((item, index) => {
//         if (index === lastIndex) {
//             return list += item
//         } else {
//             return list += item + ','
//         }
//     })
//     return (`${desc} ${arr.length} ${list}`)
// }

// console.log(generateBestC("the most porpulos counries are ", ['india', 'china', 'pakistan']))