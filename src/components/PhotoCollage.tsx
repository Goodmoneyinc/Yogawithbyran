import React from 'react';

const photos = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/3822702/pexels-photo-3822702.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Yoga pose in nature"
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3822501/pexels-photo-3822501.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Meditation practice"
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Advanced yoga pose"
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/396133/pexels-photo-396133.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Prenatal yoga"
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/3822507/pexels-photo-3822507.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Power yoga session"
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/3823207/pexels-photo-3823207.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Group yoga class"
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Yoga stretching"
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Outdoor yoga practice"
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=400",
    alt: "Yoga equipment"
  }
];

export default function PhotoCollage() {
  return (
    <section className="py-20 bg-gradient-to-br from-sage-50 to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-medium text-stone-800 mb-4">
            Our Yoga Journey
          </h2>
          <p className="text-xl font-body font-light text-stone-600 max-w-3xl mx-auto">
            Moments from our yoga community - capturing the beauty of practice, 
            growth, and mindful movement in every session.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className={`
                relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer
                ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                ${index === 4 ? 'lg:col-span-2' : ''}
                ${index === 7 ? 'md:row-span-2' : ''}
              `}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={`
                  w-full object-cover group-hover:scale-110 transition-transform duration-500
                  ${index === 0 ? 'h-64 md:h-full' : 'h-48 md:h-56'}
                  ${index === 4 ? 'h-48' : ''}
                  ${index === 7 ? 'h-48 md:h-full' : ''}
                `}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-body font-medium">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="font-body text-stone-600 mb-6">
            Follow us on social media to see more moments from our yoga community
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://www.instagram.com/weems_bryan?igsh=MWVmdTJzMnphMndoaA==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-body font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Follow on Instagram
            </a>
            <a 
              href="https://youtube.com/@yogawithbryan-h2x?si=BQoODmoxmpwxvC3M" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-body font-medium hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}