import Avatar from "./avatar";
import { LogOutButton } from "./button";

export default function ProfileContainer({
  avatar,
  email,
}: {
  email: string;
  avatar: string | null;
}) {
  return (
    <div className="flex flex-col w-full min-tablet:w-[320px] h-fit bg-profile-background border-[1px] border-profile-border rounded-[6px] p-[24px] gap-[24px]">
      <div className="flex max-tablet:flex-col gap-[24px] max-tablet:items-center">
        {avatar ? <Avatar url={avatar} /> : null}
        <div className="flex flex-col max-tablet:w-full gap-[4px] justify-center">
          <h1 className="text-profile-h text-16-26-500">
            {email.split("@")[0]}
          </h1>
          <p className="text-profile-text text-14-24-400">{email}</p>
        </div>
      </div>
      <hr className="text-profile-border"></hr>
      <LogOutButton />
    </div>
  );
}
