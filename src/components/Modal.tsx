import { useState } from "react";
import { useModal } from "../contexts/ModalContext";
import { UserModel } from "../models/user-model";
import { formatCurrency } from "../utils/currency-format";
import OutsideAlerter from "./OutsideClick";

export const Modal = ({
  initialUser,
  onSubmit,
}: {
  initialUser?: UserModel;
  onSubmit: (user: { name: string; salary: number; role: string }) => void;
}) => {
  const { closeModal } = useModal();

  const [name, setName] = useState(initialUser?.name ?? "");
  const [salary, setSalary] = useState(initialUser?.salary ?? 10000);
  const [role, setRole] = useState(initialUser?.role ?? "");

  return (
    <OutsideAlerter cb={closeModal}>
      <div className="bg-white shadow-md rounded-lg p-4 min-w-[400px]">
        <form className="flex flex-col gap-1">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border min-w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="John"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Role
            </label>
            <input
              type="text"
              id="role"
              className="bg-gray-50 border min-w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="salary"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="number"
              id="salary"
              className="bg-gray-50 border min-w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="100000"
              min={10000}
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 border border-blue-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onClick={(e) => {
                e.preventDefault();
                onSubmit({ name, salary, role });
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </OutsideAlerter>
  );
};
