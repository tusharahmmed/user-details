/**
 * Project Name: Single Random User Details
 * Author: Tushar Ahmmed
 */


// handle
const maleIcon = document.getElementById('male-icon');
const femaleIcon = document.getElementById('female-icon');
const refreshBtn = document.getElementById('refresh');
const profile = document.getElementById('profile');
const iconUl = document.getElementById('icons');
const title = document.getElementById('title');
const dataField = document.getElementById('data');

/**
 * ===============
 *      Functions
 * ===============
 **/

// create api url
const setUrl = (gender) => {
    url = 'https://randomuser.me/api/?results=1&gender=' + gender;
    return url;
}

// call api
const getUser = (gender) => {
    let url = setUrl(gender);
    fetch(url)
        .then(res => res.json())
        .then(data => setData(data));
}

// show data
function setData(data) {

    let profilePic = data.results[0].picture.large;
    // create img
    let img = document.createElement('img');
    img.classList = 'profile round-full block m-auto rounded-full border-indigo-500 border-4 p-1 bg-purple-300 relative';
    img.setAttribute('src', profilePic);
    //append
    profile.appendChild(img);

    // set name
    const { first, last } = data.results[0].name;
    dataField.innerText = `${first} ${last}`;

    // set hover value
    iconUl.addEventListener('mouseover', event => {
      
            // get id
            if(event.target.tagName == 'svg'){

                let id = event.target.parentNode.id;
                // show related data
                hoverData(id, data);

            }else if(event.target.tagName == 'path'){
                
                let id = event.target.parentNode.parentNode.id;
                // show related data
                hoverData(id, data);
            }
    })
}

// set hover icon data
const hoverData = (id, data) => {

    if (id == 'name') {
        const { first, last } = data.results[0].name;
        title.innerText = 'Hi, My name is';
        dataField.innerText = `${first} ${last}`;
    } else if (id == 'mail') {
        let email = data.results[0].email;
        title.innerText = 'My email address is';
        dataField.innerText = email;
    } else if (id == 'birth-day') {
        let date = data.results[0].dob.date;
        title.innerText = 'My birthday is';
        dataField.innerText = date.slice(0, 10);
    } else if (id == 'address') {
        let { number, name } = data.results[0].location.street;
        title.innerText = 'My address is';
        dataField.innerText = `${number} ${name}`;
    } else if (id == 'phone') {
        title.innerText = 'My phone number is';
        dataField.innerText = data.results[0].cell;
    }

}

// call the function when page loaded
getUser();

/**
 * ===============
 *      Events
 * ===============
 **/

// get male data
maleIcon.addEventListener('click', () => {
    profile.textContent = '';
    getUser('male');
})

// get female data
femaleIcon.addEventListener('click', () => {
    profile.textContent = '';
    getUser('female');
})

// get rendom data
refreshBtn.addEventListener('click', () => {
    profile.textContent = '';
    getUser('');
})


