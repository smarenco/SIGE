export default class City {

    /**
     * @type {number}
     */
    id = undefined;

    /**
     * @type {number}
     */
    institut_id = undefined;

    /**
     * @type {string}
     */
    name = undefined;

    /**
     * @type {number}
    */
    amount_quote = undefined;

    /**
     * @type {number}
    */
    value_quote = undefined;

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