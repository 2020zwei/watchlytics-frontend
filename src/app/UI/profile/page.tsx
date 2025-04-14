// "use client";

// import { useState, useRef, useEffect, type ChangeEvent } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import Image from "next/image";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Layout from "../layout";
// import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
// import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";

// export default function ProfilePage() {
//   const [isEditing, setIsEditing] = useState(false);
//   const [dataFound, setDataFound] = useState(false); // Flag indicating whether profile data was found

//   // State for profile image (for header & profile picture) and cover image.
//   const [profileImage, setProfileImage] = useState(
//     "/placeholder.svg?height=300&width=300"
//   );
//   const [coverImage, setCoverImage] = useState("/profile.png");

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Separate visibility states for password and confirm password fields.
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
//     useState(false);

//   // State for validation errors.
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   // Include clientId in the form state.
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     clientId: "",
//   });

//   const [originalData, setOriginalData] = useState({ ...formData });

//   // Utility function to get token from cookie if needed.
//   const getAccessToken = () => {
//     return Cookies.get("access_token") || "";
//   };

//   // On component mount, call GET API to fetch profile details.
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = getAccessToken();
//         const response = await axios.get(
//           "https://api-dev.watchlytics.io/api/auth/me/",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         // Assuming API response returns data in response.data.data
//         if (
//           response.data &&
//           response.data.data &&
//           Object.keys(response.data.data).length > 0
//         ) {
//           setDataFound(true);
//           // Update form fields and image states based on your API response.
//           setFormData({
//             name: response.data.data.last_name || "",
//             email: response.data.data.email || "",
//             phone: response.data.data.phone_number || "",
//             password: response.data.data.password || "",
//             confirmPassword: response.data.data.password || "",
//             clientId: response.data.data.client_id || "",
//           });
//           setOriginalData({
//             name: response.data.data.last_name || "",
//             email: response.data.data.email || "",
//             phone: response.data.data.phone_number || "",
//             password: response.data.data.password || "",
//             confirmPassword: response.data.data.password || "",
//             clientId: response.data.data.client_id || "",
//           });
//           setProfileImage(
//             response.data.data.profile_picture ||
//               "/placeholder.svg?height=300&width=300"
//           );
//           setCoverImage(response.data.data.cover_picture || "/profile.png");
//         } else {
//           setDataFound(false);
//           // No data; leave fields empty and keep default images.
//           setFormData({
//             name: "",
//             email: "",
//             phone: "",
//             password: "",
//             confirmPassword: "",
//             clientId: "",
//           });
//           setOriginalData({
//             name: "",
//             email: "",
//             phone: "",
//             password: "",
//             confirmPassword: "",
//             clientId: "",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching profile data", error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error for this field.
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//     setOriginalData({ ...formData });
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//     setFormData({ ...originalData });
//     setErrors({});
//   };

//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
//   };

