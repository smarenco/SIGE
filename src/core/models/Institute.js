export default class Institute {

    /**
     * @type {number}
     */
    id = undefined;

    /**
     * @type {number}
     */
    account_id = undefined;

    /**
     * @type {number}
     */
    country_id = undefined;

    /**
     * @type {number}
     */
    city_id = undefined;

    /**
     * @type {string}
     */
    name = undefined;

    /**
     * @type {string}
     */
    description = undefined;

    /**
     * @type {boolean}
     */
    Baja = false;

    constructor(item) {
        for (let key in item) {
            this[key] = item[key];
        }
    }

    /**
     * Devuelve el ID del modelo
     * @return {int}
     */
    getId() {
        return this.id;
    }

    /**
     * @return {boolean}
     */
    isActive = () => !this.Baja;
}