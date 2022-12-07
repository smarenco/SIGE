export default class AbsenteeismCauses {

    /**
     * @type {number}
     */
    id = undefined;

    /**
     * @type {string}
     */
    name = undefined;

    /**
     * @type {boolean}
     */
     apply_absenteeism = undefined;

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
}