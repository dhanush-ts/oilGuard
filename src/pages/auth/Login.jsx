import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react"

export const Login = () => {

  const emailref = useRef();
  const passref = useRef();

  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(emailref.current.value, passref.current.value)
  }

  return (
    <div className="flex justify-center">
      <div className="dark:bg-black rounded-lg flex flex-col border-2 dark:border-slate-50 m-5 p-24">
        <h1 className="text-5xl mb-12 text-center font-semibold">Login</h1>
        <p className="mt-8 text-2xl">Email</p>
        <Input  ref={emailref} type="email" className="my-2 text-xl" placeholder="email" />
        <p className="mt-8 text-2xl">Password</p>
        <Input ref={passref} type="password" className="my-2 text-xl" placeholder="Password" />
        <Button onClick={ HandleSubmit } className='text-xl my-5 w-full font-bold mx-auto'>Login</Button>
      </div>
    </div>
  )
}
