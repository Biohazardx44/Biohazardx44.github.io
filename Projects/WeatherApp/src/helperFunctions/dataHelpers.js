/**
 * Data helpers to use in our weather application
 */
export default class DataHelpers {
    /**
     * A function that sets data to local storage with given object or string as second argument and
     * @param {string} key to save the object in local storage as
     * @param {object | string} data
     */
    static setData(key, data) {
        let dataToSave;

        if (typeof data == 'object') {
            data.lastEntry = Date.now();
            dataToSave = JSON.stringify(data);
        } else {
            dataToSave = data;
        };

        localStorage.setItem(key, dataToSave);
    };

    /**
     * A function that retreives data from local storage for a given key 
     * @param {string} key to retreive the data from local storage if preset
     * @returns {string | null}
     */
    static getData(key) {
        let dataToReturn;
        dataToReturn = localStorage.getItem(key);
        try {
            dataToReturn = JSON.parse(dataToReturn);
        }
        catch (e) {
            dataToReturn = dataToReturn;
        };
        return dataToReturn;
    };

    /**
     * A function that gets data either from a given URL or from local storage and 
     * if it is present by checking the url as key and
     * @param {string} url URL to fetch the data from and
     * @returns {Promise}
     */
    static getDataFromURLorLocal(url) {
        return new Promise((resolve, reject) => {
            const localData = DataHelpers.getData(url);
            const oneHourInMilliseconds = 3600000;
            let dataIsOld = false;
            if (localData) {
                dataIsOld = Date.now() - parseInt(localData.lastEntry) > oneHourInMilliseconds;
            };
            if (!localData || dataIsOld) {
                fetch(url)
                    .then(data => data.json())
                    .then(data => {
                        DataHelpers.setData(url, data);
                        resolve(data);
                    })
                    .catch((e) => {
                        if (!!localData) {
                            localData.isOutdatedData = true;
                            resolve(localData);
                        } else {
                            alert('ERROR GETTING DATA');
                        };
                        console.error(e);
                    });
            } else {
                resolve(localData);
            };
        });
    };

    /**
     * A function that returns a city name and data by given city data object 
     * @param {object} cityData containing the response data from secondApiCall that
     * @returns {object}
     */
    static getCityNameAndGeolocation(cityData) {
        return {
            coord: { ...cityData.coord },
            name: cityData.name,
        };
    };
};