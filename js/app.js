const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)
}


const displayPhone =(phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    if(phones.length > 10 && dataLimit >= 10){
        phones = phones.slice(0, 10);
        showAll(true);
        noResult(false);
        loadingSpinner(false);
    }
    else if(phones.length === 0){
        noResult(true);
        showAll(true);
        loadingSpinner(false);
    }
    else{
        noResult(false);
        showAll(false);
        loadingSpinner(false);
    }

    phones.forEach(phone => {
        const {brand, image, phone_name, slug} = phone;
        const div = document.createElement('div');
        div.classList.add('card', 'w-full', 'glass', 'shadow-md');
        div.innerHTML = `<figure><img class="rounded-xl" src="${image}" alt="${phone_name}"></figure>
        <div class="card-body text-center">
          <h2 class="card-title justify-center">${phone_name}</h2>
          <p>Brand: ${brand}</p>
          <div class="card-actions justify-center">
            <label for="my-modal" class="btn btn-md mt-3" onclick="loadPhoneDetails('${slug}')">Details</label>
          </div>
        </div>`;
        phoneContainer.appendChild(div);
    })
} 


const showAll = (isVisible) => {
    const showAllButton = document.getElementById('view-all');
    if(isVisible === true){
        showAllButton.classList.remove('hidden');
        showAllButton.addEventListener('click', function(){
            viewAll();
        })
    }
    else{
        showAllButton.classList.add('hidden');
    }
}

const noResult = (isNoResult) => {
    const noResultElement = document.getElementById('no-result');
    if(isNoResult === true){
        noResultElement.classList.remove('hidden');
    }
    else{
        noResultElement.classList.add('hidden');
    }
}


const loadingSpinner = (isLoading) => {
    const loadingSpinnerElement = document.getElementById('loading-spinner');
    if(isLoading === true){
        loadingSpinnerElement.classList.remove('hidden');
    }
    else{
        loadingSpinnerElement.classList.add('hidden');
    }
}

const viewAll = () => {
    phoneSearch();
}


const clearAll = () => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    showAll(false);
    loadingSpinner(false);
    noResult(false);
}





const phoneSearch = dataLimit => {
    const searchValue = document.getElementById('input-search').value;
    clearAll();
    loadingSpinner(true);
    loadPhones(searchValue, dataLimit);
}


document.getElementById('input-search').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        phoneSearch(10)
    }
})
document.getElementById('btn-search').addEventListener('click', function(){
     phoneSearch(10)
})



// Details
const loadPhoneDetails = async(phoneId) => {
    // console.log(phoneId);
    // https://openapi.programming-hero.com/api/phone/${id}
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    
    const {name, image, brand, mainFeatures: {storage, displaySize, chipSet, memory, sensors}, releaseDate, others: {WLAN, Bluetooth, GPS, NFC, Radio, USB}} = data.data;

    const modalContainer = document.getElementById('modal-body');
    modalContainer.textContent = '';

    const sensorAll = sensors.join(', ');
    

    const div = document.createElement('div');
    div.classList.add('modal-box');
    div.innerHTML = `
    <div class="flex justify-center items-center flex-col text-center"><img class="w-1/2 rounded-xl" src="${image}" alt="">
    <h3 class="mt-3 font-bold text-2xl"> ${name} <div class="relative inline ml-2"><div class="badge badge-warning absolute top-0">${brand}</div></div></h3></div>
      <p class="pt-4 text-left font-bold text-xl text-purple-600">Features:</p>
      <ul class="list-disc list-inside">
      <li>Storage: ${storage}</li>
      <li>Display: ${displaySize}</li>
      <li>Chipset: ${chipSet}</li>
      <li>Memory: ${memory}</li>
      <li>Sensors: ${sensorAll}</li>
      <li>WLAN: ${WLAN}</li>
      <li>Bluetooth: ${Bluetooth}</li>
      <li>GPS: ${GPS}</li>
      <li>NFC: ${NFC}</li>
      <li>Radio: ${Radio}</li>
      <li>USB: ${USB}</li>
      </ul>

      <div class="flex justify-center mt-2">
        <label for="my-modal" class="btn">Close</label>
    </div>`;
    modalContainer.appendChild(div);
}




loadPhones('h', 9);