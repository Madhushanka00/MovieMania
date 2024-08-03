import * as React from "react";
import "./index.css";

export default function SignInSide() {
  return (
    <div>
      <div>
        <div>
          <h1>Sign in</h1>
          <form>
            <div>
              <label>Email</label>
              <input type="email" />
            </div>
            <div>
              <label>Password</label>
              <input type="password" />
            </div>
            <button>Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
