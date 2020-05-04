import React from 'react';
import './App.css';
import { useDispatch} from "react-redux";
import {getInitialData} from "./library/redux/actions";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {HomeComponent} from "./library/details";
import {LoginComponent, RegisterComponent} from "./library/mainPage";
import {AdminPanelComponent} from "./library/mainPage/admin";
import {Layout} from "antd";

const { Content } = Layout;

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getInitialData.started(undefined));
  }, [dispatch]);
  return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout style={{ background: 'white' }}>
                <Content>
                    <Switch>
                        <Route exact path="/home" component={HomeComponent} />
                        <Route exact path="/register" component={RegisterComponent} />
                        <Route exact path="/admin" component={AdminPanelComponent} />
                        <Route exact path="/" component={LoginComponent} />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
  )
}

export default App;
