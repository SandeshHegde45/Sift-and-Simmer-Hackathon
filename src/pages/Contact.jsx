import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/messagesSlice";
import { usePageMeta } from "../utils/usePageMeta";

function Contact() {
  usePageMeta("Contact", "Suggest an Indian vegetarian recipe to add to Sift & Simmer.");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.items);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(data) {
    dispatch(
      addMessage({
        id: Date.now().toString(),
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        date: new Date().toISOString(),
      })
    );
    reset();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-wine">Get in touch</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Suggest a dish
      </h1>
      <p className="mt-3 max-w-lg font-body text-sm text-ink-soft">
        Missing your favorite Indian vegetarian recipe? Send it over and
        we'll consider adding it to the collection.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4 rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <div>
          <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Please enter your name" })}
            className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
          {errors.name && (
            <p className="mt-1 font-mono text-[11px] text-wine">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            Email
          </label>
          <input
            id="email"
            type="email"
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
          <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            Recipe suggestion
          </label>
          <textarea
            id="message"
            rows={4}
            {...register("message", {
              required: "Please add a short description",
              minLength: { value: 10, message: "Please add a bit more detail" },
            })}
            className="mt-2 w-full resize-none rounded-xl border border-line bg-cream px-4 py-2.5 font-body text-sm text-ink focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
          {errors.message && (
            <p className="mt-1 font-mono text-[11px] text-wine">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-full bg-forest px-6 py-2.5 font-body text-sm font-semibold text-cream transition-colors hover:bg-forest-light"
        >
          Send suggestion
        </button>

        {submitted && (
          <p className="font-mono text-xs uppercase tracking-widest text-forest">
            Thanks — your suggestion has been noted.
          </p>
        )}
      </form>

      {messages.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-semibold text-ink">
            Recent suggestions ({messages.length})
          </h2>
          <ul className="mt-4 space-y-3">
            {messages.map((item) => (
              <li key={item.id} className="rounded-xl border border-line bg-paper p-4">
                <p className="font-body text-sm text-ink">{item.message}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  {item.name} · {new Date(item.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Contact;
