import SuccesModal from "@/components/app/successModal";
import AnimatedButton from "@/components/ui/animatedButton";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import {
  clearFieldError,
  convertCamelCaseToReadable,
  setFieldError,
} from "@/lib/functions";
import { validateField } from "@/lib/validateField";
import { useState } from "react";
import { Helmet } from "react-helmet";

const BecomePartner = () => {
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    aboutProject: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    aboutProject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let inputValue = value;

    if (name === "phone") {
      inputValue = inputValue.replace(/(?!^\+)[^0-9]/g, "");
    }

    let erroraboutProject = validateField(name, inputValue);
    if (erroraboutProject) {
      setFieldError(setErrors, name, erroraboutProject);
    } else {
      clearFieldError(setErrors, name);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };

    Object.keys(formData).forEach((item) => {
      if (formData[item].trim().length === 0 && item != "company") {
        newErrors[item] = `The ${convertCamelCaseToReadable(item)} is required`;
      }
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      (error) => error !== "" && error !== false
    );

    if (!hasErrors) {
      console.log("Form Data: ", formData);
      setShowSuccesModal(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Become our Partner | SHI Studio</title>
        <meta name="description" content="SHI Studio - Contact page" />
      </Helmet>
      <form className="w-full" onSubmit={handleSubmit} noValidate>
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Input
            name="name"
            labelName="Name"
            value={formData.name}
            handleChange={handleChange}
            error={errors.name}
          />
          <Input
            name="company"
            labelName="Company"
            value={formData.company}
            error={errors.company}
            handleChange={handleChange}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6 ">
          <Input
            type="tel"
            name="phone"
            labelName="Phone number"
            value={formData.phone}
            error={errors.phone}
            handleChange={handleChange}
          />
          <Input
            name="email"
            labelName="Email Address"
            type="email"
            value={formData.email}
            error={errors.email}
            handleChange={handleChange}
          />
        </div>

        <div>
          <Textarea
            name="aboutProject"
            labelName="About Project"
            value={formData.aboutProject}
            error={errors.aboutProject}
            handleChange={handleChange}
          />
        </div>

        <AnimatedButton
          type="submit"
          mode="dark"
          text="Send request"
          className="border-primary"
        />
      </form>
      {showSuccesModal && <SuccesModal setShow={setShowSuccesModal} />}
    </>
  );
};

export default BecomePartner;