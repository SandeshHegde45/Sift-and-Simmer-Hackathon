import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router";
import { signIn } from "../store/authSlice";
import { usePageMeta } from "../utils/usePageMeta";
import PasswordInput from "../components/PasswordInput";

function Login() {
  usePageMeta("Sign In", "Sign in to Sift & Simmer.");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { status, isSubmitting, error } = useSelector((state) => state.auth);
  const [justRegistered] = useState(Boolean(location.state?.justRegistered));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  useEffect(() => {
    if (status === "authenticated") {
      navigate("/", { replace: true });
    }
  }, [status, navigate]);

  useEffect(() => {
    if (location.state?.justRegistered) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(data) {
    dispatch(signIn({ email: data.email.trim(), password: data.password }));
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

        <h1 className="font-display text-2xl font-semibold text-ink">Welcome back</h1>
        <p className="mt-1 font-body text-sm text-ink-soft">Sign in to continue.</p>

        {justRegistered && (
          <p className="mt-4 rounded-xl border border-forest/20 bg-forest/10 px-4 py-3 font-body text-sm text-forest">
            Account created — sign in with your new credentials.
          </p>
        )}

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
              autoComplete="current-password"
              registration={register("password", { required: "Please enter your password" })}
              className="w-full rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
            {errors.password && (
              <p className="mt-1 font-mono text-[11px] text-wine">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="font-mono text-xs text-wine">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-forest px-5 py-2.5 font-body text-sm font-semibold text-cream transition-colors hover:bg-forest-light disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-ink-soft">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-forest hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;