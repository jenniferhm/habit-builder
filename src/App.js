import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css'
import NavigationBar from './components/NavigationBar';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

const FAKE = 'Joe Smith';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      speech: null,
      goals: [],
    }
    this.signedInFlow = this.signedInFlow.bind(this);
    this.requestSignIn = this.requestSignIn.bind(this);
    this.requestSignOut = this.requestSignOut.bind(this);
    this.signedOutFlow = this.signedOutFlow.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    console.log('props available', this.props.contract);
    const allGoals = await this.props.contract.get30DayChallenges({ person: FAKE });
    this.setState({ goals: allGoals });

    let loggedIn = this.props.wallet.isSignedIn();
    if (loggedIn) {
      this.signedInFlow();
    } else {
      this.signedOutFlow();
    }
  }

  async signedInFlow() {
    console.log("come in sign in flow")
    this.setState({
      login: true,
    })
    const accountId = await this.props.wallet.getAccountId()
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
    const response = await this.props.contract.welcome({ account_id: accountId })

    this.setState({ speech: response.text });
  }

  async requestSignIn() {
    const appTitle = 'NEAR React template';
    await this.props.wallet.requestSignIn(
      window.nearConfig.contractName,
      appTitle
    )
  }

  requestSignOut() {
    this.props.wallet.signOut();
    setTimeout(this.signedOutFlow, 500);
    console.log("after sign out", this.props.wallet.isSignedIn())
  }

  signedOutFlow() {
    if (window.location.search.includes("account_id")) {
      window.location.replace(window.location.origin + window.location.pathname)
    }
    this.setState({
      login: false,
      speech: null
    })
  }

  async handleClick() {
    console.log('hi');
    const goals = await this.props.contract.set30DayChallenge({ person: 'Joe Smith', name: 'exercise everyday' });
    this.setState({ goals });
  };

  render() {
    let style = {
      fontSize: "1.5rem",
      color: "#0072CE",
      textShadow: "1px 1px #D1CCBD"
    }
    return (
      <div className="App-header">
          <NavigationBar login={this.state.login} requestSignIn={this.requestSignIn} requestSignOut={this.requestSignOut}/>
        <p style={style}>{this.state.speech}</p>

        <Switch>
          <Route exact to='/'>
            <HomePage/>
          </Route>
        </Switch>

        <button onClick={this.handleClick}>Add a 30 day challenge</button>
        <p> Current goals: </p>
        {this.state.goals.map((goal) =>
          <p> {goal.person} {goal.task} {goal.dateStarted} </p>
        )}
      </div>
    )
  }

}

export default App;
