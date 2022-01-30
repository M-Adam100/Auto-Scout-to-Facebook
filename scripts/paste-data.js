console.log("Pasting Data");

(() => {


  const CarrosserieStyles = {
    "Coupé": "Coupé",
    "Utilitaire": "Caimon",
    "Berline": "Berline",
    "Break": "Hayon",
    "SUV/4x4/Pick-Up": "SUV",
    "Cabriolet": "Cabriolet",
    "Monospace": "Monospace"

  }

  const Transmissions = {
    "Boîteautomatique": "Transmission automatique",
    "Boîtemanuelle": "Transmission manuelle"
  }


  const CarburantStyles = {
    "Diesel": "Diesel",
    "Essence": "Essence",
    "Electrique": "Électrique",
    "Electrique/Essence": "Hybrid rechargeable",
    "Electrique/Diesel": "Hybrid rechargeable",
  }

  const setNativeValue = (element, value) => {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    event.simulated = true;
    let tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  chrome.storage.local.get(['characteristics'], (CS) => {
    const { characteristics } = CS;
    console.log(characteristics)


    const Marque = document.querySelector('label[aria-label="Marque"]').querySelector('input');
    setNativeValue(Marque, characteristics['Marque'])
    // Marque.value = characteristics["Marque"];
    // Marque.dispatchEvent(new InputEvent('change', { bubbles: true }));

    const Model = document.querySelector('label[aria-label="Modèle"]').querySelector('input');
    setNativeValue(Model, characteristics['Modèle']);
    // Model.value = characteristics["Modèle"];
    // Model.dispatchEvent(new InputEvent('change', { bubbles: true }));


    const Kilometers = document.querySelector('label[aria-label="Kilométrage"]').querySelector('input');
    setNativeValue(Kilometers, characteristics['Kilométrage'])
    // Kilometers.value = characteristics["Kilométrage"];
    // Kilometers.dispatchEvent(new InputEvent('change', { bubbles: true }));

    const Price = document.querySelector('label[aria-label="Prix"]').querySelector('input');
    setNativeValue(Price, characteristics['Prix'])
    // Price.value = characteristics["Prix"];
    // Price.dispatchEvent(new InputEvent('change', { bubbles: true }));

    const Year = document.querySelector('label[aria-label="Année"]').querySelector('div').querySelector('span');
    Year.addEventListener('click', () => {
      const interval = setInterval(() => {
        if (document.querySelector('div[role="listbox"]')) {
          clearInterval(interval);
          [...document.querySelector('div[role="listbox"]').querySelectorAll('span')].filter(item => item.innerText.includes(characteristics["Année"]))[0].click()
          Carrosserie.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      }, 300);

    })

    Year.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const Carrosserie = document.querySelector('label[aria-label="Style de carrosserie"]').querySelector('div').querySelector('span');
    Carrosserie.addEventListener('click', () => {
      const interval = setInterval(() => {
        if (document.querySelector('div[role="listbox"]')) {
          clearInterval(interval);

          [...document.querySelector('div[role="listbox"]').querySelectorAll('span')].filter(item => item.innerText.includes(CarrosserieStyles[characteristics["Carrosserie"]]))[0]?.click()
          Etat.dispatchEvent(new MouseEvent('click', { bubbles: true }));


        }
      }, 300);

    })

    const Etat = document.querySelector('label[aria-label="État du véhicule"]').querySelector('div').querySelector('span');
    Etat.addEventListener('click', () => {
      const interval = setInterval(() => {
        if (document.querySelector('div[role="listbox"]')) {
          clearInterval(interval);
          [...document.querySelector('div[role="listbox"]').querySelectorAll('span')].filter(item => item.innerText.includes("très bon"))[0]?.click()
          Carburant.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        }
      }, 300);

    })

    const Carburant = document.querySelector('label[aria-label="Type de carburant"]').querySelector('div').querySelector('span');
    Carburant.addEventListener('click', () => {
      const interval = setInterval(() => {
        if (document.querySelector('div[role="listbox"]')) {
          clearInterval(interval);
          [...document.querySelector('div[role="listbox"]').querySelectorAll('span')].filter(item => item.innerText.includes(CarburantStyles[characteristics['Carburant']]))[0]?.click()
          Transmission.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
      }, 300);

    })

    const Transmission = document.querySelector('label[aria-label="Boîte de vitesse"]').querySelector('div').querySelector('span');
    Transmission.addEventListener('click', () => {
      const interval = setInterval(() => {
        if (document.querySelector('div[role="listbox"]')) {
          clearInterval(interval);
          [...document.querySelector('div[role="listbox"]').querySelectorAll('span')].filter(item => item.innerText.includes(Transmissions[characteristics['Transmission']]))[0]?.click()
        }
      }, 300);

    })


    const Description = document.querySelector('label[aria-label="Description"]').querySelector('textarea');
    setNativeValue(Description, characteristics['Description']);
    alert("Pasting Done")

  })


})()