import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const EXCHANGE_RATES = gql`
  query CurrencyRates {
    rates(currency: "USD") {
      rate
    }
  }
`;

const ExchangeRates = () => (
  <Query query={EXCHANGE_RATES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        data &&
        data.rates &&
        data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>{`${currency}: ${rate}`}</p>
          </div>
        ))
      );
    }}
  </Query>
);

class App extends React.Component<{}, { toggle: boolean }> {
  state = { toggle: true };
  toggleToggle = () => this.setState({ toggle: !this.state.toggle });
  render() {
    const { toggle } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <ExchangeRates />
          <h1>
            This app is built with <br />React ⚛️ + <br /> Parcel 📦 + <br />{" "}
            Typescript🚀!
          </h1>
          <img
            src={logo}
            onClick={this.toggleToggle}
            className={"App-logo " + (toggle && "Logo-spin")}
            alt="logo"
          />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <A href="https://reactjs.org/">Learn React</A>
          <A href="https://github.com/sw-yx/react-typescript-cheatsheet">
            Learn React+Typescript
          </A>
          <A href="https://parceljs.org/getting_started.html">Learn Parcel</A>
        </header>
      </div>
    );
  }
}

function A(props) {
  // you can use object spread because babel-preset-react-app is set up for you
  const { href, children, ...rest } = props;
  return (
    <a
      className="App-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}
export default App;
