export default class Payment {

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
    method_payment_id = undefined;

    /**
     * @type {number}
     */
    course_id = undefined;

    /**
     * @type {string}
     */
    user_id = undefined;

    /**
     * @type {string}
     */
    reference = undefined;

    /**
     * @type {date}
     */
    date = undefined;

    /**
     * @type {boolean}
     */
    apply_discount = false;

    /**
     * @type {number}
     */
    discount = 0;

    /**
     * @type {boolean}
     */
    apply_surcharge = false;

    /**
     * @type {number}
     */
    surcharge = 0;

    /**
     * @type {string}
     */
    observation = undefined;

    /**
     * @type {boolean}
     */
    canceled = false;

    /**
     * @type {number}
     */
    amount_coute = 1;

    /**
     * @type {number}
     */
    value_coute = false;

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