import {Redirect, Route, Switch} from "react-router-dom";
import TasklistOverview from "./tasklists/TasklistOverview";
import TasklistView from "./tasklists/TasklistView";
import Login from "./accounts/login";
import Logout from "./accounts/logout";
import Register from "./accounts/register";

const Pages = () => {
    return (
        <Switch>
            <Route exact path="/" component={TasklistOverview}></Route>
            <Route exact path="/tasklists" component={TasklistOverview}></Route>
            <Route exact path="/tasklists/:tasklistId" component={TasklistView}></Route>
            <Route exact path="/accounts/login" component={Login}></Route>
            <Route exact path="/accounts/logout" component={Logout}></Route>
            <Route exact path="/accounts/register" component={Register}></Route>
            <Route exact path="/*">
                <Redirect to="/404"/>
            </Route>
        </Switch>
    );
};

export default Pages;
