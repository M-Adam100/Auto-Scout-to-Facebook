console.log("Running Script");

(async () => {

    function extractContent(s, space) {
        var span= document.createElement('span');
        span.innerHTML= s;
        if(space) {
          var children= span.querySelectorAll('*');
          for(var i = 0 ; i < children.length ; i++) {
            if(children[i].textContent)
              children[i].textContent+= ' ';
            else
              children[i].innerText+= ' ';
          }
        }
        return [span.textContent || span.innerText].toString().replace(/ +/g,' \n ');
      };

    if (window.location.href.includes('autoscout')) {
        const productResponse = await fetch(`${window.location.href}`);
        const productResponseText = await productResponse.text();
        let re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
        let match;
        let productData;
        let i = 0;
        while ((match = re.exec(productResponseText))) {
            i++;
            let data = match[1].replace(/\s+/g, "");
            if (data.includes('props')) {
                productData = JSON.parse(data);
            }
        }

        const { listingDetails } = productData.props.pageProps;
        const obj = {};
        obj['Kilométrage'] = listingDetails.vehicle.mileageInKmRaw;
        obj['Prix'] = listingDetails.prices.public.priceRaw;
        console.log(listingDetails.description);
        const formattedDescription = document.querySelector('div[data-cy="seller-notes-section"]').innerText.replace('Description', '').replace('Afficher plus', '');
        obj['Description'] = formattedDescription
        obj['Marque'] = listingDetails.vehicle.make;
        obj['Année'] = listingDetails.vehicle.firstRegistrationDate.split('/')[1];
        obj['Modèle'] = listingDetails.vehicle.model;
        obj['Carrosserie'] = listingDetails.vehicle.bodyType;
        obj['Carburant'] = listingDetails.vehicle.fuelCategory.formatted;
        obj['Transmission'] = listingDetails.vehicle.transmissionType;
        chrome.storage.local.set({ characteristics: obj });
        console.log(obj);
        const images = [];
        const name = document.title.replaceAll(' ', '_');
        const removeSlash = name.replaceAll('/', '');
        const filteredName = removeSlash.replace('Occasion', '');
        if (name && listingDetails.images.length > 2) {
            listingDetails.images.forEach((item, index) => {
                if (index == 0) {
                    const filename = filteredName + '_' + '0';
                    images.push({url: listingDetails.headerImage, filename: filename})
                } else {
                    const imageUrl = item;
                    const filename = filteredName + '_' + index;

                    images.push({ url: imageUrl, filename: filename })
                }

            })

        }

        chrome.runtime.sendMessage({ images, folderName: filteredName });
        alert("Copying is Done!");

    } else alert("Please Go to an Auto Scout Page");
    })()
