"use client";
import { use, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FileMetaTypes, RequestTypes } from "@/types";
import { ProfileFormFields, ProfileFormSchema } from "@/utils/mock";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormField from "@/components/common/FormField";
import FileUploader from "@/components/common/UploadWithDragDrop";
import RoundedBox from "@/components/common/baseButton/RoundedBox";
import clsx from "clsx";
import Heading from "@/components/common/heading";
import { Button } from "@/components/common/baseButton/BaseButton";
import { TransparentButton } from "@/components/common/baseButton/TransparentButton";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppContext } from "@/providers/AppContextProvider";
import Icon from "@/components/common/Icon";
import { useMe, useUpdateProfile } from "@/hooks/useprofile";

type FormSchemaType = z.infer<typeof ProfileFormSchema>;
export default function ProfilePage() {
  const { setCurrentUser } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useRouter()
  const { data: user, isLoading, isError, error } = useMe();

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();
  const [togglePassType, setTogglePassType] = useState<{ [key: string]: boolean }>({
    password: false,
    confirm_password: false,
  });

  const [fileMeta, setFileMeta] = useState<FileMetaTypes | null>();
  const handleTogglePasswordType = (fieldName: string) => {
    setTogglePassType((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      profile_picture: null,
    }
  });

  const [password, confirmPassword] = watch(["password", "confirm_password"]);
  useEffect(() => {
    if (password || confirmPassword) {
      trigger(["password", "confirm_password"]);
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value);
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    formData.delete("profile_picture");
    formData.delete("email");

    if (fileMeta?.file) {
      formData.append("profile_picture", fileMeta.file);
    }

    try {
      const res = await updateProfile(formData);
      setIsEditing(false);
      // @ts-ignore
      fileMeta?.file && setFileMeta((prev) => ({ ...prev, file: null }));

      // @ts-ignore
      formData.get("confirm_password") && setValue("confirm_password", formData.get("confirm_password"));

      fileMeta?.url && setCurrentUser({ image: fileMeta.url });

      if (formData.get("confirm_password")) {
        localStorage.removeItem("isLoggedin");
        await fetch('/api/logout');
        navigate.push("/login");
      }

      toast.success(res?.data?.message || "Profile updated successfully");
    } catch (err: any) {
      const errors = err?.response?.data;
      if (errors && typeof errors === 'object') {
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key][0] || "Failed to update profile");
        });
      } else {
        toast.error("Something went wrong while updating the profile");
      }
    }
  };



  const handleReset = () => {
    reset()
    setIsEditing(false);
    setFileMeta(null)
    setFileMeta(getValues("profile_picture"))
  }

  const isFormReady = isValid && (isDirty || fileMeta?.file);
  useEffect(() => {
    if (user) {
      setFileMeta(user?.data.profile_picture || null);

      const formData: any = {};
      Object.keys(user?.data).forEach((key) => {
        if (user[key] !== null) {
          formData[key] = user?.data[key];
        }
      });
      reset(formData);
      trigger();
      setCurrentUser({ image: user?.data.profile_picture });
    }
  }, [user]);


  if (isError || error) {
    console.log(isError, error)
    toast.error(error?.message)
  }

  if (isLoading) {
    return <div className="text-center mt-5"><Spinner /></div>
  }


  return (
    <>
      <RoundedBox>
        <div

          style={{
            backgroundImage: `url("/profile.png")`
          }}
          className={clsx("bg-no-repeat rounded-lg flex justify-end items-end bg-cover py-6 object-contain h-[280px] w-full")}
        >
          {
            isEditing ? null : <div className="pe-5 relative z-[11]"><Button onPress={() => setIsEditing(!isEditing)} title='Edit Profile' className='h-10 px-5' /></div>
          }
        </div>
        <div className="relative sm:-mt-24 -mt-20 px-8 pb-6 z-10">
          <div className={clsx("w-fit cursor-pointer", isEditing ? "" : " pointer-events-none")}>
            <FileUploader
              onChange={(fileData) => {
                setFileMeta(null)
                setFileMeta(fileData);
              }}
            >
              <RoundedBox className={clsx("sm:w-[140px] flex items-center justify-center sm:h-[140px] w-[100px] h-[100px] -ms-6 outline-gray-180 overflow-hidden !rounded-full border cursor-pointer !bg-gray-100 duration-500 hover:!bg-gray-180")}>

                {fileMeta?.url || fileMeta ? (
                  <img
                    width={140}
                    // @ts-ignore
                    src={fileMeta?.url || fileMeta}
                    alt="Selected Image"
                    className="w-full h-full object-cover"
                  />
                ) : <div>
                  <Icon name="camera" size="2rem" fill="#808080" />
                </div>}
              </RoundedBox>
            </FileUploader>
            <Heading>{getValues("first_name")}</Heading>
            <div className=" text-sm text-gray-190">Joined {getValues("date_joined")}</div>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <Heading>Personal Information</Heading>
            <fieldset className="grid sm:grid-cols-2 grid-cols-1 gap-3 mt-3">
              {
                ProfileFormFields.map((field) => (
                  <FormField
                    fieldType={field.fieldType}
                    type={
                      field.type === "password"
                        ? togglePassType[field.name]
                          ? "text"
                          : "password"
                        : field.type
                    }
                    field={field}
                    key={field.label}
                    isDisabled={field?.type === "email" ? true : !isEditing}
                    label={field.label}
                    name={field.name}
                    control={control}
                    placeholder={field.placeholder}
                    errors={errors}
                    inputContainer="w-full"
                    containerClass="bloc"
                    iconSize="1.5rem"
                    icon={
                      field.type === "password"
                        ? togglePassType[field.name]
                          ? "filledEye"
                          : "eyeOff"
                        : undefined
                    }
                    onPasswordToggle={() => handleTogglePasswordType(field.name)}
                  />
                ))
              }
            </fieldset>
            {isEditing ? <div className="flex items-center gap-3 mt-6">
              <Button isLoading={isPending} title='Update' type="submit" className='h-10' isDisabled={!isFormReady} />
              <TransparentButton title='Cancel' className='h-10' onPress={handleReset} />
            </div> : null}
          </form>
        </div>
      </RoundedBox>
    </>
  );
}