import React from "react";
// Import userOne from "../assets/user-01.png";
import { UserFieldIcon } from "../components/Icons/UserFieldIcon";
import { MailFieldIcon } from "../components/Icons/MailFieldIcon";
import { BioFieldIcon } from "../components/Icons/BioFieldIcon";
// Import { UpoloadIcon } from "../components/Icons/UploadIcon";
// Import { useSettings } from "../hooks/useSettings";
// Import { Loader } from "../components/Loader";

export const Settings: React.FC = () => {
  // Const { register, handleSubmit, onSubmit, errors, isLoading, deleteAccount } = useSettings();

  return (
    <div className="mx-auto max-w-270">
      {/* {isLoading ? <Loader /> : null} */}
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
            </div>
            <div className="p-7">
              {/* <form onSubmit={handleSubmit(onSubmit)}> */}
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <UserFieldIcon />
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="name"
                      // {...register("name")}
                      placeholder="John Doe"
                    />
                    {/* {errors.name && <p className="error">{errors.name.message}</p>} */}
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    id="phoneNumber"
                    // {...register("phoneNumber")}
                    placeholder="+1 123 456 7890"
                  />
                  {/* {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>} */}
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <MailFieldIcon />
                  </span>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="email"
                    // {...register("email")}
                    id="email"
                    placeholder="johndoe@example.com"
                  />
                  {/* {errors.email && <p className="error">{errors.email.message}</p>} */}
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  type="text"
                  id="username"
                  // {...register("username")}
                  placeholder="john_doe"
                />
                {/* {errors.username && <p className="error">{errors.username.message}</p>} */}
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="Username"
                >
                  BIO
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-4">
                    <BioFieldIcon />
                  </span>

                  <textarea
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    id="bio"
                    // {...register("bio")}
                    rows={6}
                    placeholder="Write your bio here"
                  ></textarea>
                  {/* {errors.bio && <p className="error">{errors.bio.message}</p>} */}
                </div>
              </div>

              <div className="flex justify-between gap-4.5">
                <button
                  className="flex justify-center rounded border bg-red-500 border-stroke py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark"
                  type="button"
                  // OnClick={deleteAccount}
                >
                  Delete Account
                </button>
                <button
                  className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
        {/* <div className="col-span-5 xl:col-span-2">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">Your Photo</h3>
                            </div>
                            <div className="p-7">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-14 w-14 rounded-full">
                                        <img src={userOne} alt="User" />
                                    </div>
                                    <div>
                                        <span className="mb-1.5 text-black dark:text-white">Edit your photo</span>
                                        <span className="flex gap-2.5">
                                            <button className="text-sm hover:text-primary">Delete</button>
                                        </span>
                                    </div>
                                </div>

                                <div
                                    id="FileUpload"
                                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                                    />
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                                            <UpoloadIcon />
                                        </span>
                                        <p>
                                            <span className="text-primary">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                        <p>(max, 800 X 800px)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
      </div>
    </div>
  );
};
