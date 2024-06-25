"use client"
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from "next/image";
import { useUser } from '../userContext'; 
import withAuth from '../withAuth';

const addImage = () => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [message, setMessage] = useState('');
    const { userId } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null); 

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('id_user', userId); 
            formData.append('title', title);
            formData.append('description', description);
            formData.append('is_public', isPublic);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/createImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setMessage('Zdjęcie dodane');
        } catch(error){  
            console.log(error);
            console.log(error.response.data);   
            setMessage('Błąd podczas wstawiania pliku.');          
        }
        finally {
            setIsLoading(false);
            setFile(null); 
            setTitle('');
            setDescription('');
            setIsPublic(false);
            fileInputRef.current.value = ''; 
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='w-[90%] lg:w-[50%] mx-auto'>
                <p className='my-8 text-[24px] text-myCol text-red text-center lg:text-left'>Dodaj zdjęcie</p>
                <hr className='bg-myCol mb-8 h-0.5'/>
                
                <div className=''>
                    <label htmlFor="title">Tytuł:</label><br/>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required/>
                </div>
                <div className=''>
                    <label htmlFor="description">Opis:</label><br/>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-[100%] h-[48px] text-[24px] lg:w-[400px] border border-myCol rounded bg-formInputBgCol" required />
                </div>
                <div className=''>
                    <label htmlFor="is_public">Czy publiczne:</label>
                    <input type="checkbox" id="is_public" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="ml-2 border border-myCol rounded " />
                </div>
                <div className=''>
                    <label htmlFor="file">Wybierz zdjęcie:</label><br/>
                    <input ref={fileInputRef} type="file" id="file" accept="image/*" onChange={handleFileChange} className=" "  required/>
                </div><br/>
                <div className="flex items-center">
                    <button type="submit" className='bg-myCol p-2 rounded-md text-myBg shadow-lg'>Dodaj</button>
                    {isLoading && (
                        <svg aria-hidden="true" className="ml-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    )}
                </div>
                {message && <p className='absolute text-red lg:mt-[102px]'>{message}</p>}
                <Image src='/addImageLogo.png' width='200' height='200' alt='addImage logo' priority className='mt-[-300px] ml-[50%] hidden lg:block'/>
            </form>
        </div>
    );
};

export default withAuth(addImage);
