import React, { useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import {
  Input,
  HelperText,
  Label,
  Select,
  Textarea,
  Button,
} from "@windmill/react-ui";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  clearProfileUpdateStatus,
  fetchProfileById,
  updateProfile,
} from "../app/profilesSlice";
import toast, { Toaster } from "react-hot-toast";

function EditProfile() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const profileById = useSelector((state) => state.profiles.profileById);
  const profileByIdStatus = useSelector(
    (state) => state.profiles.profileByIdStatus
  );
  const profileUpdateStatus = useSelector(
    (state) => state.profiles.profileUpdateStatus
  );

  const canSave = profileUpdateStatus === "idle";
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (profileByIdStatus === "idle") {
      dispatch(fetchProfileById(id));
    }
    reset({
      name: profileById.name,
      email: profileById.email,
      gender: profileById.gender,
      identity: profileById.identity,
      birth_date: profileById.birth_date,
      address: profileById.address,
      photo_url: profileById.photo_url,
      role: profileById.role,
    });
  }, [profileByIdStatus, dispatch]);

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.id = id;
        const resultAction = await dispatch(updateProfile(data));
        unwrapResult(resultAction);
        if (resultAction.payload !== null) {
          toast.success("Berhasil update data!");
        }
      } catch (error) {
        if (error) throw toast.error("Gagal update data!");
      } finally {
        dispatch(clearProfileUpdateStatus());
      }
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            marginTop: "90px",
            marginRight: "40px",
            background: "#363636",
            color: "#fff",
            zIndex: 1,
          },
          duration: 5000,
          success: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 1000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <PageTitle>New Profile</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Name</span>
            <Input className="mt-1" defaultValue="" {...register("name")} />
          </Label>
          <Label>
            <span>Email</span>
            <Input
              className="mt-1"
              defaultValue=""
              {...register("email")}
              disabled
            />
          </Label>

          <Label className="mt-1">
            <span>Gender</span>
            <Select className="mt-1" defaultValue="" {...register("gender")}>
              <option disabled>select option</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Select>
          </Label>
          <Label>
            <span>Identity</span>
            <Input className="mt-1" defaultValue="" {...register("identity")} />
          </Label>
          <Label>
            <span>Birthday</span>
            <Input
              className="mt-1"
              defaultValue=""
              type="date"
              {...register("birth_date")}
            />
          </Label>
          <Label>
            <span>Address</span>
            <Input className="mt-1" defaultValue="" {...register("address")} />
          </Label>
          <Label>
            <span>Photo</span>
            <Input
              className="mt-1"
              defaultValue=""
              {...register("photo_url")}
            />
          </Label>
          <Label className="mt-1">
            <span>Role</span>
            <Select className="mt-1" defaultValue="" {...register("role")}>
              <option disabled>select option</option>
              <option value="participant">Participant</option>
              <option value="proctor">Proctor</option>
              <option value="super_admin">Employee</option>
            </Select>
          </Label>
          <div className="flex justify-between my-4">
            <div>
              <Button tag={Link} to="/app/organizations" size="small">
                Cancel
              </Button>
            </div>
            <div>
              <Button type="submit" size="small">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;
