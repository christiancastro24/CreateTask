import { Switch, Route } from 'react-router-dom'
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
        </Switch>
    )
}