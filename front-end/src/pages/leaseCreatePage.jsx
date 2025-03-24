import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const tenantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phone: z
    .string()
    .min(10, "Phone number is required")
    .max(15, "Phone number is too long"),
});

const leaseSchema = z.object({
  leaseStartDate: z.string().min(1, "Start date is required"),
  leaseEndDate: z.string().min(1, "End date is required"),
  rentAmount: z.number().min(1, "Rent amount is required"),
});

const CreateLease = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});

  // Handling Tenant form
  const {
    register: registerTenant,
    handleSubmit: handleSubmitTenant,
    formState: { errors: tenantErrors },
  } = useForm({
    resolver: zodResolver(tenantSchema),
  });

  // Handling Lease form
  const {
    register: registerLease,
    handleSubmit: handleSubmitLease,
    formState: { errors: leaseErrors },
  } = useForm({
    resolver: zodResolver(leaseSchema),
  });

  const steps = ["Enter Tenant Details", "Enter Lease Details"];

  const onSubmitTenant = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const onSubmitLease = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    alert(JSON.stringify(formData, null, 2)); // Display the collected form data for now
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://creattie.com/js/embed.js?id=3f6954fde297cd31b441";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const renderFormStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <form
            onSubmit={handleSubmitTenant(onSubmitTenant)}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Tenant Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...registerTenant("name")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {tenantErrors.name && (
                <p className="text-sm text-red-500">
                  {tenantErrors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...registerTenant("email")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {tenantErrors.email && (
                <p className="text-sm text-red-500">
                  {tenantErrors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                {...registerTenant("phone")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {tenantErrors.phone && (
                <p className="text-sm text-red-500">
                  {tenantErrors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                {...registerTenant("dob")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {tenantErrors.dob && (
                <p className="text-sm text-red-500">
                  {tenantErrors.dob.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Info
              </label>
              <textarea
                {...registerTenant("additionalInfo")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Next
            </button>
          </form>
        );
      case 1:
        return (
          <form
            onSubmit={handleSubmitLease(onSubmitLease)}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Lease Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lease Start Date
              </label>
              <input
                type="date"
                {...registerLease("leaseStartDate")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {leaseErrors.leaseStartDate && (
                <p className="text-sm text-red-500">
                  {leaseErrors.leaseStartDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Lease End Date
              </label>
              <input
                type="date"
                {...registerLease("leaseEndDate")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {leaseErrors.leaseEndDate && (
                <p className="text-sm text-red-500">
                  {leaseErrors.leaseEndDate.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rent Amount
              </label>
              <input
                type="number"
                {...registerLease("rentAmount")}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {leaseErrors.rentAmount && (
                <p className="text-sm text-red-500">
                  {leaseErrors.rentAmount.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <div className="flex justify-between">
            {steps.map((label, index) => (
              <div
                key={index}
                className={`step ${activeStep === index ? "font-semibold" : ""}`}
              >
                {label}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-300 my-2">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${(activeStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        {renderFormStep()}
      </div>
    </div>
  );
};

export default CreateLease;
