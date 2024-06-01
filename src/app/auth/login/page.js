import LoginView from "@/components/views/auth/Login";
import Head from "next/head";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <Head>
        <title>BabyBoo - Login</title>
      </Head>
      <LoginView />
    </div>
  );
};

export default LoginPage;
