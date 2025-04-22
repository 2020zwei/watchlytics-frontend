"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
import { sendRequest } from "@/utils/apis";
import { URLS, METHODS } from "@/utils/constants";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";

type FormSchemaType = z.infer<typeof ProfileFormSchema>;
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiLoading, setApiLoading] = useState<boolean>(true);
  const navigate = useRouter()
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
    trigger,
    setValue,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: {
      profile_picture: null,
    }
  });

  const onSubmit = async (data: any) => {
    setLoading(true)
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
    formData.delete("profile_picture")
    formData.delete("email")
    fileMeta?.file && formData.append("profile_picture", fileMeta?.file)
    const PAYLOAD: RequestTypes = {
      url: URLS.UPDATE_PROFILE,
      payload: formData,
      method: METHODS.PUT,
    }
    const res = await sendRequest(PAYLOAD)
    if (res?.status === 200) {
      setIsEditing(false)
      // @ts-ignore
      fileMeta?.file && setFileMeta((prev) => ({ ...prev, file: null }))
      // @ts-ignore
      formData.get("confirm_password")&&setValue("confirm_password", formData.get("confirm_password"))
      const profileImg = document.getElementById("header-profile") as HTMLImageElement | null;
      if (profileImg) {
        // @ts-ignore
        profileImg.src = fileMeta?.url;
      }
      toast.success(res?.data?.message)
      formData.get("confirm_password") && navigate.push("/login")

    }
    else {
      Object.keys(res.response.data).forEach(key => {
        toast.error(res.response.data[key][0] || "Failed to update profile")
      })
    }
    setLoading(false)
  };
  const handleReset = () => {
    reset()
    setIsEditing(false);
    setFileMeta(null)
    setFileMeta(getValues("profile_picture"))
  }
  useEffect(() => {
    const getProfileInfo = async () => {
      // @ts-ignore
      const PAYLOAD: RequestTypes = {
        url: URLS.ME,
        method: METHODS.GET,
      }
      sendRequest(PAYLOAD).then((res) => {
        if (res?.data) {
          setFileMeta(res?.data?.data?.profile_picture)
          const data: any = {}
          Object.keys(res?.data?.data)?.forEach((key) => {
            if (res?.data?.data[key]) {
              data[key] = res?.data?.data[key]
            }
          })
          const profileImg = document.getElementById("header-profile") as HTMLImageElement | null;
          if (profileImg) {
            profileImg.src = res?.data?.data?.profile_picture;
          }

          reset(data, { keepDirty: false, keepIsValid: false });
        }
      }).finally(() => {
        setApiLoading(false)
      })
    }
    getProfileInfo()
  }, [])

  const password = watch("password");
  const confirmPassword = watch("confirm_password");
  useEffect(() => {
    if (confirmPassword || !password) {
      trigger("confirm_password");
    }
  }, [password, confirmPassword, trigger]);
  const isFormReady = isValid && (isDirty || fileMeta?.file);

  if (apiLoading) {
    return <div className="h-[calc(100vh-200px)] flex justify-center items-center"><Spinner /></div>
  }
  return (
    <>
        <RoundedBox>
          <div
            style={{
              backgroundImage: `url("/profile.png")`
            }}
            className={clsx("bg-no-repeat flex justify-end items-end bg-cover py-6 object-contain h-[280px] w-full")}
          >
            {
              isEditing ? null : <div className="pe-5 relative z-[11]"><Button onPress={() => setIsEditing(!isEditing)} title='Edit Profile' className='h-10 px-5' /></div>
            }
          </div>
          <div className="relative sm:-mt-24 -mt-20 px-8 pb-6 z-10">
            <div className={clsx("w-fit", isEditing ? "" : " pointer-events-none")}>
              <FileUploader
                onChange={(fileData) => {
                  setFileMeta(null)
                  setFileMeta(fileData);
                }}
              >
                <RoundedBox className={clsx("sm:w-[140px] sm:h-[140px] w-[100px] h-[100px] -ms-6 outline-gray-180 overflow-hidden !rounded-full border")}>
                  {fileMeta?.url || fileMeta ? (
                    <img
                      width={140}
                      // @ts-ignore
                      src={fileMeta?.url || fileMeta}
                      alt="Selected Image"
                      className="w-full h-full object-cover"
                    />
                  ) : null}
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
                            ? "eyeOff"
                            : "filledEye"
                          : undefined
                      }
                      onPasswordToggle={() => handleTogglePasswordType(field.name)}
                    />
                  ))
                }
              </fieldset>
              {isEditing ? <div className="flex items-center gap-3 mt-6">
                <Button isLoading={loading} title='Update' type="submit" className='h-10' isDisabled={!isFormReady} />
                <TransparentButton title='Cancel' className='h-10' onPress={handleReset} />
              </div> : null}
            </form>
          </div>
        </RoundedBox>
      <ToastContainer />
    </>
  );
}