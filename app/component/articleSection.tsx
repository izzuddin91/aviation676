import React from 'react';

const ArticleSection = () => {
    return (
        <div className='grid lg:grid-cols-6 gap-4 p-4'>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Regret Buying The House Too Early</p>
                    <p className='text-gray-600'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.</p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-3 rounded-lg'>
                    <span className='text-green-700 text-lg'> <a href="/article/1" >+</a> </span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Airbnb: Play Around Dengan Harga </p>
                    <p className='text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-3 rounded-lg'>
                <span className='text-green-700 text-lg'> <a href="/article/2" >+</a> </span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>Lorem Ipsum</p>
                    <p className='text-gray-600'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
                </div>
                <p className='bg-green-200 flex justify-center items-center p-3 rounded-lg'>
                    <span className='text-green-700 text-lg'>+</span>
                </p>
            </div>
        </div>
    )
}

export default ArticleSection