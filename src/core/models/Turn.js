export default class Turn {

    /**
     * @type {number}
     */
    id = undefined;

    /**
     * @type {number}
     */
    account_id = undefined;

    /**
     * @type {string}
     */
    name = undefined;

    /**
     * @type {string}
     */
    start_time = undefined;

    /**
     * @type {string}
     */
    finish_time = undefined;

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