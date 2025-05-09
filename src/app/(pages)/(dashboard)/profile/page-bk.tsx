"use client";

import { useState, useRef, useEffect, type ChangeEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { EyeSlashFilledIcon } from "@/components/icon/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icon/EyeFilledIcon";
import { Button } from "@heroui/react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  // const [dataFound, setDataFound] = useState(false); // Flag indicating whether profile data was found

  // State for profile image (for header & profile picture) and cover image.
  // Initially, profileImage could be a URL (string) or a File (when updated).
  const [profileImage, setProfileImage] = useState<any>(
    "/placeholder.svg?height=300&width=300"
  );
  const [url, setURL] = useState<any>();
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

  // Loader state for update/save action.

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
            name: response.data.data.first_name || "",
            email: response.data.data.email || "",
            phone: response.data.data.phone_number || "",
            password: response.data.data.password || "",
            confirmPassword: response.data.data.password || "",
            clientId: response.data.data.client_id || "",
          });
          setOriginalData({
            name: response.data.data.last_name || "sfdfsfd",
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

  // Updated update handler builds a FormData payload,
  // uploading the profile image (binary) as the primary image in the payload.

  const handleUpdateProfile = async () => {
    const token = getAccessToken();
    const profileImageData = new FormData()
    profileImageData.append("profile_picture", profileImage)
    try {
      const response = await axios.put(
        "https://api-dev.watchlytics.io/api/auth/update/",
        profileImageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status) {
        setProfileImage(null)
        setIsEditing(false)
        toast.success(response?.data?.message);
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error?.data?.message || "Faild to update profile picture");
    }
  }
  const handleUpdateClick = async () => {
    const newErrors: Record<string, string> = {};

    // Basic required field validations.
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

    // Additional validations.
    // Email validation using regex.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    // Phone validation: Must be exactly 10 digits.
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    // Password validation: Minimum 6 characters.
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    // Client ID must be between 8 to 10 characters.
    if (
      formData.clientId &&
      (formData.clientId.toString().length < 8 ||
        formData.clientId.toString().length > 10)
    ) {
      newErrors.clientId = "Client ID must be between 8 to 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);
      toast.error("Update Failed", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      const token = getAccessToken();
      // Build FormData to include text fields and binary file for the profile image.
      const payload = new FormData();
      payload.append("first_name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone_number", formData.phone);
      payload.append("password", formData.password);
      payload.append("client_id", formData.clientId);
      // Check if profileImage is a File instance (binary data) and append accordingly.
      if (profileImage instanceof File) {
        // Only append if it's a new file (updated image)
        payload.append("profile_picture", profileImage);
      } else if (
        profileImage &&
        typeof profileImage == "string" &&
        profileImage !== ""
      ) {
        // If it's a URL string, only append if it has a value (indicating it wasn't left empty)
        // payload.append("profile_picture", profileImage);
      }
      // Append cover picture as well.
      payload.append("coverPicture", coverImage);
      // setLoading(true);
      const response = await axios.put(
        "https://api-dev.watchlytics.io/api/auth/update/",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
      setOriginalData({ ...formData });
      toast.success("Profile updated successfully!", { position: "top-right" });
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Failed to update profile", { position: "top-right" });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  // Updated handleImageChange accepts only JPG and PNG files,
  // stores the file as binary in state (to be sent in the FormData), and
  // does not create a preview URL (since the binary is uploaded directly).
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png"];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only JPG and PNG files are allowed", {
          position: "top-right",
        });
        return;
      }

      try {
        // Save the file (binary) in state for later uploading.
        setProfileImage(file);
        // Create a preview URL.
        setURL(URL.createObjectURL(file));
      } catch (error) {
        console.error("Image upload error", error);
        toast.error("Failed to upload image", { position: "top-right" });
      }
    }
  };


  return (
    <>
      {/* Desktop Header - Hidden on mobile */}
      <header className="hidden md:flex bg-white p-4 justify-end items-center border-b shadow-sm">
        <div className="flex items-center gap-4">
          <Image src="/Notification.svg" alt="clock" width={40} height={40} />
          {/* Loader in Hero UI if update is in progress */}

          <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
            <img
              src={profileImage instanceof File ? url : profileImage}
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
                    src={url || profileImage}
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
                    disabled
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
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
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
                      type={!isPasswordVisible ? "text" : "password"}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
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
                      type={!isConfirmPasswordVisible ? "text" : "password"}
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
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-between">
              {isEditing ? (
                <div className="space-x-4">
                  <Button
                    isLoading={loading}
                    onPress={profileImage ? handleUpdateProfile : handleUpdateClick}
                    className="bg-[linear-gradient(180deg,_#092CA2_0%,_#003BFF_100%)] hover:opacity-90 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </Button>
                  <Button
                    onPress={handleCancelClick}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
