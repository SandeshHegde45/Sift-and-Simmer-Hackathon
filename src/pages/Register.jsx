import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signUp } from "../store/authSlice";
import { usePageMeta } from "../utils/usePageMeta";
import PasswordInput from "../components/PasswordInput";

function Register() {
  usePageMeta("Create Account", "Create an account for Sift & Simmer.");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, isSubmitting } = useSelector((state) => state.auth);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "", confirmPassword: "" } });

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/", { replace: true });
    }
  }, [status, navigate]);

  function onSubmit(data) {
    setErrorMessage(null);
    dispatch(signUp({ email: data.email.trim(), password: data.password }))
      .unwrap()
      .then(() => {
        navigate("/login", { state: { justRegistered: true }, replace: true });
      })
      .catch((message) => {
        setErrorMessage(message);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-paper p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest font-display text-lg font-semibold text-mustard-light">
            S
          </span>
          <span className="font-display text-xl font-semibold text-ink">Sift &amp; Simmer</span>
        </div>

        <h1 className="font-display text-2xl font-semibold text-ink">Create an account</h1>
        <p className="mt-1 font-body text-sm text-ink-soft">Save favorites and suggest recipes.</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              })}
              className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
            {errors.email && (
              <p className="mt-1 font-mono text-[11px] text-wine">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Password
            </label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              registration={register("password", {
                required: "Please enter a password",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
            {errors.password && (
              <p className="mt-1 font-mono text-[11px] text-wine">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="font-mono text-xs uppercase tracking-widest text-ink-soft">
              Confirm password
            </label>
            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              registration={register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords don't match",
              })}
              className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
            {errors.confirmPassword && (
              <p className="mt-1 font-mono text-[11px] text-wine">{errors.confirmPassword.message}</p>
            )}
          </div>

          {errorMessage && <p className="font-mono text-xs text-wine">{errorMessage}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-forest px-5 py-2.5 font-body text-sm font-semibold text-cream transition-colors hover:bg-forest-light disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-ink-soft">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-forest hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;