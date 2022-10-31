export default class User {

    /**
     * @type {number}
     */
    IdUser = undefined;

    /**
     * @type {number}
     */
    IdAccount = undefined;

    /**
     * @type {string}
     */
    Name = undefined;

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
        return this.IdUser;
    }

    /**
     * @return {boolean}
     */
    isActive = () => !this.Baja;
}