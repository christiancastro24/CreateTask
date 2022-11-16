import { Switch, Route } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { EditUser } from '../pages/EditUser'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

export const Routes = () => {


    return (
        <Switch>
            <Route exact path="/">
                <Register />
            </Route>

            <Route path="/login">
                <Login />
            </Route>
        
            <Route path="/dashboard">
                <Dashboard />
            </Route>

            <Route path="/editProfile">
                <EditUser />
            </Route>
        </Switch>
    )
}