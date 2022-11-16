import { useEffect } from "react"
import toast from "react-hot-toast"
import { useHistory } from "react-router-dom";

export const ResetUser = () => {

    const history = useHistory();
    const resetTime = Math.floor(Date.now() / 1000) + 60 * 60

    useEffect(() => {
        setTimeout(() => {
            localStorage.clear();
            toast.success("Sua sessão expirou, por favor realize novamente o login!", {
                style: {
                  backgroundColor: "#fff",
                  color: "#000",
                },
              });
              history.go(0)
        }, resetTime)
    }, [history, resetTime])

    return (
        <></>
    )
}