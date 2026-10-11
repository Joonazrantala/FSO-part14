"use client";

import { registerUser, FormState } from "../actions/users";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/NotificationContext";

const RegisterUser = () => {
  const initialState: FormState = {
    errors: {},
    success: false,
  };

  const [state, formAction] = useActionState(registerUser, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("User created");
      router.push("/login");
    }
  }, [state, showNotification, router]);

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
            />
          </label>
          {state.errors && (
            <p style={{ color: "red" }} data-testid="username-error">
              {state.errors.username}
            </p>
          )}
        </div>
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
            />
          </label>
          {state.errors && (
            <p style={{ color: "red" }} data-testid="name-error">
              {state.errors.name}
            </p>
          )}
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <div>
            <label>
              Confirm Password
              <input type="password" name="password2" required />
            </label>
            {state.errors && (
              <p style={{ color: "red" }} data-testid="passwordConfirm-error">
                {state.errors.password}
              </p>
            )}
          </div>
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
