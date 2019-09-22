import React, { Component } from 'react';
import './Conversor.css'

export default class Conversor extends Component { // Já consigo acessar minhas props, valores.
    constructor(props) {
        super(props)
        // Estado do componente. É um objeto
        // Armazenar o valor para conversão
        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
        }

        // This é usado para se referir ao objeto atual
        // O bind vai fazer com que o contexto do 'this' seja sempre o do constructor
        // É passado um objeto dentro do bind para servir de contexto
        this.converter = this.converter.bind(this)
    }

    // Método converter
    converter() {
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`
        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=f03e52f643fd674f1b3a`
        // Pegar o dado convertido da url e transforma em JSON
        fetch(url) //Promisse
            .then(res => {
                return res.json()
            })
            .then(json => {
                let cotacao = json[de_para]
                let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2) // Duas casas decimais
                // Só mudar o valor não é o suficiente. Tem que setar o estado
                this.setState({moedaB_valor})
            })
    }

    render() {
        return ( // Todo componente tem que retornar apenas uma div
            // As props são inseridas quando declaro o componente em App

            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                {/* O onChange dispara um evento. Target se refere ao input */}
                <input type="text" onChange={(event) => { this.setState({ moedaA_valor: event.target.value }) }}></input>
                <input type="button" value="Converter" onClick={this.converter}></input>
                <h2>Valor Convertido: ${this.state.moedaB_valor} </h2>
            </div>
        );
    }
}
