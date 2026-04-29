import { useState } from 'react';

const ImageGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images[0] || 'https://via.placeholder.com/600');

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden shadow-lg aspect-video bg-gray-100">
        <img src={mainImage} className="w-full h-full object-cover transition-all duration-300" alt="Car View" />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((img, i) => (
          <img 
            key={i} src={img} 
            onClick={() => setMainImage(img)}
            className="w-20 h-20 rounded-lg object-cover cursor-pointer border-2 hover:border-blue-500 transition shadow-sm"
          />
        ))}
      </div>
    </div>
  );
};