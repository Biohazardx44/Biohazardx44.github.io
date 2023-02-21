export default class DataHelpers {
    /**
    * A function that sets data to local storage with given object or string 
    * @param {string} key a key to save the object in local storage as
    * @param {Object | string} data an object or string to save as data in
    */
    static setData(key, data) {
        let dataToSave;

        // if(typeof data == `object`) dataToSave = JSON.stringify(data)
        // else dataToSave = data;

        // let dataToSave = typeof data == `object` ? JSON.stringify(data) : data
        // localStorage.setItem(key, dataToSave)

        if (typeof data == `object`) {
            data.lastEntry = Date.now()
            dataToSave = JSON.stringify(data)
        } else {
            dataToSave = data;
        }

        localStorage.setItem(key, dataToSave);
    }

    static getData(key) {
        let dataToReturn;
        dataToReturn = localStorage.getItem(key)
        try {
            dataToReturn = JSON.parse(dataToReturn)
        }
        catch (e) {
            dataToReturn = dataToReturn
        };
        return dataToReturn;
    }

    static getDataFromURLorLocal(url) {
        return new Promise((resolve, reject) => {
            const localData = DataHelpers.getData(url);
            const oneHourInMilliseconds = 3600000;
            const dataIsOld = Date.now() - parseInt(localData.lastEntry) > oneHourInMilliseconds

            if (!localData || dataIsOld) {
                fetch(url)
                    .then(data => data.json())
                    .then(data => {
                        DataHelpers.setData(url, data)
                        resolve(data);
                    })
                    .catch((e) => {
                        if (!!localData) {
                            localData.isOutdatedData = true;
                            resolve(localData)
                        }
                        else{
                            alert(`ERROR GETTING DATA`)
                        }
                    })
            }
            else {
                console.log(`od lokal se zima`);
                resolve(localData)
            }
            // return dataToReturn;
        })
    }
}