"use client"
import React, { useState } from 'react';
import axios from 'axios'; 
import withoutAuth from '../withoutAuth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [msgFail, setMsgFail] = useState('');
    const [msgSuccess, setMsgSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password.length < 8) {
            setMsgFail('Hasło musi zawierać co najmniej 8 znaków.');
            setIsLoading(false);
            return;
        }

        if (password !== passwordRepeat) {
            setMsgFail('Hasła nie są takie same!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/create`, {
                name,
                email,
                password
            });

            setEmail('');
            setName('');
            setPassword('');
            setPasswordRepeat('');
            setMsgSuccess('Konto zostało utworzone.');
            setMsgFail('');
        } catch (error) {
            if (error.response?.status === 400) {
                setMsgFail(error.response.data.message || "Istnieje już użytkownik o podanej nazwie.");
            } else {
                console.error("Nieoczekiwany błąd:", error);
            }
        } finally {
            setIsLoading(false);
        }
            
            
            
            
    };

    return (
        <>
            <form className='w-[90%] lg:w-[50%] mx-auto' onSubmit={handleSubmit}>
                <p className='my-8 text-[24px] text-myCol text-red text-center lg:text-left'>Rejestracja</p>
                <hr className='bg-myCol mb-8 h-0.5'/>
                <p className='text-[red]'>{msgFail}</p>
                <p className='text-[green]'>{msgSuccess}</p>
                <br/>
                <label htmlFor="userEmail">E-mail:</label><br/>
                <div className=' flex justify-center lg:justify-normal'>
                    <input type="email" id="userEmail" value={email}  onChange={(e) => setEmail(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <label htmlFor="userName">Nazwa:</label><br/>
                <div className=' flex justify-center lg:justify-normal'>
                    <input type="text" id="userName" value={name}  onChange={(e) => setName(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <label htmlFor="password">Hasło:</label><br/>
                <div className='flex justify-center lg:justify-normal'>
                    <input type="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <br/>
                <label htmlFor="passwordRepeat">Powtórz hasło:</label><br/>
                <div className='flex justify-center lg:justify-normal'>
                    <input type="password" id="passwordRepeat"  value={passwordRepeat}  onChange={(e) => setPasswordRepeat(e.target.value)}  className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required />
                </div>
                <br/>
                <div className='flex justify-center lg:justify-normal'>
                    <button type="submit" className='bg-myCol p-2 rounded-md text-myBg shadow-lg px-8'>Zarejestruj się</button>
                    {isLoading && (
                        <svg aria-hidden="true" className="ml-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    )}
                </div>
            </form>
        </>
    );
};

export default withoutAuth(Register);