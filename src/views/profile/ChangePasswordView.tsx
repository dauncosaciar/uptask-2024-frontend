import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ErrorMessage from "@/components/ErrorMessage";
import { UpdateCurrentUserPasswordForm } from "@/types/index";
import { changePassword } from "@/api/ProfileApi";

export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    currentPassword: "",
    password: "",
    passwordConfirmation: ""
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onError: error => toast.error(error.message),
    onSuccess: data => toast.success(data)
  });

  const password = watch("password");

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) =>
    mutate(formData);

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black ">Cambiar Contraseña</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Utiliza este formulario para cambiar tu contraseña
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="currentPassword"
            >
              Contraseña Actual
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Contraseña Actual"
              className="w-full p-3 border border-gray-200"
              {...register("currentPassword", {
                required: "La Contraseña actual es obligatoria"
              })}
            />
            {errors.currentPassword && (
              <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              Nueva Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nueva Contraseña"
              className="w-full p-3 border border-gray-200"
              {...register("password", {
                required: "La Nueva Contraseña es obligatoria",
                minLength: {
                  value: 8,
                  message: "La Contraseña debe ser mínimo de 8 caracteres"
                }
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="passwordConfirmation"
              className="text-sm uppercase font-bold"
            >
              Repetir Contraseña
            </label>

            <input
              id="passwordConfirmation"
              type="password"
              placeholder="Repetir Contraseña"
              className="w-full p-3 border border-gray-200"
              {...register("passwordConfirmation", {
                required: "Este campo es obligatorio",
                validate: value =>
                  value === password || "Las Contraseñas no son iguales"
              })}
            />
            {errors.passwordConfirmation && (
              <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value="Cambiar Contraseña"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
