/**
 * A function that
 * @returns navigator geolocation position
 */
const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error("Geolocation is not supported by this browser."));
        };

        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (err) => reject(err)
        );
    });
};

export default getLocation;