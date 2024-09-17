import React, { useState } from 'react';

const AvatarDisplay = () => {
  const [showAvatars, setShowAvatars] = useState(false);

  const avatars = [
    { id: 1, name: 'John Doe', img: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', img: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Alex Johnson', img: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Emily Davis', img: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Michael Brown', img: 'https://i.pravatar.cc/150?img=5' },
  ];

  const handleButtonClick = () => {
    setShowAvatars(true);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleButtonClick}
      >
        Show Avatars
      </button>

      {showAvatars && (
        <div className="mt-4 grid grid-cols-5 gap-4">
          {avatars.map((avatar) => (
            <div key={avatar.id} className="flex flex-col items-center">
              <img
                src={avatar.img}
                alt={avatar.name}
                className="w-16 h-16 rounded-full"
              />
              <p className="mt-2 text-center text-gray-700">{avatar.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarDisplay;
