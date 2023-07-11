import dayjs from "dayjs";

export default class Payment {

    /**
     * @type {number}
     */
    id = undefined;

    /**
     * @type {number}
     */
    payment_method_id = undefined;

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
    date = dayjs();

    /**
     * @type {boolean}
     */
    apply_discount = false;

    /**
     * @type {number}
     */
    discount = undefined;

    /**
     * @type {number}
     */
    total = undefined;

    /**
     * @type {boolean}
     */
    apply_surcharge = false;

    /**
     * @type {number}
     */
    surcharge = undefined;

    /**
     * @type {string}
     */
    observation = undefined;

    /**
     * @type {boolean}
     */
    canceled = false;

    /**
     * @type {date}
     */
    canceled_date = false;

    /**
     * @type {number}
     */
    amount_coute = 1;

    /**
     * @type {number}
     */
    value_cuote = false;

    /**
     * @type {array}
     */
    cuotes = [];

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