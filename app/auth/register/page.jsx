'use client'

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"


const RegisterPage = () => {


    const { register, handleSubmit, formState: { errors } } = useForm()

    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {

        const res = await fetch('/api/auth/register' , {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
            
        });

        if(res.ok) {
            router.push('/auth/login')
        }

        const resJSON = await res.json()
        console.log(resJSON)

    })


    return (
        <div className="flex justify-center items-center">
            <form onSubmit={onSubmit} className="flex flex-col">
                <h1 className="text-slate-200 font-bold text-4xl mb-4 text-center">Log in </h1>

                <label htmlFor="username" className="text-slate-200">Username</label>
                <input type="text"
                    {...register('username', {
                        required: {
                            value: true,
                            message: 'Username is required'
                        }
                    })}
                    className="main-input"
                />
                {
                    errors.username && (
                        <span className="text-red-500">{errors.username.message}</span>
                    )
                }


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

export default RegisterPage