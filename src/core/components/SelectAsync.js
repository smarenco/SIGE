import { Select } from "antd";
import React from "react";
import { eqArr } from "@/core/common/functions";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data || [],
            loading: false,
            value: undefined,
        }
        this.keyName = props.keyName || 'Descripcion';
        this.keyValue = props.keyValue;
        this.setLoading = this.setLoading.bind(this);
    }

    componentDidMount() {
        if (this.props.dataAsync !== undefined) {
            this.updateAsync(this.props.dataAsync);
        }
    }

    componentDidUpdate(prevProps) {
        const { data } = this.props;
        if (!eqArr(prevProps.data, data)) {
            this.setState({ data });
        }
    }

    render() {
        const { data, loading } = this.state;
        const disabled = data.length === 0 || loading;
        let placeholder = this.props.placeholder;
        placeholder = loading ? 'Cargando...' : (!!placeholder ? placeholder : (data.length === 0 ? 'No disponible' : 'Seleccionar'));
        return (
            <Select
                {...this.props}
                loading={loading}
                disabled={disabled || !!this.props.disabled}
                placeholder={placeholder}
                onChange={this.props.onChange}
            >
                {this.renderOptions(data)}
            </Select>
        );
    }

    /**
     * Renderizar `Select.Options`.
     * @param {array} data 
     */
    renderOptions(data) {
        return data.map((item, i) => <Select.Option key={item[this.keyValue]} value={item[this.keyValue]}>{item[this.keyName]}</Select.Option>);
    }

    /**
     * Actualizar `data`.
     * @param {object} data 
     */
    update(data) {
        this.setState({ data });
    }

    /**
     * Actualizar `data` a través de una promesa.
     * @param {Promise} promise 
     */
    updateAsync(promise) {
        this.setState({ loading: true }, () => promise
            .then(data => this.setState({ data }))
            .then(() => this.setState({ loading: false }))
        );
    }

    setLoading(loading) {
        this.setState({ loading });
    }
}