//   // PUT request to update profile data with validation.
//   const handleUpdateClick = async () => {
//     let newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     }
//     if (!formData.clientId.toString().trim()) {
//       newErrors.clientId = "Client ID is required";
//     }
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     }
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       toast.error("Please fix the errors before updating", {
//         position: "top-right",
//       });
//       return;
//     }

//     try {
//       const token = getAccessToken();
//       // Include images with the payload.
//       const payload = {
//         ...formData,
//         profilePicture: profileImage,
//         coverPicture: coverImage,
//       };
//       const response = await axios.put(
//         "https://api-dev.watchlytics.io/api/auth/update/",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("Update successful:", response.data);
//       setIsEditing(false);
//       setOriginalData({ ...formData });
//       toast.success("Profile updated successfully!", { position: "top-right" });
//     } catch (error) {
//       console.error("Failed to update profile", error);
//       toast.error("Failed to update profile", { position: "top-right" });
//     }
//   };

//   const handleImageClick = () => {
//     if (isEditing) {
//       fileInputRef.current?.click();
//     }
//   };

//   // For updating the profile picture. (Assuming single file input handles profile image.)
//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event.target?.result) {
//           // Update profile picture state.
//           setProfileImage(event.target.result as string);
//         }
//       };
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   return (
//     <>
//       {/* Desktop Header - Hidden on mobile */}
//       <header className="hidden md:flex bg-white p-4 justify-end items-center border-b shadow-sm">
//         <div className="flex items-center gap-4">
//           <Image src="/Notification.svg" alt="clock" width={40} height={40} />
//           <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
//             <img
//               src={profileImage || "/placeholder.svg?height=300&width=300"}
//               alt="User"
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//       </header>

//       {/* Profile Content - Scrollable */}
//       <main className="flex-1 overflow-auto p-6">
//         <div className="mx-auto bg-white rounded-lg shadow-sm">
//           {/* Card with pattern at the top */}
//           <div className="relative">
//             {/* Cover Picture */}
//             <div className="h-48 w-full rounded-t-lg overflow-hidden">
//               <div
//                 className="w-full h-full"
//                 style={{
//                   backgroundImage: `url("${coverImage}")`,
//                   backgroundSize: "300px",
//                 }}
//               ></div>
//             </div>

//             {/* Edit Profile Button - Positioned at the top right */}
//             {!isEditing && (
//               <button
//                 className="absolute top-32 text-white right-4 px-4 py-2 rounded-md text-sm font-medium bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
//                 onClick={handleEditClick}
//               >
//                 Edit Profile
//               </button>
//             )}

//             {/* Profile Picture - Positioned to overlap the cover and white area */}
//             <div className="absolute left-8 top-32">
//               <div className="relative group">
//                 <div
//                   className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md cursor-pointer"
//                   onClick={handleImageClick}
//                 >
//                   <img
//                     src={
//                       profileImage || "/placeholder.svg?height=300&width=300"
//                     }
//                     alt="Profile"
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//                 {isEditing && (
//                   <div
//                     className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
//                     onClick={handleImageClick}
//                   >
//                     <span className="text-white text-xs">Change</span>
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   disabled={!isEditing}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Profile Info and Form - White background */}
//           <div className="pt-16 px-8 pb-8">
//             {/* Name and Join Date */}
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold">
//                 {formData.name || "Your Name"}
//               </h1>
//               <p className="text-gray-500 text-sm">Joined 14 April 2025</p>
//             </div>

//             {/* Profile Form */}
//             <div>
//               <h2 className="text-xl font-semibold mb-6">
//                 Personal Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Name Field */}
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Name
//                   </label>
//                   <input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your name"
//                   />
//                   {errors.name && (
//                     <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//                   )}
//                 </div>

//                 {/* Email Field */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your email"
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Phone Field */}
//                 <div>
//                   <label
//                     htmlFor="phone"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Phone
//                   </label>
//                   <input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder={isEditing ? "Enter phone number" : ""}
//                   />
//                 </div>

//                 {/* Client ID Field */}
//                 <div>
//                   <label
//                     htmlFor="clientId"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Client ID
//                   </label>
//                   <input
//                     id="clientId"
//                     name="clientId"
//                     type="number"
//                     value={formData.clientId}
//                     onChange={handleInputChange}
//                     disabled={!isEditing}
//                     required
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your client id"
//                   />
//                   {errors.clientId && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.clientId}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password Field with Eye Toggle */}
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="password"
//                       name="password"
//                       type={isPasswordVisible ? "text" : "password"}
//                       value={formData.password}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       required
//                       className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter password"
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
//                       onClick={togglePasswordVisibility}
//                     >
//                       {isPasswordVisible ? (
//                         <EyeFilledIcon className="text-2xl text-default-400" />
//                       ) : (
//                         <EyeSlashFilledIcon className="text-2xl text-default-400" />
//                       )}
//                     </button>
//                   </div>
//                   {errors.password && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="confirmPassword"
//                     className="block text-sm font-medium text-gray-700 mb-1"
//                   >
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       id="confirmPassword"
//                       name="confirmPassword"
//                       type={isConfirmPasswordVisible ? "text" : "password"}
//                       value={formData.confirmPassword}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       required
//                       className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Re-enter password"
//                     />
//                     <button
//                       type="button"
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
//                       onClick={toggleConfirmPasswordVisibility}
//                     >
//                       {isConfirmPasswordVisible ? (
//                         <EyeFilledIcon className="text-2xl text-default-400" />
//                       ) : (
//                         <EyeSlashFilledIcon className="text-2xl text-default-400" />
//                       )}
//                     </button>
//                   </div>
//                   {errors.confirmPassword && (
//                     <p className="text-red-500 text-sm mt-1">
//                       {errors.confirmPassword}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {isEditing && (
//                 <div className="mt-8 flex gap-4">
//                   <button
//                     className="px-4 py-2 bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90 text-white rounded-md text-sm font-medium"
//                     onClick={handleUpdateClick}
//                   >
//                     Update
//                   </button>
//                   <button
//                     className="px-4 py-2 border border-gray-300 bg-[#F0F1F3] text-[#ACACAC] rounded-md text-sm font-medium"
//                     onClick={handleCancelClick}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//       <ToastContainer />
//     </>
//   );
// }

"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  // const [dataFound, setDataFound] = useState(false); // Flag indicating whether profile data was found

  // State for profile image (for header & profile picture) and cover image.
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=300&width=300"
  );
  const [coverImage, setCoverImage] = useState("/profile.png");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Separate visibility states for password and confirm password fields.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // State for validation errors.
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Include clientId in the form state.
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    clientId: "",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  // Utility function to get token from cookie if needed.
  const getAccessToken = () => {
    return Cookies.get("access_token") || "";
  };

  // On component mount, call GET API to fetch profile details.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getAccessToken();
        const response = await axios.get(
          "https://api-dev.watchlytics.io/api/auth/me/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Assuming API response returns data in response.data.data
        if (
          response.data &&
          response.data.data &&
          Object.keys(response.data.data).length > 0
        ) {
          // setDataFound(true);
          // Update form fields and image states based on your API response.
          setFormData({
            name: response.data.data.last_name || "",
            email: response.data.data.email || "",
            phone: response.data.data.phone_number || "",
            password: response.data.data.password || "",
            confirmPassword: response.data.data.password || "",
            clientId: response.data.data.client_id || "",
          });
          setOriginalData({
            name: response.data.data.last_name || "",
            email: response.data.data.email || "",
            phone: response.data.data.phone_number || "",
            password: response.data.data.password || "",
            confirmPassword: response.data.data.password || "",
            clientId: response.data.data.client_id || "",
          });
          setProfileImage(
            response.data.data.profile_picture ||
              "/placeholder.svg?height=300&width=300"
          );
          setCoverImage(response.data.data.cover_picture || "/profile.png");
        } else {
          // setDataFound(false);
          // No data; leave fields empty and keep default images.
          setFormData({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            clientId: "",
          });
          setOriginalData({
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
            clientId: "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field.
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setOriginalData({ ...formData });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({ ...originalData });
    setErrors({});
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // PUT request to update profile data with validation before it was let.
  const handleUpdateClick = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.clientId.toString().trim()) {
      newErrors.clientId = "Client ID is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before updating", {
        position: "top-right",
      });
      return;
    }

    try {
      const token = getAccessToken();
      // Include images with the payload.
      const payload = {
        ...formData,
        profilePicture: profileImage,
        coverPicture: coverImage,
      };
      const response = await axios.put(
        "https://api-dev.watchlytics.io/api/auth/update/",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Update successful:", response.data);
      setIsEditing(false);
      setOriginalData({ ...formData });
      toast.success("Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile", { position: "top-right" });
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  // For updating the profile picture. (Assuming single file input handles profile image.)
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Update profile picture state.
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Desktop Header - Hidden on mobile */}
      <header className="hidden md:flex bg-white p-4 justify-end items-center border-b shadow-sm">
        <div className="flex items-center gap-4">
          <Image src="/Notification.svg" alt="clock" width={40} height={40} />
          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
            <img
              src={profileImage || "/placeholder.svg?height=300&width=300"}
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Profile Content - Scrollable */}
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto bg-white rounded-lg shadow-sm">
          {/* Card with pattern at the top */}
          <div className="relative">
            {/* Cover Picture */}
            <div className="h-48 w-full rounded-t-lg overflow-hidden">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("${coverImage}")`,
                  backgroundSize: "300px",
                }}
              ></div>
            </div>

            {/* Edit Profile Button - Positioned at the top right */}
            {!isEditing && (
              <button
                className="absolute top-32 text-white right-4 px-4 py-2 rounded-md text-sm font-medium bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
            )}

            {/* Profile Picture - Positioned to overlap the cover and white area */}
            <div className="absolute left-8 top-32">
              <div className="relative group">
                <div
                  className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md cursor-pointer"
                  onClick={handleImageClick}
                >
                  <img
                    src={
                      profileImage || "/placeholder.svg?height=300&width=300"
                    }
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                {isEditing && (
                  <div
                    className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleImageClick}
                  >
                    <span className="text-white text-xs">Change</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Profile Info and Form - White background */}
          <div className="pt-16 px-8 pb-8">
            {/* Name and Join Date */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold">
                {formData.name || "Your Name"}
              </h1>
              <p className="text-gray-500 text-sm">Joined 14 April 2025</p>
            </div>

            {/* Profile Form */}
            <div>
              <h2 className="text-xl font-semibold mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Client ID Field */}
                <div>
                  <label
                    htmlFor="clientId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Client ID
                  </label>
                  <input
                    id="clientId"
                    name="clientId"
                    type="text"
                    value={formData.clientId}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your client ID"
                  />
                  {errors.clientId && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.clientId}
                    </p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeSlashFilledIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeFilledIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mt-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlashFilledIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeFilledIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              {isEditing ? (
                <div className="space-x-4">
                  <button
                    onClick={handleUpdateClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <ToastContainer />
    </>
  );
}
