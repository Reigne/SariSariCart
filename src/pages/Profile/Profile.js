import React from "react";
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";

export default function Profile() {
  return (
    <div className="container mx-auto py-4">
      <div className="flex relative">
        <div className="sticky top-0">
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
}
