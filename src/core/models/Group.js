export default class Group {

    /**
     * @type {number}
     */
    id = undefined;

    /**
     * @type {number}
     */
    turn_id = undefined;

    /**
     * @type {number}
     */
    teacher_id = undefined;

    /**
     * @type {number}
     */
    course_id = undefined;
    
    /**
     * @type {number}
     */
    number_students = undefined;

    /**
     * @type {string}
     */
    name = undefined;

    /**
     * @type {string}
     */
    description = undefined;
    
    /**
     * @type {array}
     */
    students = [];

    /**
     * @type {string}
     */
    from_date = undefined;

    /**
     * @type {string}
     */
     to_date = undefined;

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