import { AuthenticationProver } from "./auth"

export const AuthIndex = ({ children }) => {
    return (
        <AuthenticationProver>
            {children}
        </AuthenticationProver>
        )
}