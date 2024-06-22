import * as yup from "yup"

export const CommentSchema = yup.object().shape({
  anime_mal_id: yup.string(),
  anime_title: yup.string(),
  user_email: yup.string().email(),
  rating: yup
    .number()
    .min(1, "rating must be at least 1")
    .max(5, "rating cannot exceed 5")
    .required("rating is required"),
  comment: yup
    .string()
    .required("comment is required")
    .test(
      "max-word-length",
      "The word is too long. The maximum length is 30 letters per word.",
      (value) => {
        const words = value.split(" ")
        return !words.some((word) => word.length > 30)
      },
    )
    .max(5000, "Comment is too long. The maximum length is 5000 letters."),
})

export const ChangePasswordSchema = yup.object().shape({
  password: yup.string(),
  newPassword: yup.string().min(6, "minimum 6 characters required"),
})

export const ProfileSchema = yup.object().shape({
  name: yup.string().max(13, "maximum 13 characters").optional(),
  email: yup.string().email().optional(),
  isTwoFactorEnabled: yup.boolean().optional(),
})

export const NewPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, "minimum 6 characters required")
    .required("password is required"),
})

export const ResetSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
})

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup.string().required("password is required"),
  code: yup.string().optional(),
})

export const RegisterSchema = yup.object().shape({
  name: yup.string().max(13, "maximum 13 characters").required("name is required"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .min(6, "minimum 6 characters required")
    .required("password is required"),
})
