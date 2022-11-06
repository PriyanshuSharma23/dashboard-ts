import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { addIcon, deleteIcon, updateIcon } from "../assets/svg-assets";
import { useModal } from "../contexts/ModalContext";
import { EmployeeUtils } from "../firebase/firebase-utils";
import { UserModel } from "../models/user-model";
import { LoadingSpinner } from "./LoadingSpinner";
import OutsideAlerter from "./OutsideClick";

export const EmployeeTab = () => {
  const [checked, setChecked] = React.useState<Array<boolean>>();
  const { showModel, closeModal } = useModal();
  const ref = React.useRef<HTMLInputElement>(null);

  const totalTrueCount = checked?.reduce((acc, curr) => {
    if (curr) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const employeeQuery = useQuery(
    ["employees"],
    () => {
      return EmployeeUtils.allEmployees();
    },
    {
      onSuccess: (data) => {
        setChecked(data.map(() => false));
      },
    }
  );

  const addUserMutation = useMutation(
    (newUser: { name: string; salary: number; role: string }) => {
      return EmployeeUtils.addEmployee(newUser);
    },
    {
      onSuccess: () => {
        employeeQuery.refetch();
      },
    }
  );

  const deleteUserMutation = useMutation(
    () => {
      // list of users to delete
      const usersToDelete =
        employeeQuery.data
          ?.filter((user, index) => {
            return checked && checked[index];
          })
          .map((user) => user.id) ?? [];

      return EmployeeUtils.deleteManyEmployees(usersToDelete);
    },
    {
      onSuccess: () => {
        employeeQuery.refetch();
      },
    }
  );

  const updateUserMutation = useMutation(
    (updatedUser: UserModel) => {
      return EmployeeUtils.updateEmployee(updatedUser);
    },
    {
      onSuccess: () => {
        employeeQuery.refetch();
      },
    }
  );

  return (
    <>
      <div className="mt-4">
        <div className="prose">
          <h1 className="text-blue-400">Employees</h1>
        </div>
      </div>
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        {employeeQuery.isLoading || employeeQuery.isFetching ? (
          <div className="flex justify-center">
            <LoadingSpinner color={"text-purple-500"} />
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-scroll sm:-mx-6 lg:-mx-8 h-[75vh]">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b accent-purple-500">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setChecked(checked?.map(() => e.target.checked));
                            }}
                            name="all-checked"
                            checked={totalTrueCount === checked?.length}
                            ref={ref}
                          />
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Salary
                        </th>
                      </tr>
                    </thead>
                    <tbody className="accent-purple-500">
                      {employeeQuery.data?.map((employee, index) => (
                        <tr className="border-b" key={index}>
                          <td className="table-cell">
                            <input
                              type="checkbox"
                              name={`${employee.name} row`}
                              checked={checked?.[index]}
                              onChange={() => {
                                setChecked(
                                  checked?.map((c, i) => (i === index ? !c : c))
                                );
                              }}
                            />
                          </td>
                          <td className="table-cell font-medium">
                            {index + 1}
                          </td>
                          <td className="table-cell font-light">
                            {employee.name}
                          </td>
                          <td className="table-cell font-light">
                            {employee.role}
                          </td>
                          <td className="table-cell font-light">
                            {employee.salary}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex gap-2">
              <button
                className={`bg-green-500  
                hover:bg-green-700
                text-white font-bold
                py-2 px-4 rounded transition-colors w-28
                duration-300 flex items-center justify-center `}
                onClick={() => {
                  showModel(
                    <OutsideAlerter cb={closeModal}>
                      <div className="bg-white shadow-md">
                        <h1>hello</h1>
                      </div>
                    </OutsideAlerter>
                  );
                }}
              >
                {addIcon}
                <span className="ml-2">Add</span>
              </button>
              <div className="flex-grow"></div>
              <button
                disabled={totalTrueCount !== 1}
                className={`bg-blue-500  
                hover:bg-blue-700
                text-white font-bold
                py-2 px-4 rounded transition-colors w-28
                duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {updateIcon}
                <span className="ml-2">Update</span>
              </button>

              <button
                disabled={totalTrueCount === 0}
                className={`bg-red-500
                    hover:bg-red-700
                    text-white font-bold
                    py-2 px-4 rounded transition-colors w-28
                    duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => {
                  deleteUserMutation.mutate();
                }}
              >
                {deleteIcon}
                <span className="ml-2">Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const EmployeeRow: React.FC<{
  idx: number;
  user: UserModel;
}> = ({ idx, user }) => {
  const { name, role, salary } = user;

  return (
    <tr className="border-b">
      <td className="table-cell font-medium">{idx}</td>
      <td className="table-cell font-light">{name}</td>
      <td className="table-cell font-light">{role}</td>
      <td className="table-cell font-light">{salary}</td>
    </tr>
  );
};
