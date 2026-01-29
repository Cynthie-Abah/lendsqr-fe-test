"use client"
import Input from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { User } from '@/app/types/types'
import { AlertCircle } from 'lucide-react'
import useLogin from '@/app/hooks/useLogin'


export const LoginForm = () => {
    const { 
        register,
        reset, 
        formState: { 
            isSubmitting, 
            errors}, 
        handleSubmit 
    } = useForm<User>()
    const {login, isPending} = useLogin();

const onSubmit =  (data: User) => {
        login(data, {
            onSuccess() {
                reset();
            },
        })
        
    }

    const isLoading = isSubmitting || isPending;

  return (
    <div className="form">
        <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
            <h2>Welcome!</h2>
            <p>Enter details to login.</p>
            <div className="input-container">
                <label htmlFor="email" hidden>email</label>
                <Input
                id='email'
                type='email'
                className='input' 
                placeholder='Email'
                {...register('email', { required: 'Email is required' })}
                />
                {errors.email &&
                <p role="alert" className='error'>
                    <AlertCircle width={15} height={15} /> 
                    {errors.email.message}
                </p>}
                <label htmlFor="password" hidden>password</label>
                <Input 
                id='password'
                className='input' 
                placeholder='Password' 
                inputType='password'
                {...register('password', { required: 'Password is required' })}
                />
                {
                errors.password && 
                <p role="alert" className='error'>
                    <AlertCircle width={15} height={15} /> 
                    {errors.password.message}
                </p>}

                <button 
                type='button' 
                disabled={isLoading} 
                className="forgot-password-btn">
                    forgot password
                </button>

                <Button 
                type='submit'
                disabled={isLoading || isPending}>
                    { isLoading || isPending ? 'logging in...' : 'log in'}
                </Button>
            </div>
        </form>
    </div>
  )
}
