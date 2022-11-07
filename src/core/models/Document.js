export default class Document {

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
     * @type {boolean}
     */
    control_expiration = undefined;

    /**
     * @type {boolean}
     */
    required = undefined;

    /**
     * @type {array}
     */
    documents = undefined;

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