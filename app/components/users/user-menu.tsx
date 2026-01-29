"use client";
import MenuBox from "../ui/menu-box";
import { User } from "./users-columns";
import { Eye } from "lucide-react";
import { Icons } from "../ui/icons";
import { DestructModal } from "../ui/destruct-modal";
import { useState } from "react";
import { useUpdateStatus } from "@/app/hooks/useUpdateStatus";
import { useRouter } from "next/navigation";
import { useUserDetails } from "@/app/hooks/useUserDetails";

export const UserMenu = ({ rowDetails }: { rowDetails: User }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { updateStatus, isLoading } = useUpdateStatus();
  const { data: userDetails } = useUserDetails(rowDetails._id);

  // BLACKLIST ACTION
  const blacklistFn = () => {
    updateStatus(
      { id: rowDetails._id, status: "Blacklisted" },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  // VIEW DETAILS ACTION
  const handleViewDetails = () => {
    if (!userDetails) return;
    localStorage.setItem(rowDetails._id, JSON.stringify(userDetails));
    router.push(`/customers/users/${rowDetails._id}`);
  };
  return (
    <>
      <MenuBox
        menuItems={[
          <button
            aria-label="view details"
            key={"View Details"}
            onClick={handleViewDetails}
          >
            <Eye />
            <span>View Details</span>
          </button>,

          <button
            aria-label={
              rowDetails.status === "Blacklisted"
                ? "Activate User"
                : "Blacklist User"
            }
            key={"Edit Category"}
            onClick={() => setOpen(true)}
          >
            {rowDetails.status === "Blacklisted" ? (
              <Icons.goodUser />
            ) : (
              <Icons.xUser />
            )}
            <span>
              {rowDetails.status === "Blacklisted"
                ? "Activate User"
                : "Blacklist User"}
            </span>
          </button>,
        ]}
      />

      <DestructModal
        open={open}
        setOpen={setOpen}
        action={
          rowDetails.status === "Blacklisted"
            ? `Activate ${rowDetails.username}`
            : `Blacklist ${rowDetails.username}`
        }
        destructFunction={blacklistFn}
        isPending={isLoading}
      />
    </>
  );
};
