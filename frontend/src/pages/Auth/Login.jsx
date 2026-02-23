import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

const Login = () => {
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          Welcome Back 👋
        </h3>

        <p className="text-sm text-slate-600 mt-2 mb-8">
        Please enter your details to log in.
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login