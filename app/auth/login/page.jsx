'use client'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if(res.error){
      alert(res.error)
    } else {
      router.push('/dashboard')
    }

    console.log(res)
  })

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={onSubmit} className="flex flex-col">

        <h1 className="text-slate-200 font-bold text-4xl mb-4 text-center"> Login </h1>

        <label htmlFor="email" className="text-slate-200">email</label>
        <input type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'email is required'
            }
          })}
          className="main-input"
        />
        {
          errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )
        }

        <label htmlFor="password" className="text-slate-200">password</label>
        <input type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'password is required'
            }
          })}
          className="main-input"
        />
        {
          errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )
        }

        <button className="bg-blue-600 p-2 mt-2 text-white w-full rounded-lg">
          Register
        </button>

      </form>
    </div>
  )
}

export default LoginPage