export default class Course {

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
     identifier = undefined;

    /**
     * @type {number}
    */
    quota_value = undefined;

    /**
     * @type {number}
    */
    quotas = undefined;

    /**
     * @type {number}
    */
    tuition = undefined;

    /**
     * @type {number}
    */
    tuition_value = undefined;

    /**
     * @type {number}
    */
    certificate_cost = undefined;

    /**
     * @type {number}
    */
    estudiante_documental_category_id = undefined;

    /**
     * @type {number}
    */
    profesor_documental_category_id = undefined;

    /**
     * @type {array}
    */
    students = [];

    /**
     * @type {array}
    */
    teachers = [];

    /**
     * @type {object}
    */
    documental_category = {};

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