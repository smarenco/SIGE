export default class Account {

    /**
     * @type {number}
     */
    id = undefined;

    /**
     * @type {string}
     */
    name = undefined;

    /**
     * @type {string}
     */
    document = undefined;

    /**
     * @type {string}
     */
    phone = undefined;
    
    /**
     * @type {string}
     */
    contact_name = undefined;
    
    /**
     * @type {string}
     */
    contact_email = undefined;
    
    /**
     * @type {string}
     */
    contact_phone = undefined;    
    
    /**
     * @type {string}
     */
    limit_pay_day = undefined;

     
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