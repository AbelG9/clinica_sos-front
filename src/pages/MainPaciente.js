import React, {useState} from 'react';
import SideBar from '../components/sidebar/SideBar';
import Content from '../components/sidebar/Content';
import "../assets/styles/SideBar.css";
import "../assets/styles/Content.css";

const Mainpatient = () => {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
    return (
        <div className="AppDash wrapper">
            <SideBar 
                toggle={toggleSidebar} 
                isOpen={sidebarIsOpen} 
            />
            <Content 
                toggleSidebar={toggleSidebar} 
                sidebarIsOpen={sidebarIsOpen} 
            />
        </div>
    );
}

export default Mainpatient;