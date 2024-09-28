import React from 'react';

const ArticleSection = () => {
    return (
        <div className="grid lg:grid-cols-3 gap-6 p-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white border rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
                    <div className="relative overflow-hidden rounded-t-xl">
                        {/* Example YouTube Thumbnail */}
                        <img
                            src={`https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg`}
                            alt="YouTube Thumbnail"
                            className="w-full h-48 object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <p className="text-2xl font-bold mb-2">Regret Buying The House Too Early</p>
                        <p className="text-gray-600 mb-4">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...
                        </p>
                        <div className="flex justify-center">
                            <a href="/article/1" className="bg-violet-600 text-white text-lg font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticleSection;
