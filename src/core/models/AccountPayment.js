export default class AccountPayment {

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
     amount = undefined;

    /**
     * @type {string}
     */
    reference = undefined;

    /**
     * @type {datetime}
     */
    payment_day = undefined;

    /**
     * @type {string}
     */
    payment_method = undefined;

    /**
     * @type {string}
     */
    observation = undefined;

    /**
     * @type {string}
     */
    state = undefined;

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