import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import useInput from "../../hooks/useInput";
import Input from "../Input";
import Button from "../../styles/Button";
import Form from "../../styles/Form";
import CoverPhoto from "../../styles/CoverPhoto";
import Avatar from "../../styles/Avatar";
import { uploadImage } from "../../utils";
import { updateUser } from "../../services/api";

const EditProfileForm = ({ profile, history }) => {
  const [avatarState, setAvatar] = useState("");
  const [coverPhotoState, setCoverPhoto] = useState("");
  const [id] = useState(profile.id);

  const nickname = useInput(profile && profile.nickname);
  const location = useInput(profile && profile.location);
  const website = useInput(profile && profile.website);
  const avatar = useInput(profile && profile.avatar);
  const bio = useInput(profile && profile.bio);
  const coverPhoto = useInput(profile && profile.coverPhoto);

  const handleEditProfile = async (e) => {
    e.preventDefault();

    if (!nickname.value) {
      return toast.error("You cannot leave nickname empty");
    }

    const payload = {
      nickname: nickname.value,
      location: location.value,
      website: website.value,
      avatar: avatarState ? avatarState : avatar.value,
      bio: bio.value,
      coverPhoto: coverPhotoState ? coverPhotoState : coverPhoto.value,
    };

    try {
      updateUser(payload);
      toast.success("Your profile has been updated 🥳");
    } catch (err) {
      return toast.error(err);
    }

    [nickname, location, website, avatar, coverPhoto].map((field) =>
      field.setValue("")
    );

    history.push(`/${id}`);
  };

  const handleCoverPhoto = async (e) => {
    setCoverPhoto(await uploadImage(e.target.files[0]));
  };

  const handleAvatar = async (e) => {
    setAvatar(await uploadImage(e.target.files[0]));
  };

  return (
    <Form lg onSubmit={handleEditProfile}>
      <div className="cover-photo">
        <label htmlFor="cover-photo-input">
          <CoverPhoto
            src={coverPhotoState ? coverPhotoState : coverPhoto.value}
            alt="cover"
          />
        </label>
        <input
          type="file"
          id="cover-photo-input"
          accept="image/*"
          onChange={handleCoverPhoto}
        />
      </div>

      <div className="avatar-input">
        <label htmlFor="avatar-input-file">
          <Avatar
            lg
            src={avatarState ? avatarState : avatar.value}
            alt="avatar"
          />
        </label>
        <input
          type="file"
          accept="image/*"
          id="avatar-input-file"
          onChange={handleAvatar}
        />
      </div>

      <Input
        lg={true}
        text="Nickname"
        value={nickname.value}
        onChange={nickname.onChange}
      />
      <div className="bio-wrapper">
        <label className="bio" htmlFor="bio">
          Bio
        </label>
        <TextareaAutosize id="bio" value={bio.value} onChange={bio.onChange} />
      </div>
      <Input
        lg={true}
        text="Website"
        value={website.value}
        onChange={website.onChange}
      />
      <Input
        lg={true}
        text="Location"
        value={location.value}
        onChange={location.onChange}
      />
      <Button type="submit">Save</Button>
    </Form>
  );
};

export default withRouter(EditProfileForm);
