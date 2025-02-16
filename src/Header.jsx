import React, { useState } from "react";
import {
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Compass,
  TrendingUp,
  User,
  Heart,
  Calendar,
  ChevronDown,
  LogOut,
} from "lucide-react";
import logo from "/logo.png";
import Ikram from "/Profile.png";
import Maria from "/1st.png";
import Hafsa from "/2nd.png";
import Salma from "/3rd.png";
import Xa from "/4th.png";
import HeroSection from "./HeroSection.jsx";

const MenuItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-4 p-2 hover:bg-gray-700 rounded-lg cursor-pointer group">
    <Icon size={20} className="text-gray-400 group-hover:text-blue-400" />
    <span className="group-hover:text-blue-400">{text}</span>
  </div>
);

const FollowingItem = ({ name, image }) => (
  <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg cursor-pointer">
    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-8 h-8 rounded-full object-cover"
      />
    </div>
    <span className="text-sm">{name}</span>
  </div>
);

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Compass, text: "Browser" },
    { icon: TrendingUp, text: "Trending" },
    { icon: User, text: "Following" },
    { icon: Heart, text: "Watchlist" },
    { icon: Calendar, text: "Coming Soon" },
  ];

  const followingUsers = [
    { name: "IkramLE", image: Ikram },
    { name: "MariaLh", image: Maria },
    { name: "HafsaBen", image: Hafsa },
    { name: "SalmaSA", image: Salma },
    { name: "Xa.na26", image: Xa },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800 bg-gray-800">
        <div className="flex items-center space-x-8">
          <div className="flex items-center ">
            <div className="w-40 h-12 flex items-center justify-center">
              <img src={logo} alt="CineVibe" className="h-22" />
            </div>
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>
        </div>

        <div className="flex items-center space-x-6 ">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="I would like to watch ..."
              className="bg-gray-900 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <Bell
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
          <div className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden">
            <img
              src={Ikram}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`
          transform transition-transform duration-300 ease-in-out z-40 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed left-0 top-[73px] h-[calc(100vh-73px)]
        `}
        >
          <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col p-4 space-y-6 overflow-y-auto">
              {/* News Feed Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">News Feed</h3>
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      icon={item.icon}
                      text={item.text}
                    />
                  ))}
                </div>
              </div>

              {/* Following Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Following</h3>
                <div className="space-y-2">
                  {followingUsers.map((user) => (
                    <FollowingItem
                      key={user.name}
                      name={user.name}
                      image={user.image}
                    />
                  ))}
                  <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-blue-400 w-full">
                    <ChevronDown size={16} />
                    <span className="text-sm">Load more</span>
                  </button>
                </div>
              </div>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-700">
              <button className="flex items-center space-x-4 text-red-400 hover:text-red-600 hover:bg-gray-700 p-2 rounded-lg w-full">
                <LogOut size={20} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          {/* content will be here */}
        </div>
      </div>

      {/* Hero section */}

      <HeroSection />
    </div>
  );
};

export default Header;
