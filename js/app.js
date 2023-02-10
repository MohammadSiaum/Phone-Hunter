const loadPhones = async(phone, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phones-container');
    // phoneContainer.innerHTML = ``;
    phoneContainer.textContent = '';
    // display 10 phones only
    const showMore = document.getElementById('show-more');
    if(dataLimit && phones.length > 10)
    {
        phones = phones.slice(0, 10);
        showMore.classList.remove('d-none');
    }
    else {
        showMore.classList.add('d-none');
    }

    // Not found phone
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0)
    {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card h-100 p-4">
               <img src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as</p>
                  <!-- Button trigger modal -->
                  <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#phone-details-modal">Show Details</button>
                  
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });

    // stop loader or spinner
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    // star loader or spinner
    toggleSpinner(true);
    
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    // searchField.value = '';
}

// phone search
document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
    
})
// phone search (these are same work)
searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    searchField.value = '';
}

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter')
    {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const sectionLoading = document.getElementById('loader');
    if(isLoading){
        sectionLoading.classList.remove('d-none');
    }
    else {
        sectionLoading.classList.add('d-none');
    }
}

// not the best way to load show more
document.getElementById('show-more-btn').addEventListener('click', function(){
    processSearch();
});

const loadPhoneDetails = async(id) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phone-details-modalLabel');
    modalTitle.innerText = phone.name;
    
    const phoneDetailsBody = document.getElementById('phone-detals-body');
    phoneDetailsBody.innerHTML = `
        <h6>Brand : ${phone.brand ? phone.brand : 'No found brand'}</h6>
        <p>Chip Set : ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'No chip set info found'}</p>
        <p>Memory : ${phone.mainFeatures ? phone.mainFeatures.memory : 'No memory details found'}</p>
        <p>Display Size : ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No display size info found'}</p>
        <p>Release Date : ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p>Sensor : ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'No sensor info found'}, ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[1] : 'No sensor info found'}, ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[5] : 'No sensor info found'}</p>
        <p>Bluetooth : ${phone.others ? phone.others.Bluetooth : 'No found about it'} </p>
        <p>WLAN : ${phone.others ? phone.others.WLAN : 'No found about it'} </p>
        <p>USB : ${phone.others ? phone.others.USB : 'No found about it'} </p>
    
    `
}

loadPhones('iphone');