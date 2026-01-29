import Image from "next/image";
import "./login.scss";
import { LoginForm } from "@/app/components/auth/login-form";

const page = () => {
  return (
    <div className="flex-container">
      <div className="img">
        <div className="logo">
          <div className="logo-container">
            <Image src={"/logo.svg"} alt={"Lendsqr logo"} fill />
          </div>
        </div>

        <div className="illustration">
          <div className="pablo-img">
            <Image
              src={"/images/pablo-sign-in.png"}
              alt={"Pablo Sign in illustration"}
              fill
              quality={75}
            />
          </div>
        </div>
      </div>

      <LoginForm />
    </div>
  );
};

export default page;
