import { useAuth } from "@/context/AuthContext"
import { validateToken } from "@/utils/Getter"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../ui/use-toast"

interface ChildrenProps {
  children: JSX.Element
}

export default function PrivateCompany({ children }: ChildrenProps) {
  const navigate = useNavigate()
  const { companyToken, logoutCompany } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    async function validate() {
      if (!companyToken) {
        toast({
          title: 'Token inválido',
        })

        logoutCompany()
        navigate('/company/register')
        return
      }

      const status = await validateToken(companyToken)

      if (!status) {
        logoutCompany()
        toast({
          title: 'Token inválido',
          variant: 'destructive',
        })
        navigate('/company/register')
        return
      }
    }

    validate()
  }, [companyToken])

  return <>{children}</>
}
