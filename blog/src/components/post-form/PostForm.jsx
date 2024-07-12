import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        stauts: post?.stauts || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  //agr user from submit diya ho data milega 2 case hai agr post value hai to update kroo agr nhi hai to new value add krro
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deletFile(post.featureImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featureImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
      //    user ek naya post creat krna chata hai
    } else {
      const file = await service.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featureImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post${dbPost}`);
        }
      }
    }
  };
  // ye ky krta  2 filed apne pass title and slug , title ko watch and slug ke ander value gnertae krna hai
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/^[a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    // subscription bnta aapke watch method se,actual aap jo method run usko subscription hold kr shkte hai
    const subscription = watch((value, {name})=>{

        if(name === 'title'){
            setValue('slug',slugTransform(value.title,{shouldValidate: true}))
        }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2"> 
        <Input
        label="title:"
        
        />

        </div>

    </form>
  );
}

export default PostForm;